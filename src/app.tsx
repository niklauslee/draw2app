import { useState } from "react";
import { Layout } from "./components/layout";
import { Appbar } from "./components/appbar";
import { EditorToolbar } from "./components/editor-toolbar";
import { FillStyle, Shape, type Editor } from "@dgmjs/core";
import { DGMEditor } from "@dgmjs/react";
import { Palette } from "./components/palette";
import { useAppStore } from "./store";
import type { ShapeStyle } from "./types";
import { propsToStyle, styleToProps } from "./utils";
import { ViewerToolbar } from "./components/viewer-toolbar";
import { Viewer } from "./components/viewer";

declare global {
  interface Window {
    editor: Editor;
  }
}

export function App() {
  const [editor, setEditor] = useState<Editor | null>(null);
  const { activeHandler, style, setActiveHandler, setStyle, setSelection } =
    useAppStore();

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

  const handleShapeInitialize = (shape: Shape) => {
    shape.fillStyle =
      shape instanceof Text ? FillStyle.NONE : FillStyle.HACHURE;
    shape.fontFamily = "Gloria Hallelujah";
    shape.roughness = 1;
    const style = useAppStore.getState().style;
    const props = styleToProps([shape], style);
    Object.assign(shape, props);
  };

  const handleSelectionChange = (selections: Shape[]) => {
    const style = propsToStyle(selections);
    setStyle(style);
  };

  const handleStyleChange = (style: ShapeStyle) => {
    setStyle(style);
    const selections = editor?.selection.getShapes() ?? [];
    const props = styleToProps(selections, style);
    editor?.actions.update(props);
  };

  return (
    <Layout
      topArea={<Appbar />}
      editorToolbar={
        <EditorToolbar
          editor={editor}
          activeHandler={activeHandler}
          onActiveHandlerChange={(handler) => editor?.activateHandler(handler)}
        />
      }
      editorArea={
        <>
          <DGMEditor
            className="absolute inset-0 rounded-bl-lg"
            onMount={handleMount}
            onShapeInitialize={handleShapeInitialize}
            onActiveHandlerChange={(handler) => setActiveHandler(handler)}
            onSelectionChange={handleSelectionChange}
          />
          <Palette style={style} onStyleChange={handleStyleChange} />
        </>
      }
      viewerToolbar={<ViewerToolbar />}
      viewerArea={<Viewer />}
      onLayout={handleLayout}
    />
  );
}
