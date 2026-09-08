import { useRef, useState } from "react";
import "./FingerHelper.css";

const FINGER_NAMES = [
  "thumb",
  "index",
  "middle",
  "ring",
  "pinky",
];

const createHandState = () => ({
  thumb: false,
  index: false,
  middle: false,
  ring: false,
  pinky: false,
});

function HandSVG({ side, fingers, onFingerDoubleClick }) {
  const isLeft = side === "left";

  /*
   * The left hand is drawn normally.
   *
   * The right hand uses the same human-hand drawing,
   * mirrored horizontally. This puts the thumbs toward
   * the centre of the two-hand display.
   */
  const handTransform = isLeft
    ? undefined
    : "translate(300 0) scale(-1 1)";

  return (
    <svg
      className={`finger-hand finger-hand-${side}`}
      viewBox="0 0 300 330"
      role="img"
      aria-label={`${side} hand counting tool`}
    >
      <g transform={handTransform}>
        {/* =========================
            THUMB
            ========================= */}

        <Finger
          name="thumb"
          raised={fingers.thumb}
          onDoubleClick={() =>
            onFingerDoubleClick("thumb")
          }
          className="hand-thumb"
          raisedPath="
            M205 196
            C218 180 228 161 235 143
            C240 130 250 123 260 128
            C271 133 274 145 269 157
            C261 181 249 204 231 220
            C220 230 207 225 202 215
            C198 208 200 201 205 196
            Z
          "
          loweredPath="
            M195 190
            C211 181 224 171 235 160
            C242 153 250 154 256 161
            C262 169 259 178 251 184
            C235 197 220 208 205 215
            C195 220 186 213 185 203
            C184 198 188 193 195 190
            Z
          "
        />

        {/* =========================
            INDEX FINGER
            ========================= */}

        <Finger
          name="index"
          raised={fingers.index}
          onDoubleClick={() =>
            onFingerDoubleClick("index")
          }
          className="hand-finger hand-index"
          raisedPath="
            M75 156
            L75 70
            C75 57 84 48 96 48
            C108 48 117 57 117 70
            L117 159
            C117 170 108 178 96 178
            C84 178 75 169 75 156
            Z
          "
          loweredPath="
            M75 157
            L75 128
            C75 116 84 108 96 108
            C108 108 117 116 117 128
            L117 166
            C117 177 108 184 96 184
            C84 184 75 175 75 157
            Z
          "
        />

        {/* =========================
            MIDDLE FINGER
            ========================= */}

        <Finger
          name="middle"
          raised={fingers.middle}
          onDoubleClick={() =>
            onFingerDoubleClick("middle")
          }
          className="hand-finger hand-middle"
          raisedPath="
            M113 151
            L113 39
            C113 25 123 16 136 16
            C149 16 159 26 159 39
            L159 151
            C159 164 149 173 136 173
            C123 173 113 164 113 151
            Z
          "
          loweredPath="
            M113 154
            L113 119
            C113 107 123 99 136 99
            C149 99 159 107 159 119
            L159 163
            C159 176 149 184 136 184
            C123 184 113 175 113 154
            Z
          "
        />

        {/* =========================
            RING FINGER
            ========================= */}

        <Finger
          name="ring"
          raised={fingers.ring}
          onDoubleClick={() =>
            onFingerDoubleClick("ring")
          }
          className="hand-finger hand-ring"
          raisedPath="
            M151 158
            L151 55
            C151 42 161 33 173 33
            C185 33 195 42 195 55
            L195 158
            C195 170 185 179 173 179
            C161 179 151 170 151 158
            Z
          "
          loweredPath="
            M151 158
            L151 123
            C151 111 161 103 173 103
            C185 103 195 111 195 123
            L195 164
            C195 176 185 184 173 184
            C161 184 151 175 151 158
            Z
          "
        />

        {/* =========================
            PINKY
            ========================= */}

        <Finger
          name="pinky"
          raised={fingers.pinky}
          onDoubleClick={() =>
            onFingerDoubleClick("pinky")
          }
          className="hand-finger hand-pinky"
          raisedPath="
            M188 169
            L188 78
            C188 66 197 57 208 57
            C219 57 228 66 228 78
            L228 169
            C228 180 219 188 208 188
            C197 188 188 180 188 169
            Z
          "
          loweredPath="
            M188 166
            L188 135
            C188 124 197 116 208 116
            C219 116 228 124 228 135
            L228 173
            C228 184 219 192 208 192
            C197 192 188 183 188 166
            Z
          "
        />

        {/* =========================
            PALM
            ========================= */}

        <path
          className="hand-palm"
          d="
            M57 154
            C51 143 42 137 34 142
            C24 148 23 161 30 171
            L53 204
            C59 213 65 224 68 238
            C72 259 88 275 109 281
            C130 287 160 287 181 278
            C202 269 216 251 216 229
            L216 190
            C216 178 208 171 198 171
            C190 171 184 176 181 184
            L181 151
            C181 140 173 133 163 133
            C153 133 146 140 146 151
            L146 160
            C146 149 138 142 128 142
            C118 142 110 149 110 160
            L110 165
            C110 154 102 147 92 147
            C82 147 74 154 74 165
            L74 170
            C69 162 63 156 57 154
            Z
          "
        />

        {/* Soft palm detail */}
        <path
          className="hand-detail"
          d="
            M76 214
            C93 226 115 231 137 229
            C158 227 177 219 188 205
          "
        />

        <path
          className="hand-detail"
          d="
            M91 249
            C108 257 129 259 148 254
          "
        />
      </g>
    </svg>
  );
}

function Finger({
  name,
  raised,
  onDoubleClick,
  raisedPath,
  loweredPath,
  className = "",
}) {
  return (
    <path
      className={`finger ${className} ${
        raised ? "raised" : "lowered"
      }`}
      d={raised ? raisedPath : loweredPath}
      onDoubleClick={onDoubleClick}
      role="button"
      tabIndex={0}
      aria-label={`${name} finger ${
        raised ? "up" : "down"
      }`}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          onDoubleClick();
        }
      }}
    />
  );
}

function FingerHelper() {
  const [leftHand, setLeftHand] =
    useState(createHandState);

  const [rightHand, setRightHand] =
    useState(createHandState);

  /*
   * Stores the most recent pointer-up time for each
   * individual finger.
   *
   * This lets the same interaction work as:
   *
   *   mouse double-click
   *   touch double-tap
   */
  const lastTapRef = useRef({});

  const toggleFinger = (side, finger) => {
    if (side === "left") {
      setLeftHand((current) => ({
        ...current,
        [finger]: !current[finger],
      }));

      return;
    }

    setRightHand((current) => ({
      ...current,
      [finger]: !current[finger],
    }));
  };

  const handleFingerPointerUp = (
    side,
    finger
  ) => {
    const key = `${side}-${finger}`;
    const now = Date.now();
    const previous = lastTapRef.current[key] || 0;

    if (now - previous < 350) {
      toggleFinger(side, finger);
      lastTapRef.current[key] = 0;
      return;
    }

    lastTapRef.current[key] = now;
  };

  return (
    <section
      className="finger-helper"
      aria-label="Counting hands"
    >
      <div className="finger-helper-hands">
        <div className="finger-helper-hand">
          <HandSVG
            side="left"
            fingers={leftHand}
            onFingerDoubleClick={(finger) =>
              handleFingerPointerUp(
                "left",
                finger
              )
            }
          />
        </div>

        <div className="finger-helper-hand">
          <HandSVG
            side="right"
            fingers={rightHand}
            onFingerDoubleClick={(finger) =>
              handleFingerPointerUp(
                "right",
                finger
              )
            }
          />
        </div>
      </div>
    </section>
  );
}

export default FingerHelper;