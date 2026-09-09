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

const STICKERS = [
  { name: "Star", type: "star", color: "#ffd45c" },
  { name: "Heart", type: "heart", color: "#ef5b5b" },
  { name: "Flower", type: "flower", color: "#f27bbd" },
  { name: "Sun", type: "sun", color: "#ff9f43" },
  { name: "Moon", type: "moon", color: "#a875e8" },
  { name: "Cloud", type: "cloud", color: "#55c6ff" },
];

function StickerShape({ type, color }) {
  if (type === "star") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path fill={color} d="m24 4 5.7 11.6 12.8 1.9-9.2 9 2.2 12.7L24 33.2 12.5 39.2l2.2-12.7-9.2-9 12.8-1.9z" /></svg>;
  }
  if (type === "heart") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path fill={color} d="M24 40S7 30 7 18.8C7 12.8 11.2 9 16.5 9c3.2 0 5.9 1.6 7.5 4.1C25.6 10.6 28.3 9 31.5 9 36.8 9 41 12.8 41 18.8 41 30 24 40 24 40Z" /></svg>;
  }
  if (type === "flower") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path fill={color} d="M24 20c-5-10-14-7.4-12 1.1-8.5-2-11.1 7-1.1 9.9-5 7.2 3.2 13.5 9.1 6.7 4.7 7.5 13.7 2.2 10-6.2 8.5-3 5.9-12.8-4-10.5 1.8-8.4-6.6-12-12-1Z" /><circle cx="24" cy="24" r="5" fill="#ffd45c" /></svg>;
  }
  if (type === "sun") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="10" fill={color} /><path fill={color} d="M21.5 3h5v8h-5zm0 34h5v8h-5zM3 21.5h8v5H3zm34 0h8v5h-8zM8.1 11.6l3.5-3.5 5.7 5.7-3.5 3.5zm22.6 22.6 3.5-3.5 5.7 5.7-3.5 3.5zM32.2 13.8l5.7-5.7 3.5 3.5-5.7 5.7zM8.1 36.4l5.7-5.7 3.5 3.5-5.7 5.7z" /></svg>;
  }
  if (type === "moon") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path fill={color} d="M35.8 31.5A17 17 0 0 1 16.5 12.2 17 17 0 1 0 35.8 31.5Z" /></svg>;
  }
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path fill={color} d="M10 34h28a8 8 0 0 0 0-16 12 12 0 0 0-22.5 2.5A6.8 6.8 0 0 0 10 34Z" /></svg>;
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 17.8 15.8 6l3.2 3.2L7.2 21H4z" fill="#ffd45c" />
      <path d="m15.8 6 1.6-1.6a1.5 1.5 0 0 1 2.1 0l.1.1a1.5 1.5 0 0 1 0 2.1L19 7.8z" fill="#ef5b5b" />
      <path d="m4 17.8 3.2 3.2H4z" fill="#202020" />
      <path d="m6.2 15.6 3.2 3.2" stroke="#fff" strokeWidth="1.2" opacity=".55" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.2 18.2 16.5 4.9l2.6 2.6-9.3 13.3-4 1.4z" fill="#55c6ff" />
      <path d="m16.5 4.9 1.1-1.1a1.7 1.7 0 0 1 2.4 0l.2.2a1.7 1.7 0 0 1 0 2.4l-1.1 1.1z" fill="#234a8a" />
      <path d="m7.2 18.2-1.4 4 4-1.4z" fill="#202020" />
      <path d="m9.3 17.1 2.6 1.8" stroke="#fff" strokeWidth="1.2" opacity=".6" />
    </svg>
  );
}

function BrushIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m14.5 3.5 6 6-8.3 8.3-6-6z" fill="#a875e8" />
      <path d="m6.1 11.8 6 6-2.5 2.5-6-6z" fill="#ff9f43" />
      <path d="M3.6 14.3c-2 2-1.7 5.1.5 6.1 1-.1 2.4-.7 3.5-2.1z" fill="#ffd45c" />
      <path d="m14.5 3.5 6 6" stroke="#fff" strokeWidth="1.2" opacity=".5" />
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
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [stickers, setStickers] = useState([]);

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

    if (selectedSticker) {
      setStickers((current) => [
        ...current,
        {
          id: `${selectedSticker.type}-${Date.now()}-${Math.random()}`,
          type: selectedSticker.type,
          color: selectedSticker.color,
          x: point.x,
          y: point.y,
        },
      ]);
      return;
    }

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
    setSelectedSticker(null);
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

        <div className="scribbler-sticker-layer" aria-hidden="true">
          {stickers.map((sticker) => (
            <span
              key={sticker.id}
              className="scribbler-sticker-on-page"
              style={{
                left: sticker.x,
                top: sticker.y,
              }}
            >
              <StickerShape type={sticker.type} color={sticker.color} />
            </span>
          ))}
        </div>

        <canvas
          ref={canvasRef}
          className={`scribbler-canvas scribbler-canvas-${tool} ${
            selectedSticker ? "scribbler-canvas-sticker-mode" : ""
          }`}
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

        <div className="scribbler-sticker-tools" aria-label="Stickers">
          {STICKERS.map((sticker) => (
            <button
              key={sticker.type}
              type="button"
              className={`scribbler-sticker ${
                selectedSticker?.type === sticker.type ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedSticker(sticker);
                setTool("pencil");
              }}
              aria-label={`${sticker.name} sticker`}
              aria-pressed={selectedSticker?.type === sticker.type}
              title={sticker.name}
            >
              <StickerShape type={sticker.type} color={sticker.color} />
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
