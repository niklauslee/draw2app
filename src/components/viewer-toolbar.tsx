import { useAppStore } from "@/store";
import { Button } from "./ui/button";
import { useSettingDialog } from "./setting-dialog";
import { cn } from "@/lib/utils";
import { generateApp } from "@/commands";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ViewerToolbar({}) {
  const { apiKey, generating, setShowCode } = useAppStore((state) => ({
    apiKey: state.apiKey,
    generating: state.generating,
    setShowCode: state.setShowCode,
  }));
  const { setOpen } = useSettingDialog();

  return (
    <div className="h-full flex items-center justify-between gap-1 px-1">
      <div>
        <Tabs
          defaultValue="view"
          className="w-[400px]"
          onValueChange={(value) => setShowCode(value === "code")}
        >
          <TabsList className="h-8">
            <TabsTrigger className="h-6 text-xs" value="view">
              View
            </TabsTrigger>
            <TabsTrigger className="h-6 text-xs" value="code">
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
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
        <Button
          size="sm"
          disabled={!apiKey || generating}
          onClick={() => generateApp()}
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
