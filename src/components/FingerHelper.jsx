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

    if (now - lastTapRef.current < 350) {
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
    We draw ONE anatomically consistent hand.

    The hand is palm-facing-the-child.

    The thumb sits on the outside of the hand
    in this base drawing. The right hand is then
    mirrored so the two thumbs face inward.

    IMPORTANT:
    The palm path contains NO fingers.
    Every finger visible on screen comes from
    one of the five Finger components below.
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
            M78 160

            C67 164 58 173 55 187
            C51 204 57 222 67 237

            C78 253 88 266 92 285
            C95 299 95 312 95 326

            L205 326

            C205 310 206 296 210 282
            C215 264 225 251 235 237

            C245 223 250 207 247 191
            C244 176 234 166 222 162

            C210 158 201 163 195 171

            C188 164 179 160 170 163

            C162 157 151 155 142 159

            C133 154 122 153 113 158

            C102 153 88 153 78 160

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
            M196 173

            C205 157 216 143 229 132

            C240 123 252 125 259 134

            C267 144 264 157 255 166

            C244 177 231 187 216 198

            C208 204 199 201 195 193

            C192 187 193 179 196 173

            Z
          "
          loweredPath="
            M195 181

            C207 178 220 180 231 186

            C242 192 248 201 245 210

            C242 218 232 222 221 218

            L195 207

            C187 203 185 194 189 187

            C191 184 193 182 195 181

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
            M78 161

            C78 153 79 143 79 132

            L79 91

            C79 76 88 66 101 66

            C114 66 123 76 123 91

            L123 145

            C123 153 119 161 112 166

            C103 171 91 170 84 166

            C81 165 79 163 78 161

            Z
          "
          loweredPath="
            M80 164

            C80 153 89 146 101 146

            C113 146 123 153 123 164

            L123 182

            C123 193 115 200 102 200

            C89 200 80 193 80 182

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
            M123 159

            L123 57

            C123 42 132 31 145 31

            C158 31 167 42 167 57

            L167 146

            C167 157 159 165 147 168

            C136 169 126 165 123 159

            Z
          "
          loweredPath="
            M123 162

            C123 151 132 144 145 144

            C158 144 167 151 167 162

            L167 184

            C167 196 158 203 145 203

            C132 203 123 196 123 184

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
            M167 162

            L167 68

            C167 53 176 43 189 43

            C202 43 211 53 211 68

            L211 151

            C211 162 203 170 191 173

            C179 173 170 169 167 162

            Z
          "
          loweredPath="
            M167 164

            C167 153 176 146 189 146

            C202 146 211 153 211 164

            L211 187

            C211 199 202 206 189 206

            C176 206 167 199 167 187

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
            M211 170

            L211 91

            C211 76 220 66 233 66

            C246 66 255 76 255 91

            L255 157

            C255 169 248 178 237 181

            C226 184 216 179 211 170

            Z
          "
          loweredPath="
            M211 173

            C211 162 220 155 233 155

            C246 155 255 162 255 173

            L255 195

            C255 207 246 214 233 214

            C220 214 211 207 211 195

            Z
          "
        />

        {/* =====================================
            PALM LINES
            ===================================== */}

        <path
          className="hand-detail"
          d="
            M82 218
            C98 228 117 232 136 230
          "
        />

        <path
          className="hand-detail"
          d="
            M84 240
            C103 251 124 255 145 252
          "
        />

        <path
          className="hand-detail"
          d="
            M91 264
            C110 274 131 278 153 275
          "
        />

        <path
          className="hand-detail"
          d="
            M183 235
            C198 231 211 223 221 212
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

        <div className="finger-helper-label">
          Double-tap a finger to move it
        </div>

      </div>
    </div>
  );
}