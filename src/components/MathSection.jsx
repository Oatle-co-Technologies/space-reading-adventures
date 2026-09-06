import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./MathSection.css";
import { colors, shapes } from "../data/mathConstants";
import { mathMissions } from "../data/mathMissions";
import correctSound from "../sounds/correct.mp3";
import wrongSound from "../sounds/wrong.mp3";
import victorySound from "../sounds/victory.mp3";
import blastoffSound from "../sounds/blastoff.mp3";

const defaultProgress = {
  unlocked: 1,
  activeMission: 1,
  question: 0,
  assessmentResults: {},
};

function getMissionQuestions(mission) {
  return mission.questionBanks.flat();
}

const readProgress = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem("oatle-maths-progress")
    );

    if (!saved) return defaultProgress;

    const savedMission = mathMissions.find(
      (item) => item.id === saved.activeMission
    );

    const lastQuestion = Math.max(
      (savedMission
        ? getMissionQuestions(savedMission).length
        : 1) - 1,
      0
    );

    return {
      ...defaultProgress,
      ...saved,
      question: Math.min(
        saved.question || 0,
        lastQuestion
      ),
    };
  } catch {
    return defaultProgress;
  }
};

const optionColors = {
  red: colors.red,
  yellow: colors.yellow,
  blue: colors.blue,
  green: colors.green,
  orange: colors.orange,
  purple: colors.purple,
  gold: colors.gold,
  lime: colors.lime,
  turquoise: colors.turquoise,
  violet: colors.violet,
  pink: colors.pink,
  maroon: colors.maroon,
  vermilion: "#e34234",
  white: "#ffffff",
};

const countColors = [
  colors.red,
  colors.yellow,
  colors.blue,
  colors.green,
  colors.orange,
  colors.purple,
];

function getItemColor(item) {
  if (!item) return "#55c6ff";

  if (
    item.color &&
    typeof item.color === "string"
  ) {
    return item.color;
  }

  if (
    item.colorName &&
    optionColors[item.colorName]
  ) {
    return optionColors[item.colorName];
  }

  if (
    typeof item.color === "string" &&
    optionColors[item.color]
  ) {
    return optionColors[item.color];
  }

  return "#55c6ff";
}

function getItemShape(item) {
  if (!item) return null;

  if (
    item.shape &&
    shapes[item.shape]
  ) {
    return item.shape;
  }

  if (
    typeof item.shape === "string" &&
    shapes[item.shape]
  ) {
    return item.shape;
  }

  return null;
}

function Shape({
  name,
  color = "currentColor",
  className = "",
}) {
  const paths = {
    circle: (
      <circle
        cx="50"
        cy="50"
        r="42"
      />
    ),

    square: (
      <rect
        x="9"
        y="9"
        width="82"
        height="82"
        rx="5"
      />
    ),

    triangle: (
      <polygon points="50,7 94,91 6,91" />
    ),

    rectangle: (
      <rect
        x="5"
        y="22"
        width="90"
        height="56"
        rx="5"
      />
    ),

    oval: (
      <ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="28"
      />
    ),

    diamond: (
      <polygon points="50,5 94,50 50,95 6,50" />
    ),

    star: (
      <polygon points="50,5 61,37 95,37 68,57 78,91 50,71 22,91 32,57 5,37 39,37" />
    ),

    heart: (
      <path d="M50 88 13 51C-7 31 7 7 29 8c10 0 17 5 21 13 4-8 11-13 21-13 22-1 36 23 16 43Z" />
    ),

    pentagon: (
      <polygon points="50,6 95,39 78,92 22,92 5,39" />
    ),

    hexagon: (
      <polygon points="25,7 75,7 94,50 75,93 25,93 6,50" />
    ),

    octagon: (
      <polygon points="29,6 71,6 94,29 94,71 71,94 29,94 6,71 6,29" />
    ),

    crescent: (
      <path d="M72 9C51 17 39 34 39 54c0 20 12 37 33 45-7 3-14 4-22 2C25 97 8 77 8 53 8 28 25 8 48 4c8-1 16 1 24 5Z" />
    ),

    semicircle: (
      <path d="M10 50 C10 27.9 27.9 10 50 10 C72.1 10 90 27.9 90 50 L10 50 Z" />
    ),
  };

  return (
    <svg
      className={`math-shape math-shape-${name} ${className}`}
      viewBox="0 0 100 100"
      style={{
        "--shape-color": color,
      }}
      aria-hidden="true"
    >
      {paths[name] || paths.circle}
    </svg>
  );
}

function NumberVisual({ question }) {
  return (
    <div className="math-number-display">
      {question.display}
    </div>
  );
}

function CountingShapesVisual({
  question,
}) {
  const shapesToRender =
    question.targetShape === "all"
      ? question.shapes
      : Array.from(
          {
            length: question.count,
          },
          () => question.targetShape
        );

  return (
    <div
      className="math-count-display math-counting-shape-display"
      aria-label={`${question.count} shapes`}
    >
      {shapesToRender.map(
        (shape, index) => (
          <Shape
            key={`${shape}-${index}`}
            name={shape}
            color={
              countColors[
                index %
                  countColors.length
              ]
            }
          />
        )
      )}
    </div>
  );
}

function ShapeIntroductionVisual({
  question,
}) {
  return (
    <div className="math-introduction-visual">
      <div className="math-feature-display">
        <Shape
          name={question.shape}
          color="#55c6ff"
        />
      </div>

      <p>
        {question.teachingText}
      </p>
    </div>
  );
}

function ShapeFactVisual({
  question,
}) {
  return (
    <div className="math-feature-display">
      <Shape
        name={question.shape}
        color="#55c6ff"
      />
    </div>
  );
}

function ShapeRecognitionVisual({
  question,
}) {
  return (
    <div className="math-feature-display">
      <Shape
        name={question.shape}
        color="#ffd45c"
      />
    </div>
  );
}

function ColourVisual({
  question,
}) {
  const isTeaching =
    question.teaching;

  return (
    <div
      className={`math-colour-visual ${
        isTeaching
          ? "is-teaching"
          : ""
      }`}
    >
      <div className="math-feature-display">
        <Shape
          name={question.shape}
          color={question.color}
        />
      </div>

      {isTeaching &&
      question.teachingText ? (
        <p className="math-teaching-text">
          {question.teachingText}
        </p>
      ) : null}
    </div>
  );
}

function ColourMixingVisual({
  question,
}) {
  const isTeaching =
    question.teaching;

  return (
    <div
      className={`math-mix-display ${
        isTeaching
          ? "is-teaching"
          : ""
      }`}
      aria-label="Two colours to mix"
    >
      <div className="math-mix-colours">
        {question.mix.map(
          (color, index) => (
            <span
              key={`${color}-${index}`}
              className="math-mix-swatch"
              style={{
                backgroundColor:
                  color,
                width: "82px",
                height: "82px",
                display: "block",
                flex: "0 0 82px",
                border:
                  "4px solid #fff",
                borderRadius: "50%",
                boxShadow:
                  "0 0 18px #ffffff55",
              }}
            />
          )
        )}

        {isTeaching &&
        question.resultColor ? (
          <>
            <span className="math-mix-arrow">
              →
            </span>

            <span
              className="math-mix-swatch math-mix-result"
              style={{
                backgroundColor:
                  question.resultColor,
                width: "82px",
                height: "82px",
                display: "block",
                flex: "0 0 82px",
                border:
                  "4px solid #fff",
                borderRadius: "50%",
                boxShadow:
                  "0 0 18px #ffffff55",
              }}
            />
          </>
        ) : null}
      </div>

      {isTeaching &&
      question.teachingText ? (
        <p className="math-teaching-text">
          {question.teachingText}
        </p>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------
   INTERACTIVE MATCHING / SORTING
--------------------------------------------------------- */

function itemMatchesZone(
  item,
  zone
) {
  if (!item || !zone) {
    return false;
  }

  if (
    zone.targetShape &&
    item.shape !==
      zone.targetShape
  ) {
    return false;
  }

  const itemColor =
    item.colorName ||
    (typeof item.color ===
      "string" &&
    optionColors[item.color]
      ? item.color
      : null);

  if (
    zone.targetColor &&
    itemColor !==
      zone.targetColor
  ) {
    return false;
  }

  if (
    zone.targetType &&
    item.type !==
      zone.targetType
  ) {
    return false;
  }

  return Boolean(
    zone.targetShape ||
      zone.targetColor ||
      zone.targetType
  );
}

function getTargetItems(
  question,
  zone
) {
  return (question.items || []).filter(
    (item) =>
      itemMatchesZone(
        item,
        zone
      )
  );
}

function DraggableItem({
  item,
  position,
  dragging,
  onPointerDown,
}) {
  if (!position) {
    return null;
  }

  const shape =
    getItemShape(item);

  const color =
    getItemColor(item);

  return (
    <div
      className={`math-draggable-item ${
        dragging
          ? "is-dragging"
          : ""
      }`}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "76px",
        height: "76px",
        display: "grid",
        placeItems: "center",
        transform:
          "translate(-50%, -50%)",
        touchAction: "none",
        userSelect: "none",
        cursor: dragging
          ? "grabbing"
          : "grab",
        zIndex: dragging
          ? 100
          : 2,
        transition: dragging
          ? "none"
          : "left 0.22s ease, top 0.22s ease",
      }}
      onPointerDown={(event) =>
        onPointerDown(
          event,
          item.id
        )
      }
    >
      {shape ? (
        <Shape
          name={shape}
          color={color}
        />
      ) : item.icon ? (
        <span
          style={{
            fontSize: "3.4rem",
            lineHeight: 1,
          }}
        >
          {item.icon}
        </span>
      ) : (
        <span
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            backgroundColor:
              color,
            border:
              "3px solid #fff",
            boxShadow:
              "0 0 18px #ffffff66",
          }}
        />
      )}
    </div>
  );
}

function InteractiveSortVisual({
  question,
  onComplete,
  onWrong,
}) {
  const containerRef =
    useRef(null);

  const [positions, setPositions] =
    useState({});

  /*
   * IMPORTANT:
   * These positions are relative
   * to the sorting box itself.
   *
   * This is separate from the
   * mixed-pile positions.
   */
  const [placedPositions, setPlacedPositions] =
    useState({});

  const [placed, setPlaced] =
    useState({});

  const [draggingId, setDraggingId] =
    useState(null);

  const dragOffset =
    useRef({
      x: 0,
      y: 0,
    });

  const originalPositions =
    useRef({});

  const currentPointerId =
    useRef(null);

  const items =
    question.items || [];

  const zones =
    question.zones || [];

  const zone =
    zones[0];

  const targetItems =
    zone
      ? getTargetItems(
          question,
          zone
        )
      : [];

  useEffect(() => {
    const nextPositions =
      {};

    items.forEach(
      (item, index) => {
        const column =
          index % 5;

        const row =
          Math.floor(index / 5);

        nextPositions[
          item.id
        ] = {
          x:
            72 +
            column * 135,
          y:
            78 +
            row * 88,
        };
      }
    );

    setPositions(
      nextPositions
    );

    originalPositions.current =
      nextPositions;

    setPlaced({});
    setPlacedPositions({});
    setDraggingId(null);
    currentPointerId.current =
      null;
  }, [question, items]);

  const getContainerPoint =
    (event) => {
      const rect =
        containerRef.current?.getBoundingClientRect();

      if (!rect) {
        return {
          x: 0,
          y: 0,
        };
      }

      return {
        x:
          event.clientX -
          rect.left,
        y:
          event.clientY -
          rect.top,
      };
    };

  const getZoneAtPoint = (
    x,
    y
  ) => {
    const container =
      containerRef.current;

    if (!container) {
      return null;
    }

    const containerRect =
      container.getBoundingClientRect();

    const absoluteX =
      containerRect.left + x;

    const absoluteY =
      containerRect.top + y;

    const zoneElements =
      container.querySelectorAll(
        "[data-sort-zone]"
      );

    for (
      const zoneElement of zoneElements
    ) {
      const rect =
        zoneElement.getBoundingClientRect();

      if (
        absoluteX >= rect.left &&
        absoluteX <= rect.right &&
        absoluteY >= rect.top &&
        absoluteY <= rect.bottom
      ) {
        return (
          zoneElement.dataset
            .sortZone
        );
      }
    }

    return null;
  };

  const startDrag = (
    event,
    itemId
  ) => {
    if (
      placed[itemId] ||
      draggingId
    ) {
      return;
    }

    event.preventDefault();

    const point =
      getContainerPoint(event);

    const currentPosition =
      positions[itemId];

    if (!currentPosition) {
      return;
    }

    dragOffset.current = {
      x:
        point.x -
        currentPosition.x,
      y:
        point.y -
        currentPosition.y,
    };

    currentPointerId.current =
      event.pointerId;

    setDraggingId(itemId);

    event.currentTarget.setPointerCapture?.(
      event.pointerId
    );
  };

  const moveDrag = (
    event
  ) => {
    if (
      !draggingId ||
      event.pointerId !==
        currentPointerId.current
    ) {
      return;
    }

    event.preventDefault();

    const point =
      getContainerPoint(event);

    setPositions(
      (current) => ({
        ...current,
        [draggingId]: {
          x:
            point.x -
            dragOffset.current
              .x,
          y:
            point.y -
            dragOffset.current
              .y,
        },
      })
    );
  };

  const resetItem = (
    itemId
  ) => {
    const original =
      originalPositions
        .current[itemId];

    if (!original) {
      return;
    }

    setPositions(
      (current) => ({
        ...current,
        [itemId]: original,
      })
    );
  };

  const finishDrag = (
    event
  ) => {
    if (
      !draggingId ||
      event.pointerId !==
        currentPointerId.current
    ) {
      return;
    }

    event.preventDefault();

    const itemId =
      draggingId;

    const item =
      items.find(
        (entry) =>
          entry.id === itemId
      );

    const point =
      getContainerPoint(event);

    const zoneId =
      getZoneAtPoint(
        point.x,
        point.y
      );

    setDraggingId(null);

    currentPointerId.current =
      null;

    if (!item || !zoneId) {
      resetItem(itemId);
      return;
    }

    const targetZone =
      zones.find(
        (entry) =>
          entry.id === zoneId
      );

    if (
      !itemMatchesZone(
        item,
        targetZone
      )
    ) {
      resetItem(itemId);
      onWrong?.();
      return;
    }

    /*
     * Mark the item as placed.
     */
    const nextPlaced = {
      ...placed,
      [itemId]: zoneId,
    };

    setPlaced(
      nextPlaced
    );

    /*
     * Find the sorting box.
     */
    const zoneElement =
      containerRef.current?.querySelector(
        `[data-sort-zone="${zoneId}"]`
      );

    if (!zoneElement) {
      return;
    }

    /*
     * THIS IS THE IMPORTANT FIX.
     *
     * The placed position is now
     * calculated relative to the
     * sorting box, NOT relative
     * to the entire game area.
     */
    const zoneRect =
      zoneElement.getBoundingClientRect();

    const alreadyPlaced =
      targetItems.filter(
        (targetItem) =>
          nextPlaced[
            targetItem.id
          ] === zoneId
      ).length - 1;

    const columns = 4;

    const column =
      alreadyPlaced %
      columns;

    const row =
      Math.floor(
        alreadyPlaced /
          columns
      );

    const nextPlacedPosition =
      {
        x:
          72 +
          column * 78,
        y:
          82 +
          row * 68,
      };

    setPlacedPositions(
      (current) => ({
        ...current,
        [itemId]:
          nextPlacedPosition,
      })
    );

    /*
     * Completion is based ONLY
     * on target objects.
     */
    const placedTargetCount =
      targetItems.filter(
        (targetItem) =>
          nextPlaced[
            targetItem.id
          ] === zoneId
      ).length;

    if (
      placedTargetCount ===
      targetItems.length
    ) {
      window.setTimeout(
        () => {
          onComplete?.();
        },
        450
      );
    }
  };

  if (
    !items.length ||
    !zones.length
  ) {
    return null;
  }

  const placedTargetCount =
    targetItems.filter(
      (item) =>
        placed[item.id]
    ).length;

  return (
    <div
      ref={containerRef}
      className="math-interactive-sort"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "760px",
        minHeight: "470px",
        margin:
          "20px auto 0",
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerMove={
        moveDrag
      }
      onPointerUp={
        finishDrag
      }
      onPointerCancel={
        finishDrag
      }
    >
      {/* MIXED SHAPE AREA */}
      <div
        className="math-sort-object-area"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "250px",
          border:
            "2px dashed #8fe7ff55",
          borderRadius:
            "18px",
          background:
            "#ffffff08",
          overflow:
            "hidden",
        }}
      >
        {items.map(
          (item) => {
            if (
              placed[item.id]
            ) {
              return null;
            }

            return (
              <DraggableItem
                key={item.id}
                item={item}
                position={
                  positions[
                    item.id
                  ]
                }
                dragging={
                  draggingId ===
                  item.id
                }
                onPointerDown={
                  startDrag
                }
              />
            );
          }
        )}
      </div>

      {/* EMPTY SORTING BOX */}
      <div
        className="math-sort-zones"
        style={{
          position:
            "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div
          data-sort-zone={
            zone.id
          }
          className="math-sort-zone"
          style={{
            position:
              "relative",
            minHeight:
              "190px",
            border:
              "3px dashed #8fe7ff",
            borderRadius:
              "18px",
            background:
              "#ffffff0d",
            overflow:
              "hidden",
          }}
        >
          {/*
           * Only the shapes that
           * have actually been
           * dragged into the box
           * are rendered here.
           *
           * There is deliberately
           * NO target clue.
           */}
          {targetItems.map(
            (item) => {
              if (
                !placed[
                  item.id
                ]
              ) {
                return null;
              }

              const boxPosition =
                placedPositions[
                  item.id
                ];

              if (
                !boxPosition
              ) {
                return null;
              }

              return (
                <div
                  key={
                    item.id
                  }
                  style={{
                    position:
                      "absolute",
                    left: `${boxPosition.x}px`,
                    top: `${boxPosition.y}px`,
                    width:
                      "60px",
                    height:
                      "60px",
                    transform:
                      "translate(-50%, -50%)",
                    display:
                      "grid",
                    placeItems:
                      "center",
                    pointerEvents:
                      "none",
                    zIndex: 2,
                  }}
                >
                  <Shape
                    name={
                      getItemShape(
                        item
                      )
                    }
                    color={
                      getItemColor(
                        item
                      )
                    }
                  />
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* SORTING PROGRESS */}
      <div
        style={{
          position:
            "absolute",
          bottom:
            "-34px",
          left: 0,
          right: 0,
          textAlign:
            "center",
          color:
            "#c7d2f6",
          fontSize:
            "0.85rem",
          fontWeight: 800,
        }}
      >
        {placedTargetCount} of{" "}
        {targetItems.length}
      </div>
    </div>
  );
}

function MatchingVisual({
  question,
  onInteractiveComplete,
  onInteractiveWrong,
}) {
  if (
    question.items &&
    question.zones
  ) {
    return (
      <InteractiveSortVisual
        question={question}
        onComplete={
          onInteractiveComplete
        }
        onWrong={
          onInteractiveWrong
        }
      />
    );
  }

  if (question.quantity) {
    return (
      <div
        className="math-count-display"
        aria-label={`${question.quantity} shapes`}
      >
        {Array.from(
          {
            length:
              question.quantity,
          },
          (_, index) => (
            <Shape
              key={index}
              name={
                question.matchShape
              }
              color="#ffd45c"
            />
          )
        )}
      </div>
    );
  }

  if (question.match) {
    return (
      <div className="math-feature-display">
        <Shape
          name={
            question.match.shape
          }
          color={
            question.match.color
          }
        />
      </div>
    );
  }

  if (
    question.twoProperties
  ) {
    return (
      <div className="math-feature-row">
        {question.groups.map(
          (item, index) => {
            const [
              color,
              shape,
            ] =
              item.split(
                " "
              );

            return (
              <Shape
                key={`${item}-${index}`}
                name={shape}
                color={
                  optionColors[
                    color
                  ] ||
                  "#55c6ff"
                }
              />
            );
          }
        )}
      </div>
    );
  }

  if (question.sort) {
    return (
      <div className="math-group-display">
        {Array.from(
          { length: 4 },
          (_, index) => (
            <Shape
              key={index}
              name={
                question.sort
              }
              color="#66d17a"
            />
          )
        )}
      </div>
    );
  }

  if (
    question.oddOneOut
  ) {
    return (
      <div className="math-feature-row">
        {question.oddOneOut.map(
          (shape, index) => (
            <Shape
              key={`${shape}-${index}`}
              name={shape}
              color="#55c6ff"
            />
          )
        )}
      </div>
    );
  }

  return (
    <ColourVisual
      question={question}
    />
  );
}

function SortingVisual({
  question,
  onInteractiveComplete,
  onInteractiveWrong,
}) {
  if (
    question.items &&
    question.zones
  ) {
    return (
      <InteractiveSortVisual
        question={question}
        onComplete={
          onInteractiveComplete
        }
        onWrong={
          onInteractiveWrong
        }
      />
    );
  }

  if (question.sort) {
    return (
      <div className="math-group-display">
        {Array.from(
          { length: 4 },
          (_, index) => (
            <Shape
              key={index}
              name={
                question.sort
              }
              color="#66d17a"
            />
          )
        )}
      </div>
    );
  }

  if (
    question.oddOneOut
  ) {
    return (
      <div className="math-feature-row">
        {question.oddOneOut.map(
          (shape, index) => (
            <Shape
              key={`${shape}-${index}`}
              name={shape}
              color="#55c6ff"
            />
          )
        )}
      </div>
    );
  }

  return (
    <ColourVisual
      question={question}
    />
  );
}

function ArithmeticVisual({
  question,
}) {
  const [
    first,
    second,
  ] = question.values;

  const removedStart =
    first - second;

  const isSubtraction =
    question.operation ===
    "-";

  const objectSymbol =
    question.object ===
    "apple"
      ? "🍎"
      : question.object ===
          "planet"
        ? "🪐"
        : "⭐";

  return (
    <div
      className="math-arithmetic-display"
      aria-label={`${first} ${question.operation} ${second}`}
    >
      <div className="math-arithmetic-group">
        {Array.from(
          {
            length: first,
          },
          (_, index) => (
            <span
              key={index}
              className={`math-object ${
                isSubtraction &&
                index >=
                  removedStart
                  ? "is-taken"
                  : ""
              }`}
            >
              {objectSymbol}
            </span>
          )
        )}
      </div>

      <strong className="math-operation-symbol">
        {question.operation}
      </strong>

      <div className="math-arithmetic-group">
        {isSubtraction
          ? null
          : Array.from(
              {
                length:
                  second,
              },
              (_, index) => (
                <span
                  key={index}
                  className="math-object"
                >
                  {objectSymbol}
                </span>
              )
            )}
      </div>

      <strong className="math-operation-symbol">
        =
      </strong>

      <span className="math-operation-answer">
        ?
      </span>
    </div>
  );
}

function NumberEquationVisual({
  question,
}) {
  const first =
    question.values?.[0] ??
    question.dividend;

  const second =
    question.values?.[1] ??
    question.divisor;

  const operation =
    question.operation ||
    "÷";

  return (
    <div className="math-number-equation">
      {first} {operation}{" "}
      {second} = ?
    </div>
  );
}

function GroupingVisual({
  question,
}) {
  return (
    <div className="math-equal-groups">
      {question.groups.map(
        (
          group,
          groupIndex
        ) => (
          <div
            className="math-small-group"
            key={groupIndex}
          >
            {Array.from(
              {
                length: group,
              },
              (
                _,
                itemIndex
              ) => (
                <span
                  className="math-object"
                  key={
                    itemIndex
                  }
                >
                  🍎
                </span>
              )
            )}
          </div>
        )
      )}
    </div>
  );
}

function SharingVisual({
  question,
}) {
  const groups =
    question.groups;

  return (
    <div
      className="math-sharing-display"
      aria-label="Objects shared into equal groups"
    >
      {question.friends ? (
        <div
          className="math-friends"
          aria-hidden="true"
        >
          {Array.from(
            {
              length:
                question.friends,
            },
            (_, index) => (
              <span
                key={index}
              >
                🧒
              </span>
            )
          )}
        </div>
      ) : null}

      {groups.map(
        (
          count,
          groupIndex
        ) => (
          <div
            className="math-small-group"
            key={
              groupIndex
            }
          >
            {Array.from(
              {
                length:
                  count,
              },
              (
                _,
                itemIndex
              ) => (
                <span
                  className="math-object"
                  key={
                    itemIndex
                  }
                >
                  🍎
                </span>
              )
            )}
          </div>
        )
      )}
    </div>
  );
}

const visualRenderers = {
  number:
    NumberVisual,

  "shape-introduction":
    ShapeIntroductionVisual,

  "shape-sides":
    ShapeFactVisual,

  "shape-corners":
    ShapeFactVisual,

  "shape-recognition":
    ShapeRecognitionVisual,

  "counting-shapes":
    CountingShapesVisual,

  "colour-introduction":
    ColourVisual,

  "colour-recognition":
    ColourVisual,

  "colour-mixing":
    ColourMixingVisual,

  matching:
    MatchingVisual,

  sorting:
    SortingVisual,

  "addition-introduction":
    ArithmeticVisual,

  "addition-objects":
    ArithmeticVisual,

  "addition-numbers":
    NumberEquationVisual,

  "subtraction-introduction":
    ArithmeticVisual,

  "subtraction-objects":
    ArithmeticVisual,

  "subtraction-numbers":
    NumberEquationVisual,

  "equal-groups":
    GroupingVisual,

  sharing:
    SharingVisual,

  "division-introduction":
    SharingVisual,

  "division-numbers":
    NumberEquationVisual,
};

function QuestionVisual({
  question,
  onInteractiveComplete,
  onInteractiveWrong,
}) {
  const Renderer =
    visualRenderers[
      question.type
    ];

  if (!Renderer) {
    return null;
  }

  return (
    <Renderer
      question={question}
      onInteractiveComplete={
        onInteractiveComplete
      }
      onInteractiveWrong={
        onInteractiveWrong
      }
    />
  );
}

function OptionVisual({
  option,
  question,
}) {
  /*
   * COLOURS
   */
  if (
    optionColors[option]
  ) {
    return (
      <span
        className="math-colour-swatch"
        style={{
          width: "42px",
          height: "42px",
          minWidth: "42px",
          minHeight: "42px",
          display: "block",
          borderRadius: "50%",
          backgroundColor:
            optionColors[
              option
            ],
          border:
            "3px solid #ffffff",
          boxShadow:
            "0 0 14px #ffffff66",
        }}
        aria-hidden="true"
      />
    );
  }

  /*
   * PURE SHAPE
   */
  if (shapes[option]) {
    return (
      <Shape
        name={option}
        color="#55c6ff"
      />
    );
  }

  /*
   * COLOUR + SHAPE
   */
  if (
    typeof option ===
      "string" &&
    option.includes(" ")
  ) {
    const parts =
      option
        .trim()
        .split(/\s+/);

    if (
      parts.length === 2
    ) {
      const [
        optionColor,
        optionShape,
      ] = parts;

      if (
        optionColors[
          optionColor
        ] &&
        shapes[
          optionShape
        ]
      ) {
        return (
          <Shape
            name={
              optionShape
            }
            color={
              optionColors[
                optionColor
              ]
            }
          />
        );
      }
    }
  }

  /*
   * NUMBER → QUANTITY
   */
  if (
    question?.type ===
      "matching" &&
    question.quantity
  ) {
    return option;
  }

  /*
   * TWO PROPERTY FALLBACK
   */
  if (
    question?.twoProperties
  ) {
    return option;
  }

  /*
   * SORTING BY QUANTITY
   */
  if (
    question?.type ===
      "sorting" &&
    question.groups &&
    question.groups.every(
      (item) =>
        /^\d+$/.test(item)
    )
  ) {
    return (
      <span className="math-option-group">
        {Array.from(
          {
            length:
              Number(
                option
              ),
          },
          (_, index) => (
            <Shape
              key={index}
              name={
                shapes.circle
              }
              color="#55c6ff"
            />
          )
        )}
      </span>
    );
  }

  /*
   * SORTING BY SHAPE
   */
  if (
    question?.type ===
      "sorting" &&
    question.sort &&
    shapes[option]
  ) {
    return (
      <span className="math-option-group">
        {Array.from(
          { length: 4 },
          (_, index) => (
            <Shape
              key={index}
              name={option}
              color="#66d17a"
            />
          )
        )}
      </span>
    );
  }

  /*
   * ODD ONE OUT
   */
  if (
    question?.type ===
      "sorting" &&
    question.oddOneOut &&
    shapes[option]
  ) {
    return (
      <Shape
        name={option}
        color="#55c6ff"
      />
    );
  }

  return option;
}

function MissionCard({
  mission,
  locked,
  onSelect,
}) {
  return (
    <button
      className={`planet-card math-mission-card ${
        locked
          ? "locked"
          : ""
      }`}
      style={{
        "--mission-color":
          mission.color,
      }}
      disabled={locked}
      onClick={onSelect}
    >
      {locked ? (
        <span className="math-mission-number">
          🔒
        </span>
      ) : (
        <img
          className="math-mission-planet"
          src={mission.image}
          alt=""
        />
      )}

      <strong>
        {mission.title}
      </strong>

      <small>
        {locked
          ? "Complete the previous mission"
          : mission.description}
      </small>
    </button>
  );
}

function shuffleOptions(
  options
) {
  if (!Array.isArray(options)) {
    return [];
  }

  const shuffled = [
    ...options,
  ];

  for (
    let index =
      shuffled.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
          (index + 1)
      );

    [
      shuffled[index],
      shuffled[randomIndex],
    ] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export default function MathSection({
  onHome,
  soundOn,
}) {
  const [progress, setProgress] =
    useState(
      readProgress
    );

  const [screen, setScreen] =
    useState("map");

  const [feedback, setFeedback] =
    useState("");

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [
    assessmentAnswers,
    setAssessmentAnswers,
  ] = useState([]);

  const mission =
    mathMissions.find(
      (item) =>
        item.id ===
        progress.activeMission
    ) ||
    mathMissions[0];

  const questions =
    useMemo(
      () =>
        getMissionQuestions(
          mission
        ),
      [mission]
    );

  const question =
    questions[
      progress.question
    ] ||
    questions[0];

  const shuffledOptions =
    useMemo(() => {
      if (
        !question ||
        question.teaching ||
        question.items ||
        question.zones
      ) {
        return [];
      }

      return shuffleOptions(
        question.options ||
          []
      );
    }, [
      mission.id,
      progress.question,
      question,
    ]);

  const isAssessment =
    mission.assessment;

  const isInteractive =
    Boolean(
      question?.items &&
        question?.zones
    );

  const journeyPercent =
    questions.length > 1
      ? (progress.question /
          (questions.length -
            1)) *
        100
      : 100;

  useEffect(() => {
    localStorage.setItem(
      "oatle-maths-progress",
      JSON.stringify(
        progress
      )
    );
  }, [progress]);

  const assessmentSummary =
    useMemo(() => {
      const total =
        assessmentAnswers.length;

      const correct =
        assessmentAnswers.filter(
          (answer) =>
            answer.correct
        ).length;

      return {
        total,
        correct,
      };
    }, [
      assessmentAnswers,
    ]);

  const playSound = (
    sound
  ) => {
    if (!soundOn) return;

    const effect =
      new Audio(sound);

    effect.volume = 0.55;

    effect
      .play()
      .catch(() => {});
  };

  const startMission = (
    id
  ) => {
    playSound(
      blastoffSound
    );

    setProgress(
      (current) => ({
        ...current,
        activeMission:
          id,
        question: 0,
      })
    );

    setFeedback("");
    setIsProcessing(false);
    setAssessmentAnswers(
      []
    );
    setScreen("mission");
  };

  const finishMission =
    () => {
      if (isAssessment) {
        playSound(
          victorySound
        );
        setScreen(
          "assessment-results"
        );
        return;
      }

      playSound(
        victorySound
      );

      setProgress(
        (current) => ({
          ...current,
          unlocked:
            Math.max(
              current.unlocked,
              Math.min(
                current.activeMission +
                  1,
                mathMissions.length
              )
            ),
        })
      );

      setScreen(
        "complete"
      );
    };

  const advanceQuestion =
    () => {
      if (
        progress.question <
        questions.length - 1
      ) {
        setProgress(
          (current) => ({
            ...current,
            question:
              current.question +
              1,
          })
        );

        setFeedback("");
        setIsProcessing(
          false
        );
      } else {
        finishMission();
        setIsProcessing(
          false
        );
      }
    };

  const answerQuestion =
    (selectedAnswer) => {
      if (isProcessing) {
        return;
      }

      const correct =
        question.teaching ||
        selectedAnswer ===
          question.answer;

      playSound(
        correct
          ? correctSound
          : wrongSound
      );

      setFeedback(
        correct
          ? "Great exploring!"
          : "Almost! Try another answer."
      );

      const nextAssessmentAnswers =
        isAssessment
          ? [
              ...assessmentAnswers,
              {
                skill:
                  question.skill,
                correct,
              },
            ]
          : assessmentAnswers;

      if (isAssessment) {
        setAssessmentAnswers(
          nextAssessmentAnswers
        );
      }

      if (
        !correct &&
        !isAssessment
      ) {
        return;
      }

      setIsProcessing(
        true
      );

      window.setTimeout(
        advanceQuestion,
        700
      );
    };

  const handleInteractiveComplete =
    () => {
      if (isProcessing) {
        return;
      }

      playSound(
        correctSound
      );

      setFeedback(
        "Great sorting!"
      );

      setIsProcessing(
        true
      );

      window.setTimeout(
        advanceQuestion,
        700
      );
    };

  const handleInteractiveWrong =
    () => {
      if (isProcessing) {
        return;
      }

      playSound(
        wrongSound
      );

      setFeedback(
        "Almost! Try another place."
      );

      window.setTimeout(
        () => {
          setFeedback("");
        },
        900
      );
    };

  if (screen === "map") {
    return (
      <main className="page math-page">
        <p className="eyebrow">
          YOUR JOURNEY
        </p>

        <h1>
          Maths Map
        </h1>

        <p className="page-intro">
          Complete each mission
          to unlock the next
          destination.
        </p>

        <div className="planet-map">
          {mathMissions.map(
            (item) => (
              <MissionCard
                key={item.id}
                mission={item}
                locked={
                  item.id >
                  progress.unlocked
                }
                onSelect={() =>
                  startMission(
                    item.id
                  )
                }
              />
            )
          )}
        </div>
      </main>
    );
  }

  if (screen === "complete") {
    return (
      <main className="math-center-panel">
        <span className="math-celebration">
          ⭐
        </span>

        <p className="math-eyebrow">
          MISSION COMPLETE
        </p>

        <h1>
          {mission.title}{" "}
          complete!
        </h1>

        <p>
          You collected every
          star in this maths
          mission.
        </p>

        <div className="math-action-row">
          <button
            className="primary-button"
            onClick={() =>
              setScreen("map")
            }
          >
            Next mission
          </button>

          <button
            className="secondary-button"
            onClick={onHome}
          >
            Back to home
          </button>
        </div>
      </main>
    );
  }

  if (
    screen ===
    "assessment-results"
  ) {
    return (
      <main className="math-center-panel">
        <span className="math-celebration">
          🚀
        </span>

        <p className="math-eyebrow">
          MATHS ASSESSMENT COMPLETE
        </p>

        <h1>
          Wonderful space
          work!
        </h1>

        <p>
          You answered{" "}
          {
            assessmentSummary.correct
          }{" "}
          of{" "}
          {
            assessmentSummary.total
          }{" "}
          questions correctly.
        </p>

        <div className="math-action-row">
          <button
            className="primary-button"
            onClick={() =>
              setScreen("map")
            }
          >
            View missions
          </button>

          <button
            className="secondary-button"
            onClick={onHome}
          >
            Back to home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="math-page math-mission-page">
      <div className="math-status-row">
        <button
          className="math-back-button"
          onClick={() =>
            setScreen("map")
          }
        >
          ← Missions
        </button>

        <span>
          {mission.title} ·{" "}
          {progress.question +
            1}{" "}
          of{" "}
          {questions.length}
        </span>
      </div>

      <div
        className="math-journey-track"
        aria-label={`${progress.question} questions completed`}
      >
        <img
          className="math-journey-planet"
          src={mission.image}
          alt=""
        />

        <div className="math-journey-line">
          <span
            className="math-journey-rocket"
            style={{
              left: `${journeyPercent}%`,
            }}
          >
            🚀
          </span>
        </div>
      </div>

      <p className="math-eyebrow">
        {isAssessment
          ? "SHOW WHAT YOU KNOW"
          : mission.title.toUpperCase()}
      </p>

      <h1>
        {question.prompt}
      </h1>

      <QuestionVisual
        question={question}
        onInteractiveComplete={
          handleInteractiveComplete
        }
        onInteractiveWrong={
          handleInteractiveWrong
        }
      />

      {!isInteractive ? (
        <div
          className={`math-answer-grid ${
            shuffledOptions.length ===
            3
              ? "has-three-options"
              : ""
          }`}
        >
          {(question.teaching
            ? ["Continue"]
            : shuffledOptions
          ).map(
            (option, index) => (
              <button
                key={`${option}-${index}`}
                className="word-button math-answer-button"
                onClick={() =>
                  answerQuestion(
                    question.teaching
                      ? "__continue__"
                      : option
                  )
                }
                disabled={
                  isProcessing
                }
              >
                {question.teaching ? (
                  option
                ) : (
                  <OptionVisual
                    option={
                      option
                    }
                    question={
                      question
                    }
                  />
                )}
              </button>
            )
          )}
        </div>
      ) : null}

      <p
        className={`math-feedback ${
          feedback.includes(
            "Almost"
          )
            ? "is-wrong"
            : ""
        }`}
        aria-live="polite"
      >
        {feedback}
      </p>
    </main>
  );
}