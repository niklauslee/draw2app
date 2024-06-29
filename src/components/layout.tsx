import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  topArea?: React.ReactNode;
  editorToolbar?: React.ReactNode;
  editorArea?: React.ReactNode;
  viewerToolbar?: React.ReactNode;
  viewerArea?: React.ReactNode;
  onLayout?: () => void;
}

export function Layout({
  topArea,
  editorToolbar,
  editorArea,
  viewerToolbar,
  viewerArea,
  onLayout,
  ...others
}: LayoutProps) {
  const handleLayout = () => {
    onLayout?.();
  };

  return (
    <div
      className="fixed inset-0 h-[calc(100dvh)] select-none bg-background"
      {...others}
    >
      <div className="fixed inset-x-0 top-0 h-12 px-4 flex items-center">
        {topArea}
      </div>
      <div className="fixed top-12 bottom-4 left-4 right-4 border rounded-lg">
        <ResizablePanelGroup
          direction="horizontal"
          className="absolute inset-0"
          onLayout={handleLayout}
        >
          <ResizablePanel defaultSize={50} minSize={20}>
            <div className="relative w-full h-full">
              <div className="absolute inset-x-0 top-0 h-10 border-b flex items-center px-1">
                {editorToolbar}
              </div>
              {editorArea}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50} minSize={20}>
            <div className="relative w-full h-full">
              <div className="absolute inset-x-0 top-0 h-10 border-b">
                {viewerToolbar}
              </div>
              <div className="absolute inset-x-0 top-10 bottom-0 rounded-br-lg">
                {viewerArea}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
