import { useRef, useState } from "react";

import "./Scribbler.css";

const COLORS = [
  { name: "Red", value: "#ef5b5b" },
  { name: "Yellow", value: "#ffd45c" },
  { name: "Blue", value: "#55c6ff" },
  { name: "Green", value: "#66d17a" },
  { name: "Orange", value: "#ff9f43" },
  { name: "Purple", value: "#a875e8" },
  { name: "Pink", value: "#f27bbd" },
  { name: "Turquoise", value: "#35c7c4" },
];

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

export default function Scribbler() {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [tool, setTool] = useState("pencil");

  const handlePointerDown = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(event.pointerId);

    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(event.clientX - rect.left, event.clientY - rect.top);
  };

  const handlePointerMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.hasPointerCapture(event.pointerId)) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = tool === "eraser" ? 28 : 7;
    context.strokeStyle =
      tool === "eraser" ? "#fffdf5" : selectedColor;

    context.lineTo(
      event.clientX - rect.left,
      event.clientY - rect.top
    );
    context.stroke();
  };

  const releasePointer = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <main className="scribbler-page">
      <section className="scribbler-paper" aria-label="Writing page">
        <div className="scribbler-lines" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="scribbler-line" key={index} />
          ))}
        </div>

        <canvas
          ref={canvasRef}
          className="scribbler-canvas"
          aria-label="Scribble and write on the page"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={releasePointer}
          onPointerCancel={releasePointer}
        />
      </section>

      <aside className="scribbler-toolbar" aria-label="Writing tools">
        <div className="scribbler-color-tools">
          {COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`scribbler-color ${
                selectedColor === color.value && tool === "pencil"
                  ? "selected"
                  : ""
              }`}
              style={{ "--scribbler-color": color.value }}
              onClick={() => {
                setSelectedColor(color.value);
                setTool("pencil");
              }}
              aria-label={`${color.name} pencil`}
              aria-pressed={
                selectedColor === color.value && tool === "pencil"
              }
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
          onClick={() => setTool("eraser")}
          aria-label="Eraser"
          aria-pressed={tool === "eraser"}
        >
          <EraserIcon />
        </button>
      </aside>
    </main>
  );
}
