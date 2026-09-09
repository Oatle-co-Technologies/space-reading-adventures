import { useEffect, useRef, useState } from "react";
import "./AlphabetTracingMission.css";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const FONT_FAMILY = '"Andika", "Comic Sans MS", "Chalkboard SE", sans-serif';
const LETTER_SIZE = 170;
const TARGET_COLOR = "#b8d8e8";
const GUIDE_COLOR = "#9edff5";

function makeTargetCanvas(width, height, letter) {
  const target = document.createElement("canvas");
  target.width = width;
  target.height = height;

  const ctx = target.getContext("2d", { willReadFrequently: true });
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#000";
  const dpr = window.devicePixelRatio || 1;
  ctx.font = `700 ${LETTER_SIZE * dpr}px ${FONT_FAMILY}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const gap = Math.min(width * 0.22, 180 * dpr);
  ctx.fillText(letter, width / 2 - gap, height / 2);
  ctx.fillText(letter.toLowerCase(), width / 2 + gap, height / 2);

  return target;
}

function getCanvasPoint(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function coverageReached(drawingCanvas, targetCanvas) {
  const targetCtx = targetCanvas.getContext("2d", {
    willReadFrequently: true,
  });
  const drawingCtx = drawingCanvas.getContext("2d", {
    willReadFrequently: true,
  });

  const target = targetCtx.getImageData(
    0,
    0,
    targetCanvas.width,
    targetCanvas.height
  ).data;

  const drawing = drawingCtx.getImageData(
    0,
    0,
    drawingCanvas.width,
    drawingCanvas.height
  ).data;

  let targetPixels = 0;
  let coveredPixels = 0;

  // The target is deliberately sampled every 3 pixels to keep
  // the check light enough for phones.
  for (let i = 3; i < target.length; i += 12) {
    if (target[i] > 0) {
      targetPixels += 1;

      const pixelIndex = i - 3;
      if (drawing[pixelIndex + 3] > 25) {
        coveredPixels += 1;
      }
    }
  }

  if (!targetPixels) return false;

  return coveredPixels / targetPixels >= 0.28;
}

export default function AlphabetTracingMission({ onBack, onComplete }) {
  const canvasRef = useRef(null);
  const targetRef = useRef(null);
  const drawingRef = useRef(false);
  const completedRef = useRef(false);

  const [letterIndex, setLetterIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const letter = LETTERS[letterIndex];

  useEffect(() => {
    document.fonts?.load(`700 ${LETTER_SIZE}px Andika`).then(() => {
      prepareTarget();
    });
  }, [letterIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      prepareTarget();
      setProgress(0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, [letterIndex]);

  const prepareTarget = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    targetRef.current = makeTargetCanvas(
      Math.max(1, Math.round(rect.width * dpr)),
      Math.max(1, Math.round(rect.height * dpr)),
      letter
    );

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const draw = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || !drawingRef.current) return;

    const point = getCanvasPoint(event, canvas);
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;

    ctx.strokeStyle = "#55c6ff";
    ctx.globalAlpha = 0.9;
    ctx.lineWidth = 7 * dpr;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(point.x * dpr, point.y * dpr);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(point.x * dpr, point.y * dpr);
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const target = targetRef.current;

    if (!canvas || !target || completedRef.current) return;

    const reached = coverageReached(canvas, target);

    if (reached) {
      completedRef.current = true;
      setProgress(100);

      window.setTimeout(() => {
        if (letterIndex >= LETTERS.length - 1) {
          onComplete?.();
          return;
        }

        setLetterIndex((current) => current + 1);
        completedRef.current = false;
        setProgress(0);
      }, 650);

      return;
    }

    // Visual progress only. It is intentionally not a pass/fail score.
    const drawingCtx = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    const pixels = drawingCtx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let marks = 0;
    for (let i = 3; i < pixels.length; i += 48) {
      if (pixels[i] > 25) marks += 1;
    }

    setProgress(Math.min(90, Math.round(marks / 35)));
  };

  const handlePointerDown = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || completedRef.current) return;

    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);

    const point = getCanvasPoint(event, canvas);
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext("2d");

    drawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(point.x * dpr, point.y * dpr);
  };

  const handlePointerMove = (event) => {
    if (!drawingRef.current) return;

    const events = event.getCoalescedEvents
      ? event.getCoalescedEvents()
      : [event];

    events.forEach(draw);
  };

  const releasePointer = (event) => {
    const canvas = canvasRef.current;
    drawingRef.current = false;

    if (canvas?.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }

    checkProgress();
  };

  return (
    <main className="alphabet-mission">
      <button
        className="alphabet-mission-back"
        type="button"
        onClick={onBack}
      >
        ← Back
      </button>

      <section className="alphabet-mission-card">
        <div className="alphabet-mission-heading">
          <span className="alphabet-mission-planet">✦</span>
          <div>
            <p>Writing Mission 1</p>
            <h1>Trace the Alphabet</h1>
          </div>
        </div>

        <div className="alphabet-mission-progress" aria-label={`Letter ${letter}`}>
          <span>{letter}</span>
          <small>/ 26</small>
        </div>

        <div className="alphabet-paper">
          <div className="alphabet-guide" aria-hidden="true">
            <span className="alphabet-target">
              <span>{letter}</span>
              <span>{letter.toLowerCase()}</span>
            </span>
            <div className="alphabet-baseline" />
            <div className="alphabet-midline" />
          </div>

          <canvas
            ref={canvasRef}
            className="alphabet-tracing-canvas"
            aria-label={`Trace ${letter} and ${letter.toLowerCase()}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={releasePointer}
            onPointerCancel={releasePointer}
          />

          {progress > 0 && (
            <div className="alphabet-progress-dots" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={progress >= (index + 1) * 20 ? "filled" : ""}
                />
              ))}
            </div>
          )}
        </div>

        <p className="alphabet-mission-hint">
          Trace the big letter and the little letter.
        </p>
      </section>
    </main>
  );
}
