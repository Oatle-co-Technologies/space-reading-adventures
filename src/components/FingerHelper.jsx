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
    This hand is drawn as a natural open palm.

    The base artwork contains ONLY the palm.
    Every visible finger is its own interactive
    SVG path.

    The left hand has its thumb toward the
    center. The right hand is mirrored so its
    thumb also points toward the center.
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
            PALM

            IMPORTANT:
            This is ONLY the palm.
            There are NO FINGERS hidden inside it.
            ===================================== */}

        <path
          className="hand-palm"
          d="
            M82 165

            C68 171 60 184 60 202
            C60 220 66 237 76 251

            C88 267 94 280 95 299

            L99 326

            L201 326

            L205 299

            C207 278 214 263 227 248

            C239 234 246 216 246 195

            C246 178 237 166 224 162

            C214 159 204 163 198 171

            C190 163 181 160 172 164

            C164 157 153 154 143 159

            C134 153 123 151 114 157

            C104 151 91 153 82 165

            Z
          "
        />

        {/* =====================================
            THUMB

            Raised = thumb naturally extended
            toward the center.

            Lowered = thumb folded across palm.
            ===================================== */}

        <Finger
          name="thumb"
          raised={fingers.thumb}
          onDoubleTap={onDoubleTap}
          raisedPath="
            M198 171

            C209 154 221 139 234 130
            C246 121 258 124 265 134
            C272 145 269 158 258 168

            C246 179 232 188 217 198

            C209 203 201 197 198 190

            C195 183 195 177 198 171

            Z
          "
          loweredPath="
            M198 178

            C210 176 223 179 234 185
            C245 191 251 201 247 210

            C243 219 232 222 220 217

            L194 204

            C187 200 186 190 190 184

            C192 181 195 179 198 178

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
            M84 165

            L84 91

            C84 77 93 67 106 67
            C119 67 128 77 128 91

            L128 166

            C128 178 119 185 106 185
            C93 185 84 177 84 165

            Z
          "
          loweredPath="
            M84 166

            C84 154 93 146 106 146
            C119 146 128 154 128 166

            L128 192

            C128 204 119 212 106 212
            C93 212 84 204 84 192

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
            M128 157

            L128 55

            C128 41 137 31 150 31
            C163 31 172 41 172 55

            L172 157

            C172 169 163 177 150 177
            C137 177 128 169 128 157

            Z
          "
          loweredPath="
            M128 158

            C128 146 137 138 150 138
            C163 138 172 146 172 158

            L172 188

            C172 200 163 208 150 208
            C137 208 128 200 128 188

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
            M172 163

            L172 67

            C172 53 181 43 194 43
            C207 43 216 53 216 67

            L216 169

            C216 181 207 189 194 189
            C181 189 172 181 172 163

            Z
          "
          loweredPath="
            M172 164

            C172 152 181 144 194 144
            C207 144 216 152 216 164

            L216 193

            C216 205 207 213 194 213
            C181 213 172 205 172 193

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
            M216 171

            L216 91

            C216 77 225 67 238 67
            C251 67 260 77 260 91

            L260 177

            C260 189 251 197 238 197
            C225 197 216 189 216 171

            Z
          "
          loweredPath="
            M216 173

            C216 161 225 153 238 153
            C251 153 260 161 260 173

            L260 198

            C260 210 251 218 238 218
            C225 218 216 210 216 198

            Z
          "
        />

        {/* =====================================
            PALM DETAILS
            ===================================== */}

        <path
          className="hand-detail"
          d="
            M91 224
            C108 235 127 239 146 237
          "
        />

        <path
          className="hand-detail"
          d="
            M91 245
            C110 256 131 260 151 257
          "
        />

        <path
          className="hand-detail"
          d="
            M185 239
            C202 235 216 227 226 216
          "
        />

        <path
          className="hand-detail"
          d="
            M104 274
            C124 283 146 286 167 283
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