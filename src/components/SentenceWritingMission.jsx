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
  const targetCanvasRef = useRef(null);
  const sentenceModelRef = useRef(null);

  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const completedRef = useRef(false);

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");
  const [tool, setTool] = useState("pencil");
  const [progress, setProgress] = useState(0);

  const current = SENTENCES[sentenceIndex];

  const sentence =
    current.type === "name"
      ? name.trim()
        ? `My name is ${name.trim()}.`
        : "My name is ____________________."
      : current.build(answers[current.id] || current.options[0]);

  /*
    The sentence is rendered with the same handwriting font family
    used by the alphabet tracing mission. The target canvas is a
    hidden mask for tracing detection.
  */
  const FONT_FAMILY =
    '"Andika", "Comic Sans MS", "Chalkboard SE", sans-serif';

  const TARGET_COLOR = "#b8d8e8";
  const DEFAULT_COLOR = "#000000";

  const getCanvasPoint = (event, canvas) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  /*
    Draw the sentence into the hidden target canvas using the
    exact visible sentence element's font and position.
  */
  const prepareTarget = () => {
    const canvas = canvasRef.current;
    const targetCanvas = targetCanvasRef.current;
    const sentenceElement = sentenceModelRef.current;

    if (!canvas || !targetCanvas || !sentenceElement) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    targetCanvas.width = width;
    targetCanvas.height = height;

    const targetCtx = targetCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!targetCtx) return;

    targetCtx.clearRect(0, 0, width, height);

    const computed = window.getComputedStyle(sentenceElement);
    const modelRect =
      sentenceElement.getBoundingClientRect();

    const canvasRect =
      canvas.getBoundingClientRect();

    const fontSize =
      parseFloat(computed.fontSize) || 34;

    const fontWeight =
      computed.fontWeight || "700";

    const fontFamily =
      computed.fontFamily || FONT_FAMILY;

    const letterSpacing =
      computed.letterSpacing === "normal"
        ? 0
        : parseFloat(computed.letterSpacing) || 0;

    targetCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    targetCtx.fillStyle = "#000000";
    targetCtx.font =
      `${fontWeight} ${fontSize}px ${fontFamily}`;
    targetCtx.textAlign = "center";
    targetCtx.textBaseline = "alphabetic";

    /*
      The visible model and hidden target share the same center.
      The baseline is taken from the visible text box so the
      uppercase/lowercase relationship stays aligned with the
      handwriting guide lines.
    */
    const x =
      modelRect.left -
      canvasRect.left +
      modelRect.width / 2;

    const baseline =
      modelRect.bottom -
      canvasRect.top;

    /*
      Canvas does not apply CSS letter-spacing to fillText.
      For normal sentence spacing this is negligible, but when
      letter-spacing is present we render character-by-character
      so the mask stays aligned with the visible guide.
    */
    if (letterSpacing === 0) {
      targetCtx.fillText(
        sentence,
        x,
        baseline
      );
    } else {
      const characters = [...sentence];
      const widths = characters.map((character) =>
        targetCtx.measureText(character).width
      );

      const totalWidth =
        widths.reduce((sum, value) => sum + value, 0) +
        letterSpacing * Math.max(0, characters.length - 1);

      let cursorX = x - totalWidth / 2;

      characters.forEach((character, index) => {
        targetCtx.fillText(
          character,
          cursorX + widths[index] / 2,
          baseline
        );

        cursorX +=
          widths[index] +
          letterSpacing;
      });
    }
  };

  const coverageReached = (
    drawingCanvas,
    targetCanvas
  ) => {
    const targetCtx = targetCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    const drawingCtx = drawingCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!targetCtx || !drawingCtx) {
      return 0;
    }

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

    /*
      Same sampling approach as the alphabet mission.
      Sampling keeps the check light enough for phones.
    */
    for (let i = 3; i < target.length; i += 12) {
      if (target[i] > 0) {
        targetPixels += 1;

        const pixelIndex = i - 3;

        if (drawing[pixelIndex + 3] > 25) {
          coveredPixels += 1;
        }
      }
    }

    if (!targetPixels) return 0;

    return coveredPixels / targetPixels;
  };

  /*
    Set up both canvases whenever the sentence or the available
    writing area changes.
  */
  useEffect(() => {
    const canvas = canvasRef.current;
    const targetCanvas = targetCanvasRef.current;

    if (!canvas || !targetCanvas) return;

    let resizeObserver;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const dpr = window.devicePixelRatio || 1;

      const width = Math.max(
        1,
        Math.round(rect.width * dpr)
      );

      const height = Math.max(
        1,
        Math.round(rect.height * dpr)
      );

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (context) {
        context.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0
        );
        context.clearRect(
          0,
          0,
          rect.width,
          rect.height
        );
      }

      /*
        Wait one frame so the sentence element has its final
        browser layout before measuring its position.
      */
      window.requestAnimationFrame(() => {
        prepareTarget();
      });
    };

    setup();

    resizeObserver = new ResizeObserver(setup);
    resizeObserver.observe(canvas);

    window.addEventListener("resize", setup);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", setup);
    };
  }, [sentenceIndex, sentence]);

  /*
    Reset tracing state whenever a new sentence appears.
  */
  useEffect(() => {
    drawingRef.current = false;
    lastPointRef.current = null;
    completedRef.current = false;
    setProgress(0);

    window.requestAnimationFrame(() => {
      prepareTarget();
    });
  }, [sentenceIndex, sentence]);

  const drawPoint = (point) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    const currentTool = TOOLS[tool];

    context.save();

    if (tool === "eraser") {
      context.globalCompositeOperation =
        "destination-out";
      context.globalAlpha = 1;
    } else {
      context.globalCompositeOperation =
        "source-over";
      context.globalAlpha =
        currentTool.opacity;
      context.strokeStyle =
        DEFAULT_COLOR;
    }

    context.lineWidth = currentTool.size;
    context.lineCap = "round";
    context.lineJoin = "round";

    const x = point.x;
    const y = point.y;

    context.beginPath();
    context.arc(
      x,
      y,
      currentTool.size / 2,
      0,
      Math.PI * 2
    );

    if (tool === "eraser") {
      context.fillStyle = "#000000";
    } else {
      context.fillStyle =
        DEFAULT_COLOR;
    }

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
      context.globalCompositeOperation =
        "destination-out";
      context.globalAlpha = 1;
    } else {
      context.globalCompositeOperation =
        "source-over";
      context.globalAlpha =
        currentTool.opacity;
      context.strokeStyle =
        DEFAULT_COLOR;
    }

    context.lineWidth = currentTool.size;
    context.lineCap = "round";
    context.lineJoin = "round";

    const fromX = from.x;
    const fromY = from.y;

    const toX = to.x;
    const toY = to.y;

    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();

    context.restore();
  };

  const checkTracingProgress = () => {
    const canvas = canvasRef.current;
    const targetCanvas =
      targetCanvasRef.current;

    if (
      !canvas ||
      !targetCanvas ||
      completedRef.current
    ) {
      return;
    }

    const coverage =
      coverageReached(
        canvas,
        targetCanvas
      );

    const percentage = Math.min(
      100,
      Math.round(coverage * 100)
    );

    setProgress(percentage);

    /*
      A meaningful portion of the sentence must be traced
      before Next becomes available. We do not auto-advance;
      the child controls when to move on.
    */
    if (coverage >= 0.28) {
      setProgress(100);
    }
  };

  const handlePointerDown = (event) => {
    const canvas = canvasRef.current;

    if (
      !canvas ||
      completedRef.current
    ) {
      return;
    }

    event.preventDefault();

    canvas.setPointerCapture?.(
      event.pointerId
    );

    drawingRef.current = true;

    const point =
      getCanvasPoint(
        event,
        canvas
      );

    lastPointRef.current =
      point;

    drawPoint(point);
  };

  const handlePointerMove = (event) => {
    if (!drawingRef.current) {
      return;
    }

    event.preventDefault();

    const events =
      event.getCoalescedEvents
        ? event.getCoalescedEvents()
        : [event];

    events.forEach(
      (coalescedEvent) => {
        const canvas =
          canvasRef.current;

        if (!canvas) return;

        const point =
          getCanvasPoint(
            coalescedEvent,
            canvas
          );

        const lastPoint =
          lastPointRef.current;

        if (!lastPoint) {
          lastPointRef.current =
            point;
          return;
        }

        drawLine(
          lastPoint,
          point
        );

        lastPointRef.current =
          point;
      }
    );

    checkTracingProgress();
  };

  const releasePointer = (event) => {
    event.preventDefault();

    drawingRef.current = false;
    lastPointRef.current = null;

    const canvas =
      canvasRef.current;

    if (
      canvas &&
      event?.pointerId != null &&
      canvas.hasPointerCapture?.(
        event.pointerId
      )
    ) {
      canvas.releasePointerCapture(
        event.pointerId
      );
    }

    checkTracingProgress();
  };

  const chooseAnswer = (answer) => {
    setAnswers(
      (currentAnswers) => ({
        ...currentAnswers,
        [current.id]: answer,
      })
    );

    /*
      Rebuild the target after the personalized sentence
      changes.
    */
    window.requestAnimationFrame(
      () => {
        prepareTarget();
      }
    );
  };

  const canContinue =
    progress >= 28;

  const clearWritingCanvas = () => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const context =
      canvas.getContext("2d");

    if (!context) return;

    context.save();
    context.setTransform(
      1,
      0,
      0,
      1,
      0,
      0
    );

    context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.restore();

    setProgress(0);
  };

  const handleNext = () => {
    if (!canContinue) return;

    if (
      sentenceIndex ===
      SENTENCES.length - 1
    ) {
      onComplete?.();
      return;
    }

    clearWritingCanvas();

    setSentenceIndex(
      (currentIndex) =>
        currentIndex + 1
    );
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
        <strong>
          Turn your device sideways
        </strong>

        <span>
          This writing adventure works
          in landscape mode.
        </span>
      </div>

      <header className="sentence-writing-header">
        <div>
          <span>
            Writing Mission 4
          </span>

          <h1>
            Write Sentences
          </h1>
        </div>

        <div className="sentence-writing-progress">
          {sentenceIndex + 1} /{" "}
          {SENTENCES.length}
        </div>
      </header>

      <section className="scribbler-paper sentence-writing-paper">
        <div className="sentence-writing-content">
          <p className="sentence-question">
            {current.question}
          </p>

          {current.type === "name" ? (
            <input
              className="sentence-name-input"
              type="text"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              placeholder="Your name"
              aria-label="Your name"
              autoComplete="off"
              maxLength={24}
            />
          ) : (
            <div className="sentence-answer-options">
              {current.options.map(
                (option) => (
                  <button
                    key={option}
                    type="button"
                    className={`sentence-answer ${
                      answers[
                        current.id
                      ] === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      chooseAnswer(
                        option
                      )
                    }
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}

          <div className="sentence-writing-area">
            <div
              className="scribbler-lines"
              aria-hidden="true"
            >
              {Array.from(
                { length: 3 },
                (_, index) => (
                  <div
                    className="scribbler-line"
                    key={index}
                  />
                )
              )}
            </div>

            <div
              ref={sentenceModelRef}
              className="sentence-model"
              aria-live="polite"
              style={{
                color: TARGET_COLOR,
                fontFamily:
                  FONT_FAMILY,
              }}
            >
              {sentence}
            </div>

            <canvas
              ref={canvasRef}
              className={`scribbler-canvas scribbler-canvas-${tool}`}
              data-tool={tool}
              aria-label="Trace the sentence"
              onPointerDown={
                handlePointerDown
              }
              onPointerMove={
                handlePointerMove
              }
              onPointerUp={
                releasePointer
              }
              onPointerCancel={
                releasePointer
              }
              onPointerLeave={() => {}}
              onContextMenu={(event) =>
                event.preventDefault()
              }
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
          disabled={!canContinue}
          aria-label={
            sentenceIndex ===
            SENTENCES.length - 1
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
          {[
            "pencil",
            "brush",
            "pen",
          ].map((toolName) => (
            <button
              key={toolName}
              type="button"
              className={`scribbler-tool ${
                tool === toolName
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setTool(toolName)
              }
              aria-label={toolName}
              aria-pressed={
                tool === toolName
              }
              title={toolName}
            >
              <ToolIcon
                type={toolName}
              />
            </button>
          ))}

          <button
            type="button"
            className={`scribbler-eraser ${
              tool === "eraser"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setTool("eraser")
            }
            aria-label="Eraser"
            aria-pressed={
              tool === "eraser"
            }
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
