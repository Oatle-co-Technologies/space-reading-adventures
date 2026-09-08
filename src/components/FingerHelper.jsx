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
    The LEFT hand is drawn with the thumb
    pointing toward the centre.

    The RIGHT hand is a horizontal mirror,
    which makes its thumb also point inward.
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

            IMPORTANT:
            The palm contains NO fingers.

            It is deliberately simple and mostly
            straight along the outside edges.
            ===================================== */}

        <path
          className="hand-palm"
          d="
            M82 150

            C78 158 76 169 76 181

            L76 236

            C76 266 82 290 91 316

            L210 316

            C216 290 222 264 222 236

            L222 166

            C222 151 214 143 203 143

            C194 143 187 149 184 158

            L184 174

            C181 158 174 149 162 149

            C151 149 143 157 141 170

            L141 178

            C138 162 131 154 120 154

            C109 154 101 162 99 176

            L99 181

            C96 165 90 154 82 150

            Z
          "
        />

        {/* =====================================
            THUMB

            Longer thumb.
            The important curve is between the
            thumb and index finger.
            ===================================== */}

        <Finger
          name="thumb"
          raised={fingers.thumb}
          onDoubleTap={onDoubleTap}
          raisedPath="
            M184 174

            C198 164 208 153 213 139

            C218 125 217 110 209 100

            C201 90 188 91 180 101

            C174 109 174 121 177 133

            C180 145 181 157 178 168

            C177 171 180 174 184 174

            Z
          "
          loweredPath="
            M184 177

            C195 174 204 167 209 158

            C214 149 213 139 207 133

            C201 127 191 129 185 136

            C180 142 177 150 176 159

            L176 171

            C176 175 179 178 184 177

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
            M99 181

            L99 72

            C99 58 108 48 120 48

            C132 48 141 58 141 72

            L141 181

            C141 188 132 193 120 193

            C108 193 99 188 99 181

            Z
          "
          loweredPath="
            M99 181

            L99 151

            C99 140 108 133 120 133

            C132 133 141 140 141 151

            L141 181

            C141 188 132 193 120 193

            C108 193 99 188 99 181

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
            M141 178

            L141 42

            C141 28 150 18 162 18

            C174 18 183 28 183 42

            L183 178

            C183 186 174 191 162 191

            C150 191 141 186 141 178

            Z
          "
          loweredPath="
            M141 178

            L141 143

            C141 132 150 125 162 125

            C174 125 183 132 183 143

            L183 178

            C183 186 174 191 162 191

            C150 191 141 186 141 178

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
            M183 181

            L183 58

            C183 44 192 34 204 34

            C216 34 225 44 225 58

            L225 181

            C225 189 216 194 204 194

            C192 194 183 189 183 181

            Z
          "
          loweredPath="
            M183 181

            L183 148

            C183 137 192 130 204 130

            C216 130 225 137 225 148

            L225 181

            C225 189 216 194 204 194

            C192 194 183 189 183 181

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
            M225 188

            L225 86

            C225 72 234 62 246 62

            C258 62 267 72 267 86

            L267 188

            C267 197 258 202 246 202

            C234 202 225 197 225 188

            Z
          "
          loweredPath="
            M225 188

            L225 157

            C225 146 234 139 246 139

            C258 139 267 146 267 157

            L267 188

            C267 197 258 202 246 202

            C234 202 225 197 225 188

            Z
          "
        />

        {/* =====================================
            HAND DETAILS

            These sit on the palm only.
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
     RESET
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
     HIDDEN
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
     OPEN
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