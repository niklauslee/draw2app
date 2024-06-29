import { Button } from "./ui/button";

export function ViewerToolbar({}) {
  return (
    <div className="h-full flex items-center justify-between gap-1 bg-background">
      <div></div>
      <div className="flex gap-1 px-1">
        <div className="w-36 border h-8 rounded text-xs flex items-center px-3 text-muted-foreground cursor-pointer">
          OpenAI API Key
        </div>
        <Button size="sm">Generate</Button>
      </div>
    </div>
  );
}
