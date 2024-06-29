import { useAppStore } from "@/store";
import { Button } from "./ui/button";
import { useSettingDialog } from "./setting-dialog";
import { cn } from "@/lib/utils";

export function ViewerToolbar({}) {
  const { apiKey } = useAppStore();
  const { setOpen } = useSettingDialog();

  return (
    <div className="h-full flex items-center justify-between gap-1 px-1">
      <div></div>
      <div className="flex gap-1">
        <div
          className={cn(
            "w-32 border h-8 rounded text-xs flex items-center px-3 text-muted-foreground cursor-pointer"
          )}
          onClick={() => {
            setOpen(true);
          }}
        >
          OpenAI API Key
        </div>
        <Button size="sm" disabled={!apiKey}>
          Generate
        </Button>
      </div>
    </div>
  );
}
