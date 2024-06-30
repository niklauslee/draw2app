import {
  fileOpen as fileOpenDialog,
  fileSave as fileSaveDialog,
} from "browser-fs-access";
import { confirm } from "./components/confirm-dialog";
import { useAppStore } from "./store";
import OpenAI from "openai";
import { getImageDataUrl } from "@dgmjs/export";

export async function fileNew() {
  const result = await confirm({
    title: "Are you sure to clear the canvas?",
    description:
      "This will clear your current canvas and any unsaved changes will be lost. Are you sure you want to continue?",
  });
  if (result) {
    const editor = window.editor;
    editor.selection.deselectAll();
    editor.newDoc();
    editor.repaint();
  }
}

export async function fileOpenFromLocal() {
  const editor = window.editor;
  const data = localStorage.getItem("data");
  if (data) {
    editor.loadFromJSON(JSON.parse(data));
  }
}

export async function fileSaveToLocal() {
  const editor = window.editor;
  const data = JSON.stringify(editor.saveToJSON());
  if (data) {
    localStorage.setItem("data", data);
  }
}

export async function fileOpen() {
  const editor = window.editor;
  try {
    const fileHandle = await fileOpenDialog([
      {
        description: "DGM files",
        mimeTypes: ["application/json"],
        extensions: [".dgm"],
        multiple: false,
      },
    ]);
    if (fileHandle) {
      const data = await fileHandle.text();
      const json = JSON.parse(data);
      editor.loadFromJSON(json);
      editor.fitToScreen();
      editor.repaint();
    }
  } catch {
    // user canceled
    return;
  }
}

export async function fileSave() {
  const editor = window.editor;
  const data = JSON.stringify(editor.saveToJSON());
  const blob = new Blob([data], { type: "application/json" });
  try {
    await fileSaveDialog(blob, { extensions: [".dgm"] });
  } catch {
    // user cancelled
    return;
  }
}

export async function alignSendToBack() {
  const editor = window.editor;
  editor.actions.sendToBack();
}

export async function alignBringToFront() {
  const editor = window.editor;
  editor.actions.bringToFront();
}

export async function generateApp() {
  const prompt =
    "Generate a web application from the given image. The web app may include JavaScript, CSS and HTML. All the code must be generated into a single HTML file. Show me only code, not explaining text.";
  const editor = window.editor;
  const apiKey = useAppStore.getState().apiKey;
  if (apiKey) {
    const page = editor.getCurrentPage()!;
    const base64 = await getImageDataUrl(editor.canvas, page, {
      scale: 1,
      dark: false,
      fillBackground: true,
      format: "image/png",
    });
    useAppStore.getState().setAppCode(null);
    useAppStore.getState().setGenerating(true);
    try {
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });
      const stream = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "image_url", image_url: base64 as any },
              { type: "text", text: prompt },
            ],
          },
        ],
        model: "gpt-4-vision-preview",
        stream: true,
        max_tokens: 3000,
      });
      for await (const chunk of stream) {
        const chunkText = chunk.choices[0]?.delta?.content || "";
        useAppStore
          .getState()
          .setAppCode((useAppStore.getState().appCode ?? "") + chunkText);
        const finishReason = chunk.choices[0]?.finish_reason;
        if (finishReason) {
          console.log("finishReason", finishReason);
          useAppStore.getState().setGenerating(false);
        }
      }
    } catch (err) {
      console.error(err);
      useAppStore.getState().setGenerating(false);
    }
  }
}
