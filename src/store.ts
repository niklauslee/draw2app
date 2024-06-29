import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ShapeStyle } from "./types";

export interface AppState {
  activeHandler: string | null;
  style: ShapeStyle;
  setActiveHandler: (handlerId: string | null) => void;
  setStyle: (style: ShapeStyle) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      activeHandler: "Select",
      style: { color: "foreground", size: "M" },
      setActiveHandler: (handlerId) =>
        set((state) => ({ activeHandler: handlerId })),
      setStyle: (style) =>
        set((state) => ({ style: { ...state.style, ...style } })),
    }),
    { name: "AppStore" }
  )
);
