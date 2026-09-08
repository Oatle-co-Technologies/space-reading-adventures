import { useRef, useState } from "react";
import "./FingerHelper.css";

/* =========================================
   HAND STATE
   ========================================= */

const createHandState = () => ({
  thumb: true,
  index: true,
  middle: true,
  ring: true,
  pinky: true,
});

/* =========================================
   FINGER
   ========================================= */

function Finger({
  name,
  raised,
  onDoubleTap,
  raisedPath,
  loweredPath,
  className = "",
}) {
  const lastTapRef = useRef(0);

  const handlePointerDown = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap < 350) {
      onDoubleTap(name);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  return (
    <path
      className={`finger ${raised ? "raised" : "lowered"} ${className}`}
      d={raised ? raisedPath : loweredPath}
      tabIndex="0"
      role="button"
      aria-label={`${name} finger`}
      onPointerDown={handlePointerDown}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onDoubleTap(name);
        }
      }}
    />
  );
}

/* =========================================
   HAND SVG
   ========================================= */

function HandSVG({ isLeft, fingers, onDoubleTap }) {
  /*
    The left hand is drawn normally.

    The right hand uses a horizontal flip so the
    two thumbs naturally point toward the middle.
  */

  const handTransform = isLeft
    ? undefined
    : "translate(300 0) scale(-1 1)";

  return (
    <svg
      className="finger-hand"
      viewBox="0 0 300 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={isLeft ? "Left hand" : "Right hand"}
    >
      <g transform={handTransform}>
        {/* =====================================
            PALM
            ===================================== */}

        <path
          className="hand-palm"
          d="
            M72 190
            C58 178 52 160 55 142
            C58 125 70 116 84 120
            C91 122 96 128 99 137

            L99 72
            C99 58 108 48 120 48
            C132 48 140 58 140 72
            L140 126

            L140 42
            C140 28 149 18 161 18
            C173 18 182 28 182 42
            L182 128

            L182 58
            C182 44 191 34 203 34
            C215 34 224 44 224 58
            L224 137

            L224 86
            C224 72 233 62 245 62
            C257 62 266 72 266 86
            L266 174

            C266 211 249 239 223 258
            C204 272 188 291 183 318

            L95 318

            C93 291 86 269 74 248
            C63 230 58 211 59 196

            C60 193 66 191 72 190
            Z
          "
        />

        {/* =====================================
            THUMB
            ===================================== */}

        <Finger
          name="thumb"
          raised={fingers.thumb}
          onDoubleTap={onDoubleTap}
          raisedPath="
            M72 190
            C58 178 52 160 55 142
            C58 125 70 116 84 120
            C94 123 100 133 99 145
            C98 158 91 169 84 179
            C80 185 76 189 72 190
            Z
          "
          loweredPath="
            M72 190
            C58 178 52 160 55 142
            C58 125 70 116 84 120
            C94 123 100 133 99 145
            C99 157 92 166 85 173
            C80 179 76 185 72 190
            Z
          "
        />

        {/* =====================================
            INDEX FINGER
            ===================================== */}

        <Finger
          name="index"
          raised={fingers.index}
          onDoubleTap={onDoubleTap}
          raisedPath="
            M99 137
            L99 72
            C99 58 108 48 120 48
            C132 48 140 58 140 72
            L140 137
            C140 147 131 154 120 154
            C109 154 99 147 99 137
            Z
          "
          loweredPath="
            M99 137
            L99 120
            C99 109 108 102 120 102
            C132 102 140 109 140 120
            L140 139
            C140 150 131 157 120 157
            C109 157 99 150 99 137
            Z
          "
        />

        {/* =====================================
            MIDDLE FINGER
            ===================================== */}

        <Finger
          name="middle"
          raised={fingers.middle}
          onDoubleTap={onDoubleTap}
          raisedPath="
            M140 128
            L140 42
            C140 28 149 18 161 18
            C173 18 182 28 182 42
            L182 128
            C182 139 173 146 161 146
            C149 146 140 139 140 128
            Z
          "
          loweredPath="
            M140 130
            L140 112
            C140 101 149 94 161 94
            C173 94 182 101 182 112
            L182 130
            C182 141 173 148 161 148
            C149 148 140 141 140 130
            Z
          "
        />

        {/* =====================================
            RING FINGER
            ===================================== */}

        <Finger
          name="ring"
          raised={fingers.ring}
          onDoubleTap={onDoubleTap}
          raisedPath="
            M182 137
            L182 58
            C182 44 191 34 203 34
            C215 34 224 44 224 58
            L224 137
            C224 148 215 155 203 155
            C191 155 182 148 182 137
            Z
          "
          loweredPath="
            M182 137
            L182 119
            C182 108 191 101 203 101
            C215 101 224 108 224 119
            L224 138
            C224 149 215 156 203 156
            C191 156 182 149 182 137
            Z
          "
        />

        {/* =====================================
            PINKY
            ===================================== */}

        <Finger
          name="pinky"
          raised={fingers.pinky}
          onDoubleTap={onDoubleTap}
          raisedPath="
            M224 146
            L224 86
            C224 72 233 62 245 62
            C257 62 266 72 266 86
            L266 174
            C266 185 257 192 245 192
            C233 192 224 184 224 174
            Z
          "
          loweredPath="
            M224 150
            L224 135
            C224 124 233 117 245 117
            C257 117 266 124 266 135
            L266 174
            C266 185 257 192 245 192
            C233 192 224 184 224 174
            Z
          "
        />

        {/* =====================================
            PALM DETAILS
            ===================================== */}

        <path
          className="hand-detail"
          d="
            M93 211
            C111 224 130 228 149 226
          "
        />

        <path
          className="hand-detail"
          d="
            M93 232
            C112 243 131 247 151 244
          "
        />

        <path
          className="hand-detail"
          d="
            M185 224
            C201 220 214 211 224 198
          "
        />

        <path
          className="hand-detail"
          d="
            M101 268
            C119 277 140 280 159 278
          "
        />
      </g>
    </svg>
  );
}

/* =========================================
   FINGER HELPER
   ========================================= */

export default function FingerHelper() {
  const [isOpen, setIsOpen] = useState(false);

  const [leftHand, setLeftHand] = useState(createHandState);
  const [rightHand, setRightHand] = useState(createHandState);

  /* =======================================
     RESET HANDS
     ======================================= */

  const resetHands = () => {
    setLeftHand(createHandState());
    setRightHand(createHandState());
  };

  /* =======================================
     OPEN
     ======================================= */

  const openHelper = () => {
    resetHands();
    setIsOpen(true);
  };

  /* =======================================
     CLOSE
     ======================================= */

  const closeHelper = () => {
    setIsOpen(false);
  };

  /* =======================================
     TOGGLE LEFT FINGER
     ======================================= */

  const toggleLeftFinger = (fingerName) => {
    setLeftHand((current) => ({
      ...current,
      [fingerName]: !current[fingerName],
    }));
  };

  /* =======================================
     TOGGLE RIGHT FINGER
     ======================================= */

  const toggleRightFinger = (fingerName) => {
    setRightHand((current) => ({
      ...current,
      [fingerName]: !current[fingerName],
    }));
  };

  /* =======================================
     HIDDEN STATE
     ======================================= */

  if (!isOpen) {
    return (
      <div className="finger-helper">
        <button
          type="button"
          className="finger-helper-trigger"
          onClick={openHelper}
          aria-label="Open finger counting helper"
        >
          <span className="finger-helper-trigger-icon">👋</span>
          <span>Need help counting?</span>
        </button>
      </div>
    );
  }

  /* =======================================
     OPEN STATE
     ======================================= */

  return (
    <div className="finger-helper">
      <div className="finger-helper-content">
        <button
          type="button"
          className="finger-helper-close"
          onClick={closeHelper}
          aria-label="Hide finger counting helper"
        >
          ×
        </button>

        <div className="finger-helper-hands">
          {/* LEFT HAND */}
          <div className="finger-helper-hand">
            <HandSVG
              isLeft={true}
              fingers={leftHand}
              onDoubleTap={toggleLeftFinger}
            />
          </div>

          {/* RIGHT HAND */}
          <div className="finger-helper-hand">
            <HandSVG
              isLeft={false}
              fingers={rightHand}
              onDoubleTap={toggleRightFinger}
            />
          </div>
        </div>

        <div className="finger-helper-label">
          Double-tap a finger to move it
        </div>
      </div>
    </div>
  );
}