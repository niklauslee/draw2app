import type { Editor } from "@dgmjs/core";
import {
  CircleIcon,
  HandIcon,
  MenuIcon,
  MousePointer2Icon,
  PencilIcon,
  ShapesIcon,
  SlashIcon,
  SquareIcon,
  TypeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  alignBringToFront,
  alignSendToBack,
  fileNew,
  fileOpen,
  fileSave,
  shapeInsert,
} from "@/commands";
import { ArrowLineIcon, BringToFrontIcon, SendToBackIcon } from "./icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Doc, Shape } from "@dgmjs/core";
import { LibraryView } from "./library-view";
import { useEffect, useState } from "react";
import { libraryManager } from "@/libraries";

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

  const handleShapeClick = (shape: Shape) => {
    shapeInsert(shape);
  };

  return (
    <div className="w-full h-full flex items-center justify-between px-1">
      <div className="w-full h-full flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MenuIcon size={16} strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={8} className="w-40">
            <DropdownMenuItem
              className="text-xs"
              onSelect={async () => fileNew()}
            >
              New
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onSelect={() => fileOpen()}>
              Open...
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onSelect={() => fileSave()}>
              Save copy as...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
        <ToolItem
          title="Line"
          active={activeHandler === "Line"}
          onClick={() => setActiveHandler("Line")}
        >
          <SlashIcon size={16} strokeWidth={1.5} />
        </ToolItem>
        <ToolItem
          title="Arrow"
          active={activeHandler === "Connector"}
          onClick={() => setActiveHandler("Connector")}
        >
          <ArrowLineIcon size={16} strokeWidth={1.5} />
        </ToolItem>
        <ToolItem
          title="Freehand"
          active={activeHandler === "Freehand"}
          onClick={() => setActiveHandler("Freehand")}
        >
          <PencilIcon size={16} strokeWidth={1.5} />
        </ToolItem>
        <Separator orientation="vertical" className="h-6" />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-xs font-normal p-0 w-8 h-8"
              title="Shapes"
            >
              <ShapesIcon size={16} strokeWidth={1.5} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            sideOffset={8}
            className="w-[290px] h-[250px] p-0 relative"
            onOpenAutoFocus={(event) => {
              event.preventDefault();
            }}
          >
            <div className="absolute inset-0 flex items-start justify-center p-1.5">
              <LibraryView
                className="w-full"
                doc={libraryManager.docs[0]}
                onShapeClick={handleShapeClick}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-xs font-normal p-0 w-8 h-8"
          title="Bring to front"
          onClick={() => alignBringToFront()}
        >
          <BringToFrontIcon size={16} strokeWidth={1.5} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-xs font-normal p-0 w-8 h-8"
          title="Send to back"
          onClick={() => alignSendToBack()}
        >
          <SendToBackIcon size={16} strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}
