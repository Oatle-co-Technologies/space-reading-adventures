import React, { useEffect, useRef, useState } from "react";
import "./Scribbler.css";
import "./SentenceWritingMission.css";

const SENTENCES = [
  { id: "name", build: ({ name }) => name ? `My name is ${name}.` : "My name is Oadile." },
  { id: "age", build: ({ age }) => age ? `I am ${age} years old.` : "I am 4 years old." },
  { id: "like", text: "I like to play." },
  { id: "colour", text: "My favourite colour is blue." },
  { id: "family", text: "I have two brothers." },
  { id: "school", text: "I love to learn." },
];

const TOOLS = {
  pencil: { size: 3, opacity: 0.85 },
  pen: { size: 5, opacity: 1 },
  brush: { size: 10, opacity: 0.8 },
  eraser: { size: 18, opacity: 1 },
};

const FONT_FAMILY = '"Andika", "Comic Sans MS", "Chalkboard SE", sans-serif';
const GUIDE_COLOR = "rgba(82, 172, 205, 0.30)";
const DEFAULT_COLOR = "#000000";

/*
  Each workbook row has three guides:
  top line
  middle line
  baseline

  The sentence is drawn only in the first row. The rest of the
  paper stays available as additional preschool writing rows.
*/
const ROWS = 4;

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m5.5 17.5-1 3 3-1L18 9l-3-3z" fill="#ffd45c" />
      <path d="m15 6 3 3" stroke="#e98d9f" strokeWidth="2.2" />
      <path d="m4.5 20.5 3-1" stroke="#202020" strokeWidth="1.3" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7.2 18.2 16.5 4.9l2.6 2.6-9.3 13.3-4 1.4-4 1.4z" fill="#55c6ff" />
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

function ToolIcon({ type }) {
  if (type === "pencil") return <PencilIcon />;
  if (type === "pen") return <PenIcon />;
  if (type === "brush") return <BrushIcon />;
  return <EraserIcon />;
}

export default function SentenceWritingMission({ onBack, onComplete }) {
  const canvasRef = useRef(null);
  const targetCanvasRef = useRef(null);
  const guideDisplayRef = useRef(null);

  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const completedRef = useRef(false);

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [tool, setTool] = useState("pencil");
  const [progress, setProgress] = useState(0);

  const getProfile = () => {
    try {
      const raw = localStorage.getItem("oatle-child-profile");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const profile = getProfile();
  const current = SENTENCES[sentenceIndex];
  const sentence =
    current.text ||
    current.build(profile);

  const getCanvasPoint = (event, canvas) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  /*
    The visible sentence guide is HTML, just like the Alphabet
    tracing activity. This means the uppercase/lowercase geometry
    is controlled by CSS instead of being approximated inside canvas.
  */
  const renderSentenceCharacters = () => {
    return [...sentence].map((character, index) => {
      const isUppercase =
        character !== character.toLowerCase() &&
        character === character.toUpperCase();

      const className = isUppercase
        ? "sentence-uppercase"
        : "sentence-lowercase";

      return (
        <span
          key={`${character}-${index}`}
          className={className}
          aria-hidden="true"
        >
          {character === " " ? "\u00A0" : character}
        </span>
      );
    });
  };

  /*
    The target canvas mirrors the actual HTML guide positions.
    We read each rendered character's DOM rectangle and font,
    then paint the same glyph into the hidden tracing mask.
  */
  const prepareTargetCanvas = () => {
    const drawingCanvas = canvasRef.current;
    const targetCanvas = targetCanvasRef.current;
    const guideDisplay = guideDisplayRef.current;

    if (!drawingCanvas || !targetCanvas || !guideDisplay) return;

    const rect = drawingCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    targetCanvas.width = width;
    targetCanvas.height = height;

    const targetCtx = targetCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!targetCtx) return;

    targetCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    targetCtx.clearRect(0, 0, rect.width, rect.height);
    targetCtx.fillStyle = "#000000";
    targetCtx.textAlign = "center";
    targetCtx.textBaseline = "alphabetic";

    const guideRect = guideDisplay.getBoundingClientRect();
    const characters = guideDisplay.querySelectorAll(
      ".sentence-uppercase, .sentence-lowercase"
    );

    characters.forEach((element) => {
      const character = element.textContent || "";
      if (!character || character === "\u00A0") return;

      const elementRect = element.getBoundingClientRect();
      const computed = window.getComputedStyle(element);

      const fontSize = parseFloat(computed.fontSize) || 170;
      const fontWeight = computed.fontWeight || "700";
      const fontFamily = computed.fontFamily || FONT_FAMILY;
      const lineHeight = computed.lineHeight;

      targetCtx.font =
        `${fontWeight} ${fontSize}px ${fontFamily}`;

      /*
        The HTML element's top/height is the source of truth.
        Use its actual bounding box so the hidden target follows
        the CSS geometry exactly.
      */
      const x =
        elementRect.left -
        rect.left +
        elementRect.width / 2;

      const top =
        elementRect.top -
        rect.top;

      const metrics = targetCtx.measureText(character);

      const ascent =
        metrics.actualBoundingBoxAscent ||
        fontSize * 0.75;

      /*
        The glyph is drawn so its top aligns with the top of the
        corresponding CSS handwriting block.
      */
      const baseline =
        top + ascent;

      targetCtx.fillText(character, x, baseline);
    });
  };

  const prepareCanvases = () => {
    const drawingCanvas = canvasRef.current;
    const targetCanvas = targetCanvasRef.current;

    if (!drawingCanvas || !targetCanvas) return;

    const rect = drawingCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    drawingCanvas.width = width;
    drawingCanvas.height = height;

    /*
      Give the DOM guide one frame to lay itself out, then build
      the hidden tracing target from those exact positions.
    */
    requestAnimationFrame(() => {
      prepareTargetCanvas();
    });
  };

  const coverageReached = () => {
    const drawingCanvas = canvasRef.current;
    const targetCanvas = targetCanvasRef.current;
    if (!drawingCanvas || !targetCanvas) return 0;

    const targetCtx = targetCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    const drawingCtx = drawingCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!targetCtx || !drawingCtx) return 0;

    const target = targetCtx.getImageData(
      0, 0, targetCanvas.width, targetCanvas.height
    ).data;
    const drawing = drawingCtx.getImageData(
      0, 0, drawingCanvas.width, drawingCanvas.height
    ).data;

    let targetPixels = 0;
    let coveredPixels = 0;

    for (let i = 3; i < target.length; i += 12) {
      if (target[i] > 0) {
        targetPixels += 1;
        if (drawing[i] > 25 || drawing[i - 1] > 25 || drawing[i - 2] > 25) {
          coveredPixels += 1;
        }
      }
    }

    return targetPixels ? coveredPixels / targetPixels : 0;
  };

  const drawPoint = (point) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const currentTool = TOOLS[tool];
    context.save();

    if (tool === "eraser") {
      context.globalCompositeOperation = "destination-out";
      context.globalAlpha = 1;
    } else {
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = currentTool.opacity;
      context.strokeStyle = DEFAULT_COLOR;
      context.fillStyle = DEFAULT_COLOR;
    }

    context.lineWidth = currentTool.size;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();
    context.arc(point.x, point.y, currentTool.size / 2, 0, Math.PI * 2);
    context.fill();
    context.restore();
  };

  const drawLine = (from, to) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const currentTool = TOOLS[tool];
    context.save();

    if (tool === "eraser") {
      context.globalCompositeOperation = "destination-out";
      context.globalAlpha = 1;
    } else {
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = currentTool.opacity;
      context.strokeStyle = DEFAULT_COLOR;
    }

    context.lineWidth = currentTool.size;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
    context.restore();
  };

  const checkTracingProgress = () => {
    if (completedRef.current) return;

    const coverage = coverageReached();
    setProgress(Math.min(100, Math.round(coverage * 100)));

    if (coverage >= 0.28) {
      setProgress(100);
    }
  };

  const handlePointerDown = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || completedRef.current) return;

    event.preventDefault();
    canvas.setPointerCapture?.(event.pointerId);
    drawingRef.current = true;

    const point = getCanvasPoint(event, canvas);
    lastPointRef.current = point;
    drawPoint(point);
    checkTracingProgress();
  };

  const handlePointerMove = (event) => {
    if (!drawingRef.current) return;
    event.preventDefault();

    const events = event.getCoalescedEvents
      ? event.getCoalescedEvents()
      : [event];

    events.forEach((coalescedEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const point = getCanvasPoint(coalescedEvent, canvas);
      const lastPoint = lastPointRef.current;

      if (!lastPoint) {
        lastPointRef.current = point;
        return;
      }

      drawLine(lastPoint, point);
      lastPointRef.current = point;
    });

    checkTracingProgress();
  };

  const releasePointer = (event) => {
    event.preventDefault();
    drawingRef.current = false;
    lastPointRef.current = null;

    const canvas = canvasRef.current;
    if (
      canvas &&
      event?.pointerId != null &&
      canvas.hasPointerCapture?.(event.pointerId)
    ) {
      canvas.releasePointerCapture(event.pointerId);
    }

    checkTracingProgress();
  };

  const clearWritingCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();

    setProgress(0);
  };

  const handleNext = () => {
    if (progress < 28) return;

    if (sentenceIndex === SENTENCES.length - 1) {
      onComplete?.();
      return;
    }

    clearWritingCanvas();
    setSentenceIndex((index) => index + 1);
  };

  return (
    <main className="scribbler-page sentence-writing-page">
      <header className="sentence-writing-header">
        <button
          className="scribbler-back"
          type="button"
          onClick={onBack}
          aria-label="Back to Writing Map"
        >
          ← Back
        </button>

        <div>
          <span>Writing Mission 4</span>
          <h1>Write Sentences</h1>
        </div>

        <div className="sentence-writing-progress">
          {sentenceIndex + 1} / {SENTENCES.length}
        </div>
      </header>

      <section className="scribbler-paper sentence-writing-paper">
        <div className="sentence-writing-content">
          <div className="sentence-writing-area">
            <div className="sentence-workbook-lines" aria-hidden="true">
              {Array.from({ length: ROWS * 3 }, (_, index) => (
                <div className="sentence-workbook-line" key={index} />
              ))}
            </div>

            <div
              ref={guideDisplayRef}
              className="sentence-target-display"
              aria-hidden="true"
            >
              {renderSentenceCharacters()}
            </div>

            <canvas
              ref={canvasRef}
              className={`scribbler-canvas scribbler-canvas-${tool}`}
              data-tool={tool}
              aria-label="Trace the sentence"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={releasePointer}
              onPointerCancel={releasePointer}
              onContextMenu={(event) => event.preventDefault()}
            />

            <canvas
              ref={targetCanvasRef}
              className="sentence-target-canvas"
              aria-hidden="true"
            />
          </div>
        </div>

        <button
          type="button"
          className="sentence-next-button"
          onClick={handleNext}
          disabled={progress < 28}
          aria-label={
            sentenceIndex === SENTENCES.length - 1
              ? "Complete writing mission"
              : "Next sentence"
          }
        >
          →
        </button>
      </section>

      <aside
        className="scribbler-toolbar sentence-writing-toolbar"
        aria-label="Writing tools"
      >
        <div className="scribbler-tool-tools">
          {["pencil", "brush", "pen"].map((toolName) => (
            <button
              key={toolName}
              type="button"
              className={`scribbler-tool ${tool === toolName ? "selected" : ""}`}
              onClick={() => setTool(toolName)}
              aria-label={toolName}
              aria-pressed={tool === toolName}
              title={toolName}
            >
              <ToolIcon type={toolName} />
            </button>
          ))}

          <button
            type="button"
            className={`scribbler-eraser ${tool === "eraser" ? "selected" : ""}`}
            onClick={() => setTool("eraser")}
            aria-label="Eraser"
            aria-pressed={tool === "eraser"}
            title="Eraser"
          >
            <EraserIcon />
          </button>
        </div>
      </aside>

      <p className="sentence-writing-hint">
        Trace the whole sentence.
      </p>
    </main>
  );
}
