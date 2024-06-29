import { Shape } from "@dgmjs/core";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ShapeStyle } from "./types";

export interface AppState {
  activeHandler: string | null;
  style: ShapeStyle;
  selection: Shape[];
  setActiveHandler: (handlerId: string | null) => void;
  setStyle: (style: ShapeStyle) => void;
  setSelection: (selections: Shape[]) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      activeHandler: "Select",
      style: { color: "foreground", size: "M" },
      selection: [],
      setActiveHandler: (handlerId) =>
        set((state) => ({ activeHandler: handlerId })),
      setStyle: (style) =>
        set((state) => ({ style: { ...state.style, ...style } })),
      setSelection: (selections) => set((state) => ({ selection: selections })),
    }),
    { name: "AppStore" }
  )
);
