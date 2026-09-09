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
    This is the real hand traced in Figma.

    We keep the artwork as one coherent SVG
    silhouette.

    The second hand is created by mirroring
    the first hand horizontally.
  */

  const handTransform = isLeft
    ? undefined
    : "translate(457 0) scale(-1 1)";

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
      viewBox="0 0 457 482"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={
        isLeft
          ? "Left hand counting helper"
          : "Right hand counting helper"
      }
    >
      <g transform={handTransform}>

        {/* =====================================
            YOUR REAL TRACED HAND
            ===================================== */}

        <path
          className="hand-base"
          d="
            M113.905 418.616
            C113.457 417.288 107.928 406.987 104.197 399.064
            C100.595 391.413 99.4918 379.71 97.6842 372.378
            C96.4994 367.571 95.0493 361.517 93.3452 354.606
            C90.8889 344.644 87.9884 336.029 81.9774 323.562
            C80.0966 319.661 70.1971 303.945 56.4238 280.752
            C48.811 267.933 46.0868 263.093 43.6704 258.49
            C40.9863 253.376 31.253 236.491 24.5068 224.145
            C20.2053 216.273 17.0346 208.702 14.1926 202.908
            C7.84594 189.967 4.7471 178.859 2.93425 174.254
            C1.18949 169.821 1.11915 164.889 1.00188 158.656
            C0.898045 153.138 5.10599 149.071 8.78057 145.8
            C12.3285 142.642 17.5718 143.032 22.8949 143.637
            C28.7654 144.305 31.9332 148.687 40.9458 158.384
            C46.6858 164.561 49.3223 170.104 52.4092 174.732
            C55.8734 179.926 59.7934 186.616 64.7784 195.153
            C67.4292 199.694 69.9032 203.556 72.5024 207.385
            C75.4373 211.709 83.026 222.735 87.904 230.579
            C92.0411 237.231 96.8138 244.926 100.228 247.284
            C104.505 250.238 110.49 250.782 115.23 251.029
            C119.925 251.274 121.881 242.36 123.688 235.874
            C125.747 228.486 122.742 219.613 121.41 212.458
            C118.319 195.861 121.329 178.737 121.362 172.581
            C121.375 170.104 121.022 163.702 121.058 153.112
            C121.095 142.704 121.338 127.398 121.198 110.727
            C121.067 95.0763 119.254 85.8251 118.064 79.5976
            C117.133 74.7221 116.363 70.0194 115.681 65.2868
            C114.956 60.2502 114.7 54.7135 114.209 48.2141
            C113.655 40.8871 113.705 36.4065 115.959 32.9239
            C118.344 29.239 122.596 27.6968 126.383 26.0979
            C130.527 24.3484 135.224 24.5944 140.283 23.8364
            C146.641 22.8837 151.572 25.6362 156.971 27.6077
            C161.794 29.3688 164.597 33.1169 167.311 37.1087
            C170.97 42.4916 172.546 47.5474 173.884 53.0778
            C176.505 63.9147 174.177 79.3993 172.773 86.5436
            C172.087 90.0349 171.224 93.5867 170.771 104.724
            C169.696 131.172 170.691 151.397 170.949 156.026
            C171.281 161.975 172.171 166.537 174.022 174.519
            C176.515 185.269 178.253 191.214 180.662 195.457
            C181.317 196.61 182.105 197.792 182.961 198.086
            C186.869 199.427 189.678 192.098 193.426 186.457
            C196.69 181.544 197.407 176.626 197.927 158.435
            C198.15 150.643 200.52 145.086 201.563 140.559
            C202.578 136.153 203.343 131.281 204.234 126.438
            C205.507 119.523 207.705 110.737 209.118 105.917
            C210.575 100.943 211.345 94.0105 211.453 82.3566
            C211.564 70.3946 211.185 62.4125 210.885 55.8892
            C210.624 50.2106 210.72 44.0558 211.316 38.323
            C211.98 31.9218 214.627 24.2357 215.556 19.2379
            C216.487 14.2247 220.478 9.95342 224.828 5.76424
            C228.462 2.26436 233.694 2.65937 238.2 1.48721
            C240.295 0.942529 245.07 0.897357 251.136 1.14164
            C258.397 1.43402 264.959 13.576 268.32 20.9941
            C271.2 27.3508 270.848 33.6095 270.926 44.6355
            C270.972 51.1974 268.29 57.9761 266.52 65.1188
            C263.685 76.5598 262.362 83.5209 261.422 88.5552
            C259.942 96.4835 258.363 101.945 257.345 107.077
            C256.079 113.457 256.325 122.14 255.795 130.367
            C254.976 143.077 254.817 148.535 254.511 153.755
            C254.209 158.912 253.53 164.011 252.439 169.508
            C251.324 175.12 250.287 181.1 249.155 186.738
            C247.969 192.644 248.979 197.974 250.722 201.523
            C252.578 205.301 257.577 193.92 261.179 188.564
            C267.023 179.872 267.243 174.588 268.465 168.818
            C269.819 162.426 270.431 157.856 271.325 151.673
            C272.929 140.576 272.141 135.934 274.248 125.637
            C280.549 94.8453 283.079 90.6692 284.491 86.3959
            C285.932 82.0328 288.941 78.2849 292.881 70.3056
            C295.379 65.2459 298.005 60.2179 301.163 56.606
            C304.869 52.3682 312.257 52.3315 317.419 51.9727
            C322.203 51.6403 326.271 51.0073 330.067 53.1404
            C334.586 55.6795 336.913 61.3734 340.227 66.998
            C343.243 72.1169 344.435 77.1648 345.402 82.0092
            C346.402 87.0184 345.475 92.0299 344.23 96.7328
            C343.307 100.217 340.811 106.847 338.335 115.132
            C336.698 120.607 334.323 130.908 330.454 149.823
            C325.673 173.198 321.627 189.142 320.613 194.454
            C318.96 203.117 316.591 212.556 315.604 217.304
            C314.563 222.314 312.774 229.639 311.932 235.515
            C311.094 241.37 309.152 248.083 307.821 258.239
            C306.114 271.263 306.961 280.002 306.55 285.538
            C305.819 295.382 305.56 308.08 306.152 313.091
            C306.716 317.863 307.639 323.208 308.267 327.996
            C308.568 330.299 309.483 332.201 311.074 333.515
            C314.332 336.206 318.678 336.561 324.227 338.247
            C328.42 339.522 337.933 339.857 348.23 337.775
            C354.335 336.541 359.237 334.443 363.626 333.226
            C367.952 332.026 372.094 330.678 377.821 328.004
            C383.556 325.325 389.282 320.653 394.927 316.377
            C399.005 313.288 405.354 311.687 412.502 310.759
            C425.768 309.035 430.011 312.396 435.103 313.897
            C443.685 316.427 450.338 321.192 453.62 324.731
            C456.771 328.13 456.151 333.945 455.362 338.524
            C454.539 343.299 450.357 346.711 446.615 349.722
            C443.081 352.564 439.179 354.533 434.725 356.835
            C429.834 359.363 426.425 363.327 422.042 364.943
            C417.725 366.535 411.492 368.104 406.792 369.59
            C401.818 371.161 395.327 373.123 390.717 374.768
            C384.066 377.142 380.369 381.697 376.273 384.429
            C372.667 386.833 368.465 387.845 362.639 393.401
            C354.378 401.277 352.534 408.876 347.989 422.302
            C345.262 430.357 344.297 440.771 343.751 447.888
            C343.479 453.567 341.606 461.208 338.745 470.427
            C337.603 474.324 337.09 476.638 334.746 481
          "
        />

        {/* =====================================
            INVISIBLE FINGER HIT AREAS

            These sit above the artwork.
            ===================================== */}

        {/* INDEX */}
        <rect
          className="finger-hit-area"
          x="105"
          y="15"
          width="65"
          height="240"
          rx="30"
          onPointerDown={toggleIndex}
          aria-label="Index finger"
        />

        {/* MIDDLE */}
        <rect
          className="finger-hit-area"
          x="165"
          y="5"
          width="75"
          height="245"
          rx="35"
          onPointerDown={toggleMiddle}
          aria-label="Middle finger"
        />

        {/* RING */}
        <rect
          className="finger-hit-area"
          x="235"
          y="30"
          width="75"
          height="240"
          rx="35"
          onPointerDown={toggleRing}
          aria-label="Ring finger"
        />

        {/* PINKY */}
        <rect
          className="finger-hit-area"
          x="295"
          y="45"
          width="75"
          height="225"
          rx="35"
          onPointerDown={togglePinky}
          aria-label="Pinky finger"
        />

        {/* THUMB */}
        <path
          className="finger-hit-area"
          d="
            M125 255
            C100 230 78 205 60 178
            C45 155 38 132 44 112
            C50 92 72 84 94 96
            C116 108 128 132 132 157
            C136 182 139 216 145 240
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