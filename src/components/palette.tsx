import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ShapeColor, ShapeSize, ShapeStyle } from "@/types";
import {
  FillCrossHatchIcon,
  FillHachureIcon,
  FillNoneIcon,
  FillSolidIcon,
} from "./icons";

interface PaletteProps {
  style: ShapeStyle;
  onStyleChange?: (style: ShapeStyle) => void;
}

export function Palette({ style, onStyleChange }: PaletteProps) {
  const changeStyle = (style: ShapeStyle) => {
    if (onStyleChange) onStyleChange(style);
  };

  return (
    <div className="absolute left-4 top-4 bg-white border rounded-md p-1 flex flex-col gap-1">
      <div>
        <ToggleGroup
          className="flex flex-col"
          type="single"
          value={style.color}
          onValueChange={(value) => {
            changeStyle({ color: value as ShapeColor });
          }}
        >
          <div className="w-full flex justify-center gap-1">
            <ToggleGroupItem className="text-xs p-0 w-7 h-7" value="foreground">
              <div className="w-3 h-3 rounded-full bg-foreground"></div>
            </ToggleGroupItem>
            <ToggleGroupItem className="text-xs p-0 w-7 h-7" value="red">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </ToggleGroupItem>
            <ToggleGroupItem className="text-xs p-0 w-7 h-7" value="green">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </ToggleGroupItem>
            <ToggleGroupItem className="text-xs p-0 w-7 h-7" value="blue">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </ToggleGroupItem>
          </div>
          <div className="w-full flex justify-center gap-1">
            <ToggleGroupItem className="text-xs p-0 w-7 h-7" value="gray">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            </ToggleGroupItem>
            <ToggleGroupItem className="text-xs p-0 w-7 h-7" value="purple">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            </ToggleGroupItem>
            <ToggleGroupItem className="text-xs p-0 w-7 h-7" value="cyan">
              <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            </ToggleGroupItem>
            <ToggleGroupItem className="text-xs p-0 w-7 h-7" value="yellow">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            </ToggleGroupItem>
          </div>
        </ToggleGroup>
      </div>
      <div>
        <ToggleGroup
          type="single"
          value={style.size}
          onValueChange={(value) => {
            changeStyle({ size: value as ShapeSize });
          }}
        >
          <ToggleGroupItem
            className="text-xs font-normal p-0 w-7 h-7"
            value="S"
            title="Small"
          >
            S
          </ToggleGroupItem>
          <ToggleGroupItem
            className="text-xs font-normal p-0 w-7 h-7"
            value="M"
            title="Medium"
          >
            M
          </ToggleGroupItem>
          <ToggleGroupItem
            className="text-xs font-normal p-0 w-7 h-7"
            value="L"
            title="Large"
          >
            L
          </ToggleGroupItem>
          <ToggleGroupItem
            className="text-xs font-normal p-0 w-7 h-7"
            value="XL"
            title="Extra Large"
          >
            XL
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <ToggleGroup
          type="single"
          value={style.fill}
          onValueChange={(value) => {
            changeStyle({ fill: value as any });
          }}
        >
          <ToggleGroupItem
            className="text-xs font-normal p-0 w-7 h-7"
            value="none"
            title="None"
          >
            <FillNoneIcon size={16} strokeWidth={1.5} />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="text-xs font-normal p-0 w-7 h-7"
            value="solid"
            title="Solid"
          >
            <FillSolidIcon size={16} strokeWidth={1.5} />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="text-xs font-normal p-0 w-7 h-7"
            value="hachure"
            title="Hachure"
          >
            <FillHachureIcon size={16} strokeWidth={1.5} />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="text-xs font-normal p-0 w-7 h-7"
            value="cross-hatch"
            title="Cross Hatch"
          >
            <FillCrossHatchIcon size={16} strokeWidth={1.5} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
