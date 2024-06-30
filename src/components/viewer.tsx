import { useAppStore } from "@/store";
import { stripMarkdownCode } from "@/utils";
import { CheckIcon, ClipboardIcon, LoaderCircleIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

const htmlTest = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Breakout Game</title>\n<style>\n  body {\n    margin: 0;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    background: #f0f0f0;\n  }\n  canvas {\n    border: 1px solid #000;\n  }\n</style>\n</head>\n<body>\n<canvas id="breakoutCanvas" width="480" height="320"></canvas>\n<script>\n  var canvas = document.getElementById("breakoutCanvas");\n  var ctx = canvas.getContext("2d");\n\n  var ballRadius = 10;\n  var x = canvas.width / 2;\n  var y = canvas.height - 30;\n  var dx = 2;\n  var dy = -2;\n  var paddleHeight = 10;\n  var paddleWidth = 75;\n  var paddleX = (canvas.width - paddleWidth) / 2;\n  var rightPressed = false;\n  var leftPressed = false;\n  var brickRowCount = 3;\n  var brickColumnCount = 5;\n  var brickWidth = 75;\n  var brickHeight = 20;\n  var brickPadding = 10;\n  var brickOffsetTop = 30;\n  var brickOffsetLeft = 30;\n  var bricks = [];\n\n  for (var c = 0; c < brickColumnCount; c++) {\n    bricks[c] = [];\n    for (var r = 0; r < brickRowCount; r++) {\n      bricks[c][r] = { x: 0, y: 0, status: 1 };\n    }\n  }\n\n  document.addEventListener("keydown", keyDownHandler, false);\n  document.addEventListener("keyup", keyUpHandler, false);\n\n  function keyDownHandler(e) {\n    if (e.key == "Right" || e.key == "ArrowRight") {\n      rightPressed = true;\n    } else if (e.key == "Left" || e.key == "ArrowLeft") {\n      leftPressed = true;\n    }\n  }\n\n  function keyUpHandler(e) {\n    if (e.key == "Right" || e.key == "ArrowRight") {\n      rightPressed = false;\n    } else if (e.key == "Left" || e.key == "ArrowLeft") {\n      leftPressed = false;\n    }\n  }\n\n  function collisionDetection() {\n    for (var c = 0; c < brickColumnCount; c++) {\n      for (var r = 0; r < brickRowCount; r++) {\n        var b = bricks[c][r];\n        if (b.status == 1) {\n          if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {\n            dy = -dy;\n            b.status = 0;\n          }\n        }\n      }\n    }\n  }\n\n  function drawBall() {\n    ctx.beginPath();\n    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);\n    ctx.fillStyle = "#0095DD";\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  function drawPaddle() {\n    ctx.beginPath();\n    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);\n    ctx.fillStyle = "#0095DD";\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  function drawBricks() {\n    for (var c = 0; c < brickColumnCount; c++) {\n      for (var r = 0; r < brickRowCount; r++) {\n        if (bricks[c][r].status == 1) {\n          var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;\n          var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;\n          bricks[c][r].x = brickX;\n          bricks[c][r].y = brickY;\n          ctx.beginPath();\n          ctx.rect(brickX, brickY, brickWidth, brickHeight);\n          ctx.fillStyle = "#0095DD";\n          ctx.fill();\n          ctx.closePath();\n        }\n      }\n    }\n  }\n\n  function draw() {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    drawBricks();\n    drawBall();\n    drawPaddle();\n    collisionDetection();\n\n    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {\n      dx = -dx;\n    }\n    if (y + dy < ballRadius) {\n      dy = -dy;\n    } else if (y + dy > canvas.height - ballRadius) {\n      if (x > paddleX && x < paddleX + paddleWidth) {\n        dy = -dy;\n      } else {\n        // Game over, reloading the page\n        document.location.reload();\n      }\n    }\n\n    if (rightPressed && paddleX < canvas.width - paddleWidth) {\n      paddleX += 7;\n    } else if (leftPressed && paddleX > 0) {\n      paddleX -= 7;\n    }\n\n    x += dx;\n    y += dy;\n    requestAnimationFrame(draw);\n  }\n\n  draw();\n</script>\n</body>\n</html>`;

export function Viewer({}) {
  const { generating, appCode, showCode } = useAppStore((state) => ({
    generating: state.generating,
    appCode: state.appCode,
    showCode: state.showCode,
  }));
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const stripCode = stripMarkdownCode(appCode ?? "");

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
        <iframe ref={iframeRef} className="h-full w-full" srcDoc={stripCode} />
      )}
      {!generating && appCode && showCode && (
        <>
          <ScrollArea className="w-full h-full rounded-br-lg">
            <SyntaxHighlighter
              PreTag="div"
              children={htmlTest}
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
              navigator.clipboard.writeText(stripCode);
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
