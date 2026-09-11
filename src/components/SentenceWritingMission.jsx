import React, { useEffect, useRef, useState } from "react";
import "./Scribbler.css";
import "./SentenceWritingMission.css";

const SENTENCES = [
  {
    id: "name",
    question: "What is your name?",
    type: "name",
  },
  {
    id: "age",
    question: "How old are you?",
    type: "choice",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    build: (answer) => `I am ${answer} years old.`,
  },
  {
    id: "animal",
    question: "Which animal do you like?",
    type: "choice",
    options: ["dogs", "cats", "rabbits", "birds", "fish"],
    build: (answer) => `I like ${answer}.`,
  },
  {
    id: "colour",
    question: "What is your favourite colour?",
    type: "choice",
    options: ["red", "blue", "yellow", "green", "pink", "purple"],
    build: (answer) => `My favourite colour is ${answer}.`,
  },
  {
    id: "siblings",
    question: "How many brothers or sisters do you have?",
    type: "choice",
    options: ["0", "1", "2", "3", "4", "5"],
    build: (answer) => `I have ${answer} siblings.`,
  },
];

const TOOLS = {
  pencil: { size: 3, opacity: 0.85 },
  pen: { size: 5, opacity: 1 },
  brush: { size: 10, opacity: 0.8 },
  eraser: { size: 18, opacity: 1 },
};

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

function ToolIcon({ type }) {
  if (type === "pencil") return <PencilIcon />;
  if (type === "pen") return <PenIcon />;
  if (type === "brush") return <BrushIcon />;
  return <EraserIcon />;
}

export default function SentenceWritingMission({ onBack, onComplete }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");
  const [tool, setTool] = useState("pencil");

  const current = SENTENCES[sentenceIndex];

  const sentence =
    current.type === "name"
      ? name.trim()
        ? `My name is ${name.trim()}.`
        : "My name is ____________________."
      : current.build(answers[current.id] || current.options[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const oldCanvas = document.createElement("canvas");
      oldCanvas.width = canvas.width;
      oldCanvas.height = canvas.height;

      if (canvas.width && canvas.height) {
        oldCanvas
          .getContext("2d")
          .drawImage(canvas, 0, 0);
      }

      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));

      const context = canvas.getContext("2d");
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (oldCanvas.width && oldCanvas.height) {
        context.drawImage(
          oldCanvas,
          0,
          0,
          oldCanvas.width / dpr,
          oldCanvas.height / dpr,
          0,
          0,
          rect.width,
          rect.height
        );
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event) => {
    event.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    drawingRef.current = true;
    lastPointRef.current = getPoint(event);
    canvas.setPointerCapture?.(event.pointerId);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;

    event.preventDefault();

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const point = getPoint(event);
    const lastPoint = lastPointRef.current;

    if (!lastPoint) {
      lastPointRef.current = point;
      return;
    }

    const settings = TOOLS[tool];

    context.save();
    context.globalAlpha = settings.opacity;
    context.lineWidth = settings.size;
    context.lineCap = "round";
    context.lineJoin = "round";

    if (tool === "eraser") {
      context.globalCompositeOperation = "destination-out";
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "#000000";
    }

    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(point.x, point.y);
    context.stroke();
    context.restore();

    lastPointRef.current = point;
  };

  const stopDrawing = (event) => {
    drawingRef.current = false;
    lastPointRef.current = null;

    const canvas = canvasRef.current;
    if (canvas && event?.pointerId != null) {
      canvas.releasePointerCapture?.(event.pointerId);
    }
  };

  const chooseAnswer = (answer) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [current.id]: answer,
    }));
  };

  const canContinue =
    current.type === "name"
      ? name.trim().length > 0
      : Boolean(answers[current.id]);

  const clearWritingCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
  };

  const handleNext = () => {
    if (!canContinue) return;

    if (sentenceIndex === SENTENCES.length - 1) {
      onComplete?.();
      return;
    }

    // Each sentence gets a fresh writing area.
    clearWritingCanvas();
    setSentenceIndex((currentIndex) => currentIndex + 1);
  };

  return (
    <main className="scribbler-page sentence-writing-page">
      <button
        className="scribbler-back"
        type="button"
        onClick={onBack}
        aria-label="Back to Writing Map"
      >
        ← Back
      </button>

      <div className="sentence-portrait-message">
        <strong>Turn your device sideways</strong>
        <span>This writing adventure works in landscape mode.</span>
      </div>

      <header className="sentence-writing-header">
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
          <p className="sentence-question">{current.question}</p>

          {current.type === "name" ? (
            <input
              className="sentence-name-input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              aria-label="Your name"
              autoComplete="off"
              maxLength={24}
            />
          ) : (
            <div className="sentence-answer-options">
              {current.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`sentence-answer ${
                    answers[current.id] === option ? "selected" : ""
                  }`}
                  onClick={() => chooseAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <div className="sentence-writing-area">
            <div className="scribbler-lines" aria-hidden="true">
              {Array.from({ length: 4 }, (_, index) => (
                <div className="scribbler-line" key={index} />
              ))}
            </div>

            <div className="sentence-model" aria-live="polite">
              {sentence}
            </div>

            <canvas
              ref={canvasRef}
              className={`scribbler-canvas scribbler-canvas-${tool}`}
              data-tool={tool}
              aria-label="Trace the sentence"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              onPointerLeave={() => {}}
              onContextMenu={(event) => event.preventDefault()}
            />
          </div>
        </div>

        <button
          type="button"
          className="sentence-next-button"
          onClick={handleNext}
          disabled={!canContinue}
          aria-label={
            sentenceIndex === SENTENCES.length - 1
              ? "Complete writing mission"
              : "Next sentence"
          }
        >
          →
        </button>
      </section>

      <aside className="scribbler-toolbar sentence-writing-toolbar" aria-label="Writing tools">
        <div className="scribbler-tool-tools">
          {["pencil", "pen", "brush"].map((toolName) => (
            <button
              key={toolName}
              type="button"
              className={`scribbler-tool ${
                tool === toolName ? "selected" : ""
              }`}
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
            className={`scribbler-eraser ${
              tool === "eraser" ? "selected" : ""
            }`}
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
