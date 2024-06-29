import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ShapeStyle } from "./types";

export interface AppState {
  activeHandler: string | null;
  style: ShapeStyle;
  apiKey: string | null;
  setActiveHandler: (handlerId: string | null) => void;
  setStyle: (style: ShapeStyle) => void;
  setApiKey: (apiKey: string | null) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      activeHandler: "Select",
      style: { color: "foreground", size: "M" },
      apiKey: null,
      setActiveHandler: (handlerId) =>
        set((state) => ({ activeHandler: handlerId })),
      setStyle: (style) =>
        set((state) => ({ style: { ...state.style, ...style } })),
      setApiKey: (apiKey) => set((state) => ({ apiKey })),
    }),
    { name: "AppStore" }
  )
);
