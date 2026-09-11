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
const LINE_GAP = 0;

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
  const guideCanvasRef = useRef(null);

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

  const prepareCanvases = () => {
    const drawingCanvas = canvasRef.current;
    const targetCanvas = targetCanvasRef.current;
    const guideCanvas = guideCanvasRef.current;

    if (!drawingCanvas || !targetCanvas || !guideCanvas) return;

    const rect = drawingCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    [drawingCanvas, targetCanvas, guideCanvas].forEach((canvas) => {
      canvas.width = width;
      canvas.height = height;
    });

    const drawContext = drawingCanvas.getContext("2d");
    if (drawContext) {
      drawContext.setTransform(1, 0, 0, 1, 0, 0);
      drawContext.clearRect(0, 0, width, height);
    }

    drawSentenceWorkbookGuide(guideCanvas, targetCanvas, rect.width, rect.height, dpr);
  };

  const drawSentenceWorkbookGuide = (
    guideCanvas,
    targetCanvas,
    cssWidth,
    cssHeight,
    dpr
  ) => {
    const guideCtx = guideCanvas.getContext("2d");
    const targetCtx = targetCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!guideCtx || !targetCtx) return;

    guideCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    targetCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    guideCtx.clearRect(0, 0, cssWidth, cssHeight);
    targetCtx.clearRect(0, 0, cssWidth, cssHeight);

    /*
      This is the IMPORTANT part of Mission 4.

      We are using the Alphabet mission's handwriting geometry:
        uppercase = 250px
        lowercase = 170px
        lowercase starts 73px below the uppercase top

      The sentence is simply placed inside the FIRST workbook row.
      The workbook itself supplies many repeated rows underneath.

      We scale the complete sentence uniformly only when the available
      row is physically too small. This preserves the exact proportions
      between uppercase/lowercase letters and their three guide lines.
    */
    const rowHeight = cssHeight / ROWS;

    const topLine = 0;
    const middleLine = rowHeight * 0.5;
    const baseline = rowHeight;

    const UPPERCASE_SIZE = 250;
    const LOWERCASE_SIZE = 170;
    const LOWERCASE_OFFSET = 73;

    const weight = "700";

    /*
      Build the sentence using the same two sizes as Alphabet Tracing.
      Spaces and punctuation use the lowercase size for their metrics.
    */
    const characters = [...sentence];

    const measureCharacter = (character) => {
      const isUpper =
        character !== character.toLowerCase() &&
        character !== character.toUpperCase();

      const uppercase =
        character.toUpperCase() === character &&
        character.toLowerCase() !== character;

      const size = uppercase
        ? UPPERCASE_SIZE
        : LOWERCASE_SIZE;

      const font = `${weight} ${size}px ${FONT_FAMILY}`;
      guideCtx.font = font;

      return {
        character,
        uppercase,
        size,
        width: guideCtx.measureText(character).width,
      };
    };

    const glyphs = characters.map(measureCharacter);

    const naturalWidth = glyphs.reduce(
      (total, glyph) => total + glyph.width,
      0
    );

    const horizontalPadding = Math.max(
      24,
      cssWidth * 0.025
    );

    const availableWidth =
      cssWidth - horizontalPadding * 2;

    /*
      The Alphabet sizes remain the source values.
      If a long sentence cannot physically fit, compress only the
      horizontal presentation. Vertical letter size and vertical
      positioning remain tied to the Alphabet geometry.
    */
    const scaleX = Math.min(
      1,
      availableWidth / Math.max(1, naturalWidth)
    );

    const naturalHeight = 250;
    const verticalScale = Math.min(
      1,
      rowHeight / naturalHeight
    );

    /*
      One scale keeps the complete handwriting system together.
      On a normal desktop row this is 1, so the values are literally
      250px / 170px / 73px just like Alphabet Tracing.
    */
    const scale = Math.min(
      1,
      verticalScale
    );

    const finalScaleX = scaleX;
    const finalScaleY = scale;

    /*
      The Alphabet mission's lowercase block begins 73px below the
      uppercase block. Scale that exact relationship with the row.
    */
    const firstRowTop = topLine;

    /*
      Use the font's real metrics to put:
        uppercase cap top -> top line
        lowercase x-height -> middle line
        descenders -> baseline / below it where the font requires

      This is more faithful than vertically centering ordinary text.
    */
    const drawGlyph = (
      ctx,
      glyph,
      x,
      scaleXForGlyph,
      scaleYForGlyph
    ) => {
      const { character, uppercase, size } = glyph;

      if (character === " ") {
        return;
      }

      ctx.save();

      /*
        Horizontal scaling is applied around the glyph's center only.
        The actual font sizes remain 250px / 170px.
      */
      ctx.translate(x, 0);
      ctx.scale(scaleXForGlyph, scaleYForGlyph);

      ctx.font = `${weight} ${size}px ${FONT_FAMILY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      const referenceCharacter = uppercase ? "H" : "x";
      const metrics = ctx.measureText(referenceCharacter);

      const ascent =
        metrics.actualBoundingBoxAscent ||
        (uppercase ? size * 0.72 : size * 0.52);

      /*
        Match the Alphabet layout:
          uppercase begins at the top of its 188px block
          lowercase is shifted down by 73px
      */
      const desiredTop =
        uppercase
          ? firstRowTop
          : firstRowTop + LOWERCASE_OFFSET;

      const baselineY =
        desiredTop + ascent;

      ctx.fillText(
        character,
        0,
        baselineY
      );

      ctx.restore();
    };

    const drawSentence = (ctx) => {
      ctx.fillStyle = GUIDE_COLOR;

      /*
        First calculate the x positions using the natural glyph widths.
        The sentence is centered as one complete handwriting phrase.
      */
      let cursor =
        cssWidth / 2 -
        (naturalWidth * finalScaleX) / 2;

      glyphs.forEach((glyph) => {
        const centerX =
          cursor + glyph.width / 2;

        drawGlyph(
          ctx,
          glyph,
          centerX,
          finalScaleX,
          finalScaleY
        );

        cursor += glyph.width;
      });
    };

    const drawTarget = (ctx) => {
      ctx.fillStyle = "#000000";

      let cursor =
        cssWidth / 2 -
        (naturalWidth * finalScaleX) / 2;

      glyphs.forEach((glyph) => {
        const centerX =
          cursor + glyph.width / 2;

        drawGlyph(
          ctx,
          glyph,
          centerX,
          finalScaleX,
          finalScaleY
        );

        cursor += glyph.width;
      });
    };

    drawSentence(guideCtx);
    drawTarget(targetCtx);
  };

  useEffect(() => {
    let frame = 0;
    let observer;

    const setup = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(prepareCanvases);
    };

    setup();
    window.addEventListener("resize", setup);

    if (canvasRef.current && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(setup);
      observer.observe(canvasRef.current);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", setup);
    };
  }, [sentenceIndex, sentence]);

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

            <canvas
              ref={guideCanvasRef}
              className="sentence-guide-canvas"
              aria-hidden="true"
            />

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
