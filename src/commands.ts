import {
  fileOpen as fileOpenDialog,
  fileSave as fileSaveDialog,
} from "browser-fs-access";
import { confirm } from "./components/confirm-dialog";
import { useAppStore } from "./store";
import OpenAI from "openai";
import { getImageDataUrl } from "@dgmjs/export";
import { toast } from "sonner";
import systemPrompt from "./assets/prompt.md?raw";
import { geometry, macro, type Shape } from "@dgmjs/core";

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
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: [{ type: "image_url", image_url: { url: base64 as any } }],
          },
        ],
        model: "gpt-4o",
        stream: true,
        max_tokens: 3000,
      });
      let response = "";

      // Read the stream
      for await (const chunk of stream) {
        const chunkText = chunk.choices[0]?.delta?.content || "";
        console.log("[chunk]", chunkText);
        response += chunkText;
        const finishReason = chunk.choices[0]?.finish_reason;
        if (finishReason) {
          useAppStore.getState().setGenerating(false);
          if (finishReason !== "stop") {
            toast.error(
              `Failed to generate app (finish_reaseon=${finishReason})`
            );
            return;
          }
        }
      }

      // Extract HTML code from the response
      const regex = /```html([\s\S]*?)```/g;
      const match = regex.exec(response);
      if (match && match.length > 0) {
        useAppStore.getState().setAppCode(match[1].trim());
        toast.success("App generated successfully");
      } else {
        useAppStore.getState().setAppCode(null);
        toast.error("Failed to generate app");
      }
    } catch (err) {
      console.error(err);
      useAppStore.getState().setGenerating(false);
    }
  }
}

/**
 * Insert shape by cloning from a shape prototype
 */
export async function shapeInsert(shapePrototype: Shape, point?: number[]) {
  const editor = window.editor;
  const store = editor.store;
  const tr = editor.transform;
  const page = editor.getCurrentPage()!;
  const clone = store.instantiator.clone(shapePrototype) as Shape;
  clone.proto = false;
  const boundingRect = clone.getBoundingRect();
  const w = geometry.width(boundingRect);
  const h = geometry.height(boundingRect);
  if (!point) point = editor.getCenter();
  const dx = point[0] - (boundingRect[0][0] + w / 2);
  const dy = point[1] - (boundingRect[0][1] + h / 2);
  tr.startAction("add shape from prototype");
  tr.transact((tx) => {
    tx.appendObj(clone);
    macro.changeParent(tx, clone, page);
    macro.moveShapes(tx, page, [clone], dx, dy);
    macro.resolveAllConstraints(tx, page, editor.canvas);
  });
  tr.endAction();
  editor.selection.select([clone]);
}
