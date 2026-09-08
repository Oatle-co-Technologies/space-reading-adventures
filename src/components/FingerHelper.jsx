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
   DOUBLE TAP DETECTOR
   ========================================= */

function useDoubleTap(callback) {
  const lastTapRef = useRef(0);

  return () => {
    const now = Date.now();

    if (now - lastTapRef.current < 350) {
      callback();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };
}

/* =========================================
   HAND SVG
   ========================================= */

function HandSVG({ isLeft, fingers, onDoubleTap }) {
  /*
    The artwork is designed as ONE coherent hand.

    Left hand:
      thumb points toward the center.

    Right hand:
      mirrored, so its thumb also points
      toward the center.
  */

  const handTransform = isLeft
    ? undefined
    : "translate(300 0) scale(-1 1)";

  const toggleThumb = useDoubleTap(() =>
    onDoubleTap("thumb")
  );

  const toggleIndex = useDoubleTap(() =>
    onDoubleTap("index")
  );

  const toggleMiddle = useDoubleTap(() =>
    onDoubleTap("middle")
  );

  const toggleRing = useDoubleTap(() =>
    onDoubleTap("ring")
  );

  const togglePinky = useDoubleTap(() =>
    onDoubleTap("pinky")
  );

  return (
    <svg
      className="finger-hand"
      viewBox="0 0 300 360"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={isLeft ? "Left hand counting helper" : "Right hand counting helper"}
    >
      <g transform={handTransform}>

        {/* =====================================
            COMPLETE OPEN HAND SILHOUETTE

            This is ONE hand.

            Fingers are part of the hand instead
            of floating above a separate palm.
            ===================================== */}

        <path
          className="hand-base"
          d="
            M78 316

            C72 293 68 270 68 246
            L68 185

            C68 174 74 166 83 165
            C92 164 99 171 100 181

            L100 87

            C100 72 109 62 121 62
            C133 62 142 72 142 87

            L142 68

            C142 52 151 42 163 42
            C175 42 184 52 184 68

            L184 83

            C184 68 193 58 205 58
            C217 58 226 68 226 83

            L226 100

            C226 87 234 79 245 79
            C256 79 264 88 264 101

            L264 190

            C264 201 257 208 247 208
            C238 208 231 203 229 194

            L229 232

            C229 267 222 294 214 316

            Z
          "
        />

        {/* =====================================
            THUMB

            Long inward-facing thumb.

            This is an overlay because the main
            silhouette includes the thumb area.
            ===================================== */}

        <path
          className={`hand-thumb-overlay ${
            fingers.thumb ? "finger-visible" : "finger-lowered"
          }`}
          d="
            M226 193

            C211 186 198 177 188 165

            C180 155 176 143 177 131

            C178 119 185 110 195 108

            C205 106 214 112 218 122

            C222 132 220 143 216 153

            C212 164 217 176 226 184

            Z
          "
        />

        {/* =====================================
            FINGER SEPARATION LINES

            These make the individual fingers
            visually distinct while keeping the
            hand as one coherent silhouette.
            ===================================== */}

        <path
          className="finger-separator"
          d="M100 181 C101 194 109 201 121 201 C133 201 142 194 142 181"
        />

        <path
          className="finger-separator"
          d="M142 177 C143 191 151 198 163 198 C175 198 184 191 184 177"
        />

        <path
          className="finger-separator"
          d="M184 181 C185 195 193 201 205 201 C217 201 226 194 226 181"
        />

        <path
          className="finger-separator"
          d="M226 188 C227 200 234 207 245 207"
        />

        {/* =====================================
            LOWERED FINGER OVERLAYS

            When a finger is lowered, we cover
            its raised portion with the palm color
            and draw a new rounded top lower down.

            This means the underlying hand remains
            one coherent shape.
            ===================================== */}

        {!fingers.index && (
          <path
            className="lowered-finger"
            d="
              M100 181
              L100 157

              C100 147 108 140 121 140
              C133 140 142 147 142 157

              L142 181

              C142 194 133 201 121 201
              C109 201 100 194 100 181
              Z
            "
          />
        )}

        {!fingers.middle && (
          <path
            className="lowered-finger"
            d="
              M142 177
              L142 145

              C142 135 151 128 163 128
              C175 128 184 135 184 145

              L184 177

              C184 190 175 198 163 198
              C151 198 142 190 142 177
              Z
            "
          />
        )}

        {!fingers.ring && (
          <path
            className="lowered-finger"
            d="
              M184 181
              L184 153

              C184 143 193 136 205 136
              C217 136 226 143 226 153

              L226 181

              C226 194 217 201 205 201
              C193 201 184 194 184 181
              Z
            "
          />
        )}

        {!fingers.pinky && (
          <path
            className="lowered-finger"
            d="
              M226 188
              L226 162

              C226 153 233 147 245 147
              C256 147 264 153 264 162

              L264 190

              C264 201 257 208 247 208
              C238 208 231 203 229 194
              Z
            "
          />
        )}

        {!fingers.thumb && (
          <path
            className="lowered-thumb"
            d="
              M226 193

              C216 189 207 184 200 177

              C194 171 191 163 193 156

              C195 149 202 146 209 149

              C216 152 219 159 218 166

              C218 176 222 184 226 193

              Z
            "
          />
        )}

        {/* =====================================
            PALM LINES
            ===================================== */}

        <path
          className="hand-detail"
          d="M101 235 C121 245 143 248 163 244"
        />

        <path
          className="hand-detail"
          d="M101 257 C121 268 143 270 165 266"
        />

        <path
          className="hand-detail"
          d="M103 280 C122 289 143 292 163 289"
        />

        {/* =====================================
            INVISIBLE INTERACTION AREAS

            Each finger has its own independent
            hit area.

            The artwork itself does not need to
            be five separate visible SVG shapes.
            ===================================== */}

        <rect
          className="finger-hit-area"
          x="96"
          y="55"
          width="49"
          height="145"
          rx="22"
          onPointerDown={toggleIndex}
          aria-label="Index finger"
        />

        <rect
          className="finger-hit-area"
          x="138"
          y="35"
          width="49"
          height="165"
          rx="22"
          onPointerDown={toggleMiddle}
          aria-label="Middle finger"
        />

        <rect
          className="finger-hit-area"
          x="180"
          y="51"
          width="49"
          height="155"
          rx="22"
          onPointerDown={toggleRing}
          aria-label="Ring finger"
        />

        <rect
          className="finger-hit-area"
          x="221"
          y="72"
          width="47"
          height="145"
          rx="21"
          onPointerDown={togglePinky}
          aria-label="Pinky finger"
        />

        <path
          className="finger-hit-area"
          d="
            M229 192
            C212 187 198 178 188 166
            C179 154 175 140 177 126
            C179 111 189 101 201 102
            C215 103 224 114 225 128
            C226 143 220 157 218 169
            C217 178 223 186 229 192
            Z
          "
          onPointerDown={toggleThumb}
          aria-label="Thumb"
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
     TOGGLE LEFT
     ======================================= */

  const toggleLeftFinger = (fingerName) => {
    setLeftHand((current) => ({
      ...current,
      [fingerName]: !current[fingerName],
    }));
  };

  /* =======================================
     TOGGLE RIGHT
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

          {/* LEFT */}

          <div className="finger-helper-hand">
            <HandSVG
              isLeft={true}
              fingers={leftHand}
              onDoubleTap={toggleLeftFinger}
            />
          </div>

          {/* RIGHT */}

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