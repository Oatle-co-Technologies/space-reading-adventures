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
}) {
  const lastTapRef = useRef(0);

  const handlePointerDown = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap < 350) {
      onDoubleTap(name);
      lastTapRef.current = 0;
      return;
    }

    lastTapRef.current = now;
  };

  return (
    <path
      className={`finger ${raised ? "raised" : "lowered"}`}
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
    The base hand is a palm-facing cartoon hand.

    The palm itself contains NO fingers.

    Each of the five fingers is an independent
    interactive SVG path.

    The right hand is mirrored so the thumbs
    point toward the center.
  */

  const handTransform = isLeft
    ? undefined
    : "translate(300 0) scale(-1 1)";

  return (
    <svg
      className="finger-hand"
      viewBox="0 0 300 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={isLeft ? "Left counting hand" : "Right counting hand"}
    >
      <g transform={handTransform}>

        {/* =====================================
            PALM ONLY
            ===================================== */}

        <path
          className="hand-palm"
          d="
            M 78 160

            C 62 165, 52 181, 52 201

            C 52 232, 64 258, 83 283

            C 94 298, 95 313, 95 330

            L 205 330

            C 205 313, 206 298, 217 283

            C 236 258, 248 232, 248 201

            C 248 181, 238 165, 222 160

            C 213 157, 205 160, 198 166

            C 190 160, 181 158, 172 162

            C 164 157, 153 155, 144 159

            C 135 155, 124 157, 116 162

            C 108 158, 99 160, 92 166

            C 87 161, 83 159, 78 160

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
            M 198 170

            C 210 150, 225 130, 242 120

            C 255 112, 268 122, 264 137

            C 260 152, 242 175, 222 195

            C 212 205, 196 200, 192 190

            C 189 182, 192 175, 198 170

            Z
          "
          loweredPath="
            M 198 175

            C 212 175, 225 180, 235 190

            C 245 200, 245 212, 235 222

            C 225 230, 212 225, 200 215

            C 190 205, 188 195, 190 188

            C 192 181, 195 176, 198 175

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
            M 78 165
            V 75

            C 78 55, 122 55, 122 75

            V 165

            C 122 177, 78 177, 78 165

            Z
          "
          loweredPath="
            M 78 165
            V 145

            C 78 132, 122 132, 122 145

            V 165

            C 122 177, 78 177, 78 165

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
            M 122 165
            V 50

            C 122 30, 166 30, 166 50

            V 165

            C 166 177, 122 177, 122 165

            Z
          "
          loweredPath="
            M 122 165
            V 145

            C 122 132, 166 132, 166 145

            V 165

            C 166 177, 122 177, 122 165

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
            M 166 165
            V 70

            C 166 50, 210 50, 210 70

            V 165

            C 210 177, 166 177, 166 165

            Z
          "
          loweredPath="
            M 166 165
            V 145

            C 166 132, 210 132, 210 145

            V 165

            C 210 177, 166 177, 166 165

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
            M 210 165
            V 100

            C 210 80, 254 80, 254 100

            V 165

            C 254 177, 210 177, 210 165

            Z
          "
          loweredPath="
            M 210 165
            V 145

            C 210 132, 254 132, 254 145

            V 165

            C 254 177, 210 177, 210 165

            Z
          "
        />

        {/* =====================================
            PALM DETAILS
            ===================================== */}

        <path
          className="hand-detail"
          d="
            M 82 218
            C 100 229, 119 232, 138 230
          "
        />

        <path
          className="hand-detail"
          d="
            M 84 240
            C 104 251, 125 255, 146 252
          "
        />

        <path
          className="hand-detail"
          d="
            M 91 264
            C 111 275, 132 278, 154 275
          "
        />

        <path
          className="hand-detail"
          d="
            M 183 236
            C 199 232, 213 224, 223 212
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
     OPEN HELPER
     ======================================= */

  const openHelper = () => {
    resetHands();
    setIsOpen(true);
  };

  /* =======================================
     CLOSE HELPER
     ======================================= */

  const closeHelper = () => {
    setIsOpen(false);
  };

  /* =======================================
     LEFT HAND
     ======================================= */

  const toggleLeftFinger = (fingerName) => {
    setLeftHand((current) => ({
      ...current,
      [fingerName]: !current[fingerName],
    }));
  };

  /* =======================================
     RIGHT HAND
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