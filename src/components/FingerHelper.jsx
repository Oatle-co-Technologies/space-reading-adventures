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
    } else {
      lastTapRef.current = now;
    }
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
    The two hands face inward.

    LEFT hand is mirrored so its thumb points
    toward the center.

    RIGHT hand stays in its normal orientation.
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

            The palm is kept simple and proportional.
            It does NOT contain the finger silhouettes.
            ===================================== */}

        <path
          className="hand-palm"
          d="
            M82 145

            C78 154 76 166 76 180

            L76 245

            C76 272 81 296 88 316

            L212 316

            C219 296 224 272 224 245

            L224 180

            C224 164 218 154 207 151

            C197 148 189 154 185 164

            L185 176

            C181 162 173 155 162 155

            C151 155 143 163 141 176

            C138 162 131 155 120 155

            C109 155 101 163 99 176

            C96 159 90 149 82 145

            Z
          "
        />

        {/* =====================================
            THUMB

            Longer and extended outward.
            Mirroring makes both thumbs point
            inward toward the center.
            ===================================== */}

        <Finger
          name="thumb"
          raised={fingers.thumb}
          onDoubleTap={onDoubleTap}
          raisedPath="
            M184 177

            C198 169 211 158 219 145

            C226 134 229 122 227 111

            C225 101 219 95 211 94

            C202 93 195 99 192 108

            C189 118 190 129 187 139

            C184 150 178 160 177 168

            C177 172 180 176 184 177

            Z
          "
          loweredPath="
            M184 179

            C196 176 207 168 214 158

            C221 149 222 139 217 132

            C212 125 203 125 196 130

            C188 136 184 145 181 154

            L178 168

            C177 174 180 178 184 179

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
            M99 177

            L99 78

            C99 67 107 59 119 59

            C131 59 140 67 140 78

            L140 177

            C140 185 131 190 120 190

            C109 190 99 185 99 177

            Z
          "
          loweredPath="
            M99 177

            L99 149

            C99 140 108 134 120 134

            C132 134 140 140 140 149

            L140 177

            C140 185 131 190 120 190

            C109 190 99 185 99 177

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
            M140 176

            L140 63

            C140 51 149 43 161 43

            C173 43 182 51 182 63

            L182 176

            C182 185 173 190 161 190

            C149 190 140 185 140 176

            Z
          "
          loweredPath="
            M140 176

            L140 143

            C140 134 149 128 161 128

            C173 128 182 134 182 143

            L182 176

            C182 185 173 190 161 190

            C149 190 140 185 140 176

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
            M182 178

            L182 75

            C182 64 191 56 203 56

            C215 56 224 64 224 75

            L224 178

            C224 187 215 192 203 192

            C191 192 182 187 182 178

            Z
          "
          loweredPath="
            M182 178

            L182 149

            C182 140 191 134 203 134

            C215 134 224 140 224 149

            L224 178

            C224 187 215 192 203 192

            C191 192 182 187 182 178

            Z
          "
        />

        {/* =====================================
            PINKY

            Smaller and pulled inward so it stays
            proportional to the palm.
            ===================================== */}

        <Finger
  name="pinky"
  raised={fingers.pinky}
  onDoubleTap={onDoubleTap}
  raisedPath="
    M209 184

    L209 96

    C209 85 216 78 226 78

    C236 78 243 85 243 96

    L243 184

    C243 193 236 198 226 198

    C216 198 209 193 209 184

    Z
  "
  loweredPath="
    M209 184

    L209 157

    C209 148 216 142 226 142

    C236 142 243 148 243 157

    L243 184

    C243 193 236 198 226 198

    C216 198 209 193 209 184

    Z
  "
/>
        {/* =====================================
            PALM DETAILS
            ===================================== */}

        <path
          className="hand-detail"
          d="
            M101 229
            C119 239 139 242 158 239
          "
        />

        <path
          className="hand-detail"
          d="
            M102 250
            C121 260 141 263 160 260
          "
        />

        <path
          className="hand-detail"
          d="
            M180 232
            C197 228 211 219 222 207
          "
        />

        <path
          className="hand-detail"
          d="
            M108 278
            C126 286 146 288 165 285
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
     RESET BOTH HANDS
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
     HELPER HIDDEN
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
          <span className="finger-helper-trigger-icon">
            👋
          </span>

          <span>
            Need help counting?
          </span>
        </button>
      </div>
    );
  }

  /* =======================================
     HELPER OPEN
     ======================================= */

  return (
    <div className="finger-helper">
      <div className="finger-helper-content">

        {/* CLOSE BUTTON */}

        <button
          type="button"
          className="finger-helper-close"
          onClick={closeHelper}
          aria-label="Hide finger counting helper"
        >
          ×
        </button>

        {/* HANDS */}

        <div className="finger-helper-hands">

          <div className="finger-helper-hand">
            <HandSVG
              isLeft={true}
              fingers={leftHand}
              onDoubleTap={toggleLeftFinger}
            />
          </div>

          <div className="finger-helper-hand">
            <HandSVG
              isLeft={false}
              fingers={rightHand}
              onDoubleTap={toggleRightFinger}
            />
          </div>

        </div>

        {/* INSTRUCTION */}

        <div className="finger-helper-label">
          Double-tap a finger to move it
        </div>

      </div>
    </div>
  );
}