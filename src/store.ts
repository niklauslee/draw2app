import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ShapeStyle } from "./types";

export interface AppState {
  activeHandler: string | null;
  style: ShapeStyle;
  apiKey: string | null;
  generating: boolean;
  appCode: string | null;
  showCode: boolean;
  setActiveHandler: (handlerId: string | null) => void;
  setStyle: (style: ShapeStyle) => void;
  setApiKey: (apiKey: string | null) => void;
  setGenerating: (generating: boolean) => void;
  setAppCode: (appCode: string | null) => void;
  setShowCode: (showCode: boolean) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      activeHandler: "Select",
      style: { color: "foreground", size: "M" },
      apiKey: null,
      generating: false,
      appCode: null,
      showCode: false,
      setActiveHandler: (handlerId) =>
        set((state) => ({ activeHandler: handlerId })),
      setStyle: (style) =>
        set((state) => ({ style: { ...state.style, ...style } })),
      setApiKey: (apiKey) => set((state) => ({ apiKey })),
      setGenerating: (generating) => set((state) => ({ generating })),
      setAppCode: (appCode) => set((state) => ({ appCode })),
      setShowCode: (showCode) => set((state) => ({ showCode })),
    }),
    { name: "AppStore" }
  )
);
