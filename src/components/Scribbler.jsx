import { useEffect, useLayoutEffect, useRef, useState } from "react";

import "./Scribbler.css";

const COLORS = [
  { name: "Black", value: "#202020" },
  { name: "Gray", value: "#777777" },
  { name: "Red", value: "#ef5b5b" },
  { name: "Yellow", value: "#ffd45c" },
  { name: "Blue", value: "#55c6ff" },
  { name: "Green", value: "#66d17a" },
  { name: "Orange", value: "#ff9f43" },
  { name: "Purple", value: "#a875e8" },
  { name: "Pink", value: "#f27bbd" },
  { name: "Turquoise", value: "#35c7c4" },
];

const TOOLS = {
  pencil: {
    name: "Pencil",
    size: 2,
    opacity: 0.9,
  },
  pen: {
    name: "Pen",
    size: 3.5,
    opacity: 1,
  },
  brush: {
    name: "Paintbrush",
    size: 7,
    opacity: 0.78,
  },
};

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="m15.2 4.2 4.6 4.6L8.1 20.5H3.5v-4.6z"
        fill="currentColor"
      />
      <path
        d="m13.6 5.8 4.6 4.6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity=".75"
      />
      <path
        d="m3.5 20.5 1.4-4.6 3.2 3.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M7 19 5 21l2-5L16.5 6.5l2 2L10 18z"
        fill="currentColor"
      />
      <path
        d="m15.5 7.5 2 2M17 5l2 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrushIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="m14.8 4.2 5 5-8.9 8.9-5-5z"
        fill="currentColor"
      />
      <path
        d="M5.7 14.8c-2.1 1.5-2.4 3.5-1.9 5.2 1.7-.5 3.7-.2 5.2-1.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EraserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="m6.5 15.5 7.9-7.9a2.2 2.2 0 0 1 3.1 0l2.9 2.9a2.2 2.2 0 0 1 0 3.1l-7.9 7.9H8.2l-2.2-2.2a2.7 2.7 0 0 1 .5-3.8Z"
        fill="currentColor"
      />
      <path
        d="m11.2 20.5 5.5-5.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity=".75"
      />
    </svg>
  );
}

const getCanvasPoint = (event, canvas) => {
  const rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

export default function Scribbler({ onBack }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);

  const [selectedColor, setSelectedColor] = useState(
    COLORS[0].value
  );
  const [tool, setTool] = useState("pencil");

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      const dpr = window.devicePixelRatio || 1;

      if (
        canvas.width === Math.round(nextWidth * dpr) &&
        canvas.height === Math.round(nextHeight * dpr)
      ) {
        return;
      }

      const oldCanvas = document.createElement("canvas");
      oldCanvas.width = canvas.width;
      oldCanvas.height = canvas.height;

      if (canvas.width && canvas.height) {
        const oldContext = oldCanvas.getContext("2d");
        oldContext.drawImage(canvas, 0, 0);
      }

      canvas.width = Math.round(nextWidth * dpr);
      canvas.height = Math.round(nextHeight * dpr);

      const context = canvas.getContext("2d");
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (oldCanvas.width && oldCanvas.height) {
        context.drawImage(
          oldCanvas,
          0,
          0,
          oldCanvas.width / (window.devicePixelRatio || 1),
          oldCanvas.height / (window.devicePixelRatio || 1),
          0,
          0,
          nextWidth,
          nextHeight
        );
      }
    };

    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const draw = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || !drawingRef.current) return;

    const context = canvas.getContext("2d");
    const point = getCanvasPoint(event, canvas);

    context.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over";
    context.strokeStyle = selectedColor;
    context.globalAlpha =
      tool === "eraser" ? 1 : TOOLS[tool].opacity;
    context.lineWidth =
      tool === "eraser" ? 18 : TOOLS[tool].size;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.lineTo(point.x, point.y);
    context.stroke();
    context.beginPath();
    context.moveTo(point.x, point.y);

    context.globalAlpha = 1;
  };

  const handlePointerDown = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);

    const point = getCanvasPoint(event, canvas);
    const context = canvas.getContext("2d");

    drawingRef.current = true;

    context.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over";
    context.globalAlpha =
      tool === "eraser" ? 1 : TOOLS[tool].opacity;
    context.strokeStyle = selectedColor;
    context.lineWidth =
      tool === "eraser" ? 18 : TOOLS[tool].size;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(point.x, point.y);

    // A tiny mark makes a tap useful for writing/drawing.
    // The eraser uses destination-out, so a tap removes instead.
    context.lineTo(point.x + 0.01, point.y + 0.01);
    context.stroke();
    context.beginPath();
    context.moveTo(point.x, point.y);

    context.globalAlpha = 1;
  };

  const handlePointerMove = (event) => {
    if (!drawingRef.current) return;

    if (event.getCoalescedEvents) {
      const events = event.getCoalescedEvents();

      events.forEach((coalescedEvent) => {
        draw(coalescedEvent);
      });

      return;
    }

    draw(event);
  };

  const releasePointer = (event) => {
    const canvas = canvasRef.current;
    drawingRef.current = false;

    if (
      canvas &&
      canvas.hasPointerCapture(event.pointerId)
    ) {
      canvas.releasePointerCapture(event.pointerId);
    }

    const context = canvas?.getContext("2d");
    if (context) {
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    }
  };

  const selectTool = (nextTool) => {
    setTool(nextTool);
  };

  const erase = () => {
    setTool("eraser");
  };

  return (
    <main className="scribbler-page">
      <button
        className="scribbler-back"
        type="button"
        onClick={onBack}
        aria-label="Back to Explore"
      >
        ← Back
      </button>

      <section
        className="scribbler-paper"
        aria-label="Writing page"
      >
        <div className="scribbler-lines" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="scribbler-line" key={index} />
          ))}
        </div>

        <canvas
          ref={canvasRef}
          className={`scribbler-canvas scribbler-canvas-${tool}`}
          data-tool={tool}
          aria-label="Scribble and write on the page"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={releasePointer}
          onPointerCancel={releasePointer}
          onPointerLeave={() => {}}
        />
      </section>

      <div className="scribbler-scroll-control" aria-label="Page scrolling">
        <button
          type="button"
          className="scribbler-scroll-button"
          onClick={() =>
            window.scrollBy({
              top: -window.innerHeight * 0.7,
              behavior: "smooth",
            })
          }
          aria-label="Scroll up"
        >
          ↑
        </button>

        <div className="scribbler-scroll-track" aria-hidden="true">
          <span className="scribbler-scroll-thumb" />
        </div>

        <button
          type="button"
          className="scribbler-scroll-button"
          onClick={() =>
            window.scrollBy({
              top: window.innerHeight * 0.7,
              behavior: "smooth",
            })
          }
          aria-label="Scroll down"
        >
          ↓
        </button>
      </div>

      <aside className="scribbler-toolbar" aria-label="Writing tools">
        <div className="scribbler-tool-tools">
          <button
            type="button"
            className={`scribbler-tool ${
              tool === "pencil" ? "selected" : ""
            }`}
            onClick={() => selectTool("pencil")}
            aria-label="Pencil"
            aria-pressed={tool === "pencil"}
            title="Pencil"
          >
            <PencilIcon />
          </button>

          <button
            type="button"
            className={`scribbler-tool ${
              tool === "pen" ? "selected" : ""
            }`}
            onClick={() => selectTool("pen")}
            aria-label="Pen"
            aria-pressed={tool === "pen"}
            title="Pen"
          >
            <PenIcon />
          </button>

          <button
            type="button"
            className={`scribbler-tool ${
              tool === "brush" ? "selected" : ""
            }`}
            onClick={() => selectTool("brush")}
            aria-label="Paintbrush"
            aria-pressed={tool === "brush"}
            title="Paintbrush"
          >
            <BrushIcon />
          </button>
        </div>

        <div className="scribbler-color-tools">
          {COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`scribbler-color ${
                selectedColor === color.value &&
                tool !== "eraser"
                  ? "selected"
                  : ""
              }`}
              style={{
                "--scribbler-color": color.value,
              }}
              onClick={() => {
                setSelectedColor(color.value);
                setTool("pencil");
              }}
              aria-label={`${color.name} color`}
              aria-pressed={
                selectedColor === color.value &&
                tool !== "eraser"
              }
              title={color.name}
            >
              <span />
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`scribbler-eraser ${
            tool === "eraser" ? "selected" : ""
          }`}
          onClick={erase}
          aria-label="Eraser"
          aria-pressed={tool === "eraser"}
          title="Eraser"
        >
          <EraserIcon />
        </button>
      </aside>
    </main>
  );
}
