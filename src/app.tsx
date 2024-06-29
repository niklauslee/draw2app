import { useState } from "react";
import { Layout } from "./components/layout";
import { Appbar } from "./components/appbar";
import { Toolbar } from "./components/editor-toolbar";
import type { Editor } from "@dgmjs/core";
import { DGMEditor } from "@dgmjs/react";

declare global {
  interface Window {
    editor: Editor;
  }
}

export function App() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [activeHandler, setActiveHandler] = useState<string>("Select");

  const handleMount = async (editor: Editor) => {
    window.editor = editor;
    editor.newDoc();
    editor.fitToScreen();
    setEditor(editor);
    window.addEventListener("resize", () => editor.fit());
  };

  const handleLayout = () => {
    setTimeout(() => editor?.fit(), 0);
  };

  const handleActiveHandlerChange = (handlerId: string) => {
    // demoStore.setActiveHandler(handlerId);
    editor?.selection.deselectAll();
    editor?.focus();
  };

  return (
    <Layout
      topArea={<Appbar />}
      editorToolbar={
        <Toolbar
          editor={editor}
          activeHandler={activeHandler}
          onActiveHandlerChange={(handler) => editor?.activateHandler(handler)}
        />
      }
      editorArea={
        <DGMEditor
          className="absolute inset-x-0 top-10 bottom-0 rounded-bl-lg"
          onMount={handleMount}
          onActiveHandlerChange={(handler) => setActiveHandler(handler)}
        />
      }
      viewerToolbar="toolbar"
      viewerArea="content"
      onLayout={handleLayout}
    />
  );
}
