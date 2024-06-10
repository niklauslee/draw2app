import { Button } from "./components/ui/button";

export function App() {
  return (
    <div className="fixed inset-0 h-[calc(100dvh)] select-none bg-muted/40">
      <div className="fixed inset-x-0 top-0 h-12">sketch2app</div>
      <div className="fixed top-12 bottom-0 left-0 w-1/2">
        <div className="absolute inset-8 border rounded-md bg-background"></div>
      </div>
      <div className="fixed top-12 bottom-0 right-0 w-1/2">
        <div className="absolute inset-8 border rounded-md bg-background"></div>
      </div>
    </div>
  );
}
