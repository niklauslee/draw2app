import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/store";
import { Trash2Icon } from "lucide-react";

export interface SettingDialogState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useSettingDialog = create<SettingDialogState>()(
  devtools(
    (set) => ({
      open: false,
      setOpen: (open) => set({ open }),
    }),
    { name: "SettingDialog" }
  )
);

export function SettingDialog({}) {
  const { apiKey, setApiKey } = useAppStore();
  const { open, setOpen } = useSettingDialog();

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="w-96 p-3">
        <DialogHeader>
          <DialogTitle className="text-sm">Settings</DialogTitle>
          <DialogDescription className="text-xs"></DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <div>
            <Label htmlFor="name" className="text-right text-xs">
              OpenAI API Key
            </Label>
            <div className="flex items-center gap-1.5 mt-1">
              <Input
                id="apikey"
                type="password"
                className="flex-1 text-xs h-8"
                value={apiKey ?? ""}
                placeholder="Enter your API Key"
                onChange={(e) => {
                  localStorage.setItem("api-key", e.target.value);
                  setApiKey(e.target.value);
                }}
              />
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8"
                title="Delete API Key"
                onClick={() => {
                  localStorage.removeItem("api-key");
                  setApiKey(null);
                }}
              >
                <Trash2Icon size={16} strokeWidth={1.5} />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground my-2">
              Enter your OpenAI API key to enable the AI features. The API key
              is stored locally in your browser and is not sent to the server.
              Nevertheless, please be careful not to leak your API key and
              delete it when you are not using it.
            </div>
          </div>
          <div className="text-xs text-muted-foreground"></div>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
