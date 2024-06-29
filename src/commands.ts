import {
  fileOpen as fileOpenDialog,
  fileSave as fileSaveDialog,
} from "browser-fs-access";

export async function fileNew() {
  const editor = window.editor;
  editor.selection.deselectAll();
  editor.newDoc();
  editor.repaint();
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
