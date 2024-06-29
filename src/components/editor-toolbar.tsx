import type { Editor } from "@dgmjs/core";
import {
  CircleIcon,
  HandIcon,
  MenuIcon,
  MousePointer2Icon,
  PencilIcon,
  SlashIcon,
  SquareIcon,
  TypeIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface ToolItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

function ToolItem({ active = false, children, ...props }: ToolItemProps) {
  return (
    <button
      className={[
        "hover:bg-slate-100 w-8 h-8 flex items-center justify-center rounded",
        active ? "bg-slate-100" : "bg-transparent",
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

interface EditorToolbarProps {
  activeHandler: string | null;
  onActiveHandlerChange?: (handler: string) => void;
  editor: Editor | null;
}

export function EditorToolbar({
  activeHandler = "Select",
  onActiveHandlerChange,
}: EditorToolbarProps) {
  const setActiveHandler = (handler: string) => {
    if (onActiveHandlerChange) onActiveHandlerChange(handler);
  };

  return (
    <div className="w-full h-full flex items-center gap-1 bg-background">
      <Button variant="ghost" className="w-8 h-8 p-0">
        <MenuIcon size={16} strokeWidth={1.5} />
      </Button>
      <Separator orientation="vertical" className="h-6" />
      <ToolItem
        title="Select"
        active={activeHandler === "Select"}
        onClick={() => setActiveHandler("Select")}
      >
        <MousePointer2Icon size={16} strokeWidth={1.5} />
      </ToolItem>
      <ToolItem
        title="Hand"
        active={activeHandler === "Hand"}
        onClick={() => setActiveHandler("Hand")}
      >
        <HandIcon size={16} strokeWidth={1.5} />
      </ToolItem>
      <Separator orientation="vertical" className="h-6" />
      <ToolItem
        title="Rectangle"
        active={activeHandler === "Rectangle"}
        onClick={() => setActiveHandler("Rectangle")}
      >
        <SquareIcon size={16} strokeWidth={1.5} />
      </ToolItem>
      <ToolItem
        title="Ellipse"
        active={activeHandler === "Ellipse"}
        onClick={() => setActiveHandler("Ellipse")}
      >
        <CircleIcon size={16} strokeWidth={1.5} />
      </ToolItem>
      <ToolItem
        title="Text"
        active={activeHandler === "Text"}
        onClick={() => setActiveHandler("Text")}
      >
        <TypeIcon size={16} strokeWidth={1.5} />
      </ToolItem>
      {/* <ToolItem
        title="Image"
        active={activeHandler === "Image"}
        onClick={() => setActiveHandler("Image")}
      >
        <ImageIcon size={16} strokeWidth={1.5} />
      </ToolItem> */}
      <ToolItem
        title="Line"
        active={activeHandler === "Line"}
        onClick={() => setActiveHandler("Line")}
      >
        <SlashIcon size={16} strokeWidth={1.5} />
      </ToolItem>
      {/* <ToolItem
        title="Connector"
        active={activeHandler === "Connector"}
        onClick={() => setActiveHandler("Connector")}
      >
        <SplineIcon size={16} strokeWidth={1.5} />
      </ToolItem> */}
      <ToolItem
        title="Freehand"
        active={activeHandler === "Freehand"}
        onClick={() => setActiveHandler("Freehand")}
      >
        <PencilIcon size={16} strokeWidth={1.5} />
      </ToolItem>
    </div>
  );
}
