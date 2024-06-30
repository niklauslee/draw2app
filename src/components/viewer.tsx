import { useAppStore } from "@/store";
import { CheckIcon, ClipboardIcon, LoaderCircleIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

export function Viewer({}) {
  const { generating, appCode, showCode } = useAppStore((state) => ({
    generating: state.generating,
    appCode: state.appCode,
    showCode: state.showCode,
  }));
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (appCode && !showCode) {
      setTimeout(() => {
        iframeRef.current?.focus();
      }, 10);
    }
  }, [appCode, showCode]);

  // Update theme
  const syntaxTheme = oneLight;
  syntaxTheme['code[class*="language-"]'].fontFamily =
    "IBM Plex Mono, monospace";

  return (
    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">
      {!generating && !appCode && <div>No generated app</div>}
      {generating && (
        <div>
          <div>Generating...</div>
          <div className="flex items-center justify-center mt-3">
            <LoaderCircleIcon className="animate-spin" />
          </div>
        </div>
      )}
      {!generating && appCode && !showCode && (
        <iframe ref={iframeRef} className="h-full w-full" srcDoc={appCode} />
      )}
      {!generating && appCode && showCode && (
        <>
          <ScrollArea className="w-full h-full rounded-br-lg">
            <SyntaxHighlighter
              PreTag="div"
              children={appCode}
              language="html"
              style={syntaxTheme}
              customStyle={{
                fontFamily: "IBM Plex Mono",
                margin: 0,
                borderRadius: 0,
              }}
            />
          </ScrollArea>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-4"
            onClick={() => {
              navigator.clipboard.writeText(appCode);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            {copied ? (
              <CheckIcon size={16} strokeWidth={1.5} className="mr-2" />
            ) : (
              <ClipboardIcon size={16} strokeWidth={1.5} className="mr-2" />
            )}
            Copy
          </Button>
        </>
      )}
    </div>
  );
}
