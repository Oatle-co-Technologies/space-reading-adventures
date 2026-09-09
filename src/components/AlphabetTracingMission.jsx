import React, { useEffect, useRef, useState } from "react";
import "./AlphabetTracingMission.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const DEFAULT_COLOR = "#000000";

const TOOLS = {
  pencil: {
    size: 3,
    opacity: 0.85,
  },
  pen: {
    size: 5,
    opacity: 1,
  },
  brush: {
    size: 10,
    opacity: 0.8,
  },
  eraser: {
    size: 24,
    opacity: 1,
  },
};

/* =========================
   TOOL ICONS
   ========================= */

function PencilIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 48L18 36L43 11C45 9 48 9 50 11L53 14C55 16 55 19 53 21L28 46L16 50L14 48Z"
        fill="#FFD166"
        stroke="#333"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M39 15L49 25"
        stroke="#E85D75"
        strokeWidth="5"
      />
      <path
        d="M14 48L18 36L28 46L16 50L14 48Z"
        fill="#F4C7A1"
        stroke="#333"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M14 48L13 53L18 50"
        fill="#333"
      />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17 49L21 36L45 12C47 10 50 10 52 12L54 14C56 16 56 19 54 21L30 45L17 49Z"
        fill="#4DA3FF"
        stroke="#263238"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M21 36L30 45"
        stroke="#263238"
        strokeWidth="3"
      />
      <path
        d="M17 49L15 54L21 51"
        fill="#263238"
      />
    </svg>
  );
}

function BrushIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M35 12L51 28"
        stroke="#8B5CF6"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M32 15L49 32"
        stroke="#F28C28"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M14 50C19 49 24 46 27 42C30 38 30 34 27 31C24 28 20 28 17 31C14 34 14 38 17 41C19 43 18 46 14 50Z"
        fill="#8B5CF6"
        stroke="#333"
        strokeWidth="3"
      />
    </svg>
  );
}

function EraserIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15 39L35 17C37 15 40 15 42 17L51 26C53 28 53 31 51 33L31 53H20L13 46C11 44 13 41 15 39Z"
        fill="#F5A6C8"
        stroke="#333"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M35 17L45 27L25 47L15 37L35 17Z"
        fill="#FFD6E7"
      />
      <path
        d="M25 47L31 53"
        stroke="#333"
        strokeWidth="3"
      />
    </svg>
  );
}

/* =========================
   COMPONENT
   ========================= */

export default function AlphabetTracingMission({
  onBack,
  onComplete,
}) {
  const canvasRef = useRef(null);
  const targetCanvasRef = useRef(null);

  const drawingRef = useRef(false);
  const completedRef = useRef(false);
  const lastPointRef = useRef(null);

  const [letterIndex, setLetterIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tool, setTool] = useState("pencil");

  const letter = LETTERS[letterIndex];

  /* =========================
     CANVAS SETUP
     ========================= */

  useEffect(() => {
    const canvas = canvasRef.current;
    const targetCanvas = targetCanvasRef.current;

    if (!canvas || !targetCanvas) return;

    const resizeCanvases = () => {
      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      targetCanvas.width = Math.round(rect.width * dpr);
      targetCanvas.height = Math.round(rect.height * dpr);

      const ctx = canvas.getContext("2d");
      const targetCtx = targetCanvas.getContext("2d");

      if (!ctx || !targetCtx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      targetCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, rect.width, rect.height);
      targetCtx.clearRect(0, 0, rect.width, rect.height);

      drawTargetLetters(targetCtx, rect.width, rect.height);
    };

    resizeCanvases();

    window.addEventListener("resize", resizeCanvases);

    return () => {
      window.removeEventListener("resize", resizeCanvases);
    };
  }, [letterIndex]);

  /* =========================
     TARGET LETTERS
     ========================= */

  function drawTargetLetters(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);

    const letterSize = Math.min(width * 0.34, 210);

    ctx.font = `${letterSize}px "Andika", "Comic Sans MS", "Chalkboard SE", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerY = height * 0.48;

    const leftX = width * 0.35;
    const rightX = width * 0.65;

    /*
      The target is intentionally invisible to the child.
      It exists only as a mask for checking tracing coverage.
    */
    ctx.fillStyle = "#000000";

    ctx.fillText(letter, leftX, centerY);

    ctx.font = `${letterSize * 0.78}px "Andika", "Comic Sans MS", "Chalkboard SE", sans-serif`;

    ctx.fillText(letter.toLowerCase(), rightX, centerY);
  }

  /* =========================
     POINTER POSITION
     ========================= */

  function getCanvasPoint(event, canvas) {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    /*
      The canvas already has a high-DPI backing resolution,
      so these coordinates are converted directly into
      canvas coordinates. We do NOT multiply them by dpr again.
    */
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  /* =========================
     START DRAWING
     ========================= */

  function handlePointerDown(event) {
    event.preventDefault();

    const canvas = canvasRef.current;

    if (!canvas) return;

    if (completedRef.current) return;

    canvas.setPointerCapture?.(event.pointerId);

    drawingRef.current = true;

    const point = getCanvasPoint(event, canvas);

    lastPointRef.current = point;

    drawPoint(point);
  }

  /* =========================
     DRAW
     ========================= */

  function handlePointerMove(event) {
    event.preventDefault();

    if (!drawingRef.current) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const point = getCanvasPoint(event, canvas);

    const lastPoint = lastPointRef.current;

    if (!lastPoint) {
      lastPointRef.current = point;
      return;
    }

    drawLine(lastPoint, point);

    lastPointRef.current = point;

    /*
      Check frequently while drawing so the child
      doesn't have to release their finger in a
      particular place.
    */
    checkTracingProgress();
  }

  /* =========================
     DRAW POINT
     ========================= */

  function drawPoint(point) {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const currentTool = TOOLS[tool];

    ctx.save();

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = currentTool.opacity;
      ctx.strokeStyle = DEFAULT_COLOR;
    }

    ctx.lineWidth = currentTool.size * dpr;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    /*
      Because the canvas context has already been scaled
      to dpr, the actual drawing coordinates are normal
      CSS-space coordinates.
    */
    const x = point.x / dpr;
    const y = point.y / dpr;

    ctx.beginPath();
    ctx.arc(x, y, ctx.lineWidth / dpr / 2, 0, Math.PI * 2);

    if (tool === "eraser") {
      ctx.fillStyle = "#000000";
      ctx.fill();
    } else {
      ctx.fillStyle = DEFAULT_COLOR;
      ctx.fill();
    }

    ctx.restore();
  }

  /* =========================
     DRAW LINE
     ========================= */

  function drawLine(from, to) {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const currentTool = TOOLS[tool];

    ctx.save();

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = currentTool.opacity;
      ctx.strokeStyle = DEFAULT_COLOR;
    }

    ctx.lineWidth = currentTool.size * dpr;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const fromX = from.x / dpr;
    const fromY = from.y / dpr;

    const toX = to.x / dpr;
    const toY = to.y / dpr;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.restore();
  }

  /* =========================
     STOP DRAWING
     ========================= */

  function releasePointer(event) {
    event.preventDefault();

    drawingRef.current = false;
    lastPointRef.current = null;

    if (event?.pointerId != null) {
      try {
        canvasRef.current?.releasePointerCapture?.(event.pointerId);
      } catch {
        // Pointer may already have been released.
      }
    }

    checkTracingProgress();
  }

  /* =========================
     CHECK PROGRESS
     ========================= */

  function checkTracingProgress() {
    const canvas = canvasRef.current;
    const targetCanvas = targetCanvasRef.current;

    if (!canvas || !targetCanvas) return;

    if (completedRef.current) return;

    const rect = canvas.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const dpr = window.devicePixelRatio || 1;

    const targetCtx = targetCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    const drawingCtx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!targetCtx || !drawingCtx) return;

    const width = Math.round(rect.width * dpr);
    const height = Math.round(rect.height * dpr);

    const targetData = targetCtx.getImageData(
      0,
      0,
      width,
      height
    ).data;

    const drawingData = drawingCtx.getImageData(
      0,
      0,
      width,
      height
    ).data;

    let targetPixels = 0;
    let coveredPixels = 0;

    /*
      We sample every 4th pixel for performance.
      This is more than enough for tracing detection
      and keeps mobile devices responsive.
    */
    const step = 4;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;

        const targetAlpha = targetData[index + 3];

        if (targetAlpha > 30) {
          targetPixels++;

          const drawingAlpha = drawingData[index + 3];

          if (drawingAlpha > 30) {
            coveredPixels++;
          }
        }
      }
    }

    if (targetPixels === 0) return;

    const coverage = coveredPixels / targetPixels;

    const percentage = Math.min(
      100,
      Math.round(coverage * 100)
    );

    setProgress(percentage);

    /*
      10% coverage is enough to recognise that the
      child has meaningfully traced the letter.

      This prevents the mission from getting stuck
      because a child doesn't perfectly fill the
      entire letter.
    */
    if (coverage >= 0.10) {
      completeLetter();
    }
  }

  /* =========================
     COMPLETE LETTER
     ========================= */

  function completeLetter() {
    if (completedRef.current) return;

    completedRef.current = true;

    setProgress(100);

    window.setTimeout(() => {
      if (letterIndex >= LETTERS.length - 1) {
        onComplete?.();
        return;
      }

      /*
        Move from:
        A → B → C → ... → Z
      */
      setLetterIndex((current) => current + 1);

      completedRef.current = false;
      drawingRef.current = false;
      lastPointRef.current = null;
      setProgress(0);
    }, 650);
  }

  /* =========================
     RESET WHEN LETTER CHANGES
     ========================= */

  useEffect(() => {
    completedRef.current = false;
    drawingRef.current = false;
    lastPointRef.current = null;
    setProgress(0);
  }, [letterIndex]);

  /* =========================
     TOOL
     ========================= */

  function selectTool(nextTool) {
    setTool(nextTool);
  }

  /* =========================
     RENDER
     ========================= */

  return (
    <div className="alphabet-tracing-mission">
      <div className="alphabet-mission-header">
        <button
          type="button"
          className="alphabet-back-button"
          onClick={onBack}
          aria-label="Back"
        >
          ←
        </button>

        <div className="alphabet-mission-title">
          <div className="alphabet-mission-kicker">
            Writing Mission 1
          </div>

          <h1>Trace the Alphabet</h1>
        </div>

        <div className="alphabet-mission-progress">
          {letter} / 26
        </div>
      </div>

      <main className="alphabet-mission-content">
        <div className="alphabet-paper-area">

          {/* =========================
              PAPER
              ========================= */}

          <div className="alphabet-paper">

            <div className="alphabet-paper-lines">
              <div className="alphabet-line top" />
              <div className="alphabet-line middle" />
              <div className="alphabet-line bottom" />
            </div>

            {/* =========================
                VISIBLE LETTERS
                ========================= */}

            <div className="alphabet-target-display">
              <div className="alphabet-uppercase">
                {letter}
              </div>

              <div className="alphabet-lowercase">
                {letter.toLowerCase()}
              </div>
            </div>

            {/* =========================
                DRAWING CANVAS
                ========================= */}

            <canvas
              ref={canvasRef}
              className="alphabet-tracing-canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={releasePointer}
              onPointerCancel={releasePointer}
              onPointerLeave={releasePointer}
            />

            {/* Hidden target mask */}
            <canvas
              ref={targetCanvasRef}
              className="alphabet-target-canvas"
              aria-hidden="true"
            />

            {/* =========================
                TOOLS
                ========================= */}

            <aside
              className="alphabet-tool-bar"
              aria-label="Writing tools"
            >
              <button
                type="button"
                className={`alphabet-tool ${
                  tool === "pencil" ? "selected" : ""
                }`}
                onClick={() => selectTool("pencil")}
                aria-label="Pencil"
              >
                <PencilIcon />
              </button>

              <button
                type="button"
                className={`alphabet-tool ${
                  tool === "brush" ? "selected" : ""
                }`}
                onClick={() => selectTool("brush")}
                aria-label="Paintbrush"
              >
                <BrushIcon />
              </button>

              <button
                type="button"
                className={`alphabet-tool ${
                  tool === "pen" ? "selected" : ""
                }`}
                onClick={() => selectTool("pen")}
                aria-label="Pen"
              >
                <PenIcon />
              </button>

              <button
                type="button"
                className={`alphabet-tool ${
                  tool === "eraser" ? "selected" : ""
                }`}
                onClick={() => selectTool("eraser")}
                aria-label="Eraser"
              >
                <EraserIcon />
              </button>
            </aside>
          </div>

          {/* =========================
              INSTRUCTION
              ========================= */}

          <div className="alphabet-mission-hint">
            Trace the big letter and the little letter.
          </div>

          {/* =========================
              PROGRESS
              ========================= */}

          <div className="alphabet-tracing-progress">
            <div
              className="alphabet-tracing-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </main>

      {/* =========================
         PORTRAIT MESSAGE
         ========================= */}

      <div className="alphabet-portrait-message">
        <div className="alphabet-portrait-icon">↔</div>
        <h2>Turn your device sideways</h2>
        <p>
          This writing adventure works best in landscape mode.
        </p>
      </div>
    </div>
  );
}