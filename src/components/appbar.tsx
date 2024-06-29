export function Appbar({}) {
  return (
    <div>
      <div className="text-sm font-semibold tracking-tight leading-3">
        draw2app
      </div>
      <div className="text-xs">
        Generate app from drawing by AI powered by{" "}
        <a href="https://dgmjs.dev" target="_blank" className="underline">
          DGM.js
        </a>
      </div>
    </div>
  );
}
