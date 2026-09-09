import { useState } from "react";
import "./AbacusHelper.css";

const TOTAL_BEADS = 10;

const createBeads = () =>
  Array.from({ length: TOTAL_BEADS }, (_, index) => ({
    id: index,
    moved: false,
  }));

export default function AbacusHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [beads, setBeads] = useState(createBeads);

  /* =========================================
     RESET
     ========================================= */

  const resetAbacus = () => {
    setBeads(createBeads());
  };

  /* =========================================
     OPEN
     ========================================= */

  const openAbacus = () => {
    resetAbacus();
    setIsOpen(true);
  };

  /* =========================================
     CLOSE
     ========================================= */

  const closeAbacus = () => {
    setIsOpen(false);
  };

  /* =========================================
     TOGGLE BEAD
     ========================================= */

  const toggleBead = (id) => {
    setBeads((current) =>
      current.map((bead) =>
        bead.id === id
          ? {
              ...bead,
              moved: !bead.moved,
            }
          : bead
      )
    );
  };

  /* =========================================
     HIDDEN STATE
     ========================================= */

  if (!isOpen) {
    return (
      <div className="abacus-helper">
        <button
          type="button"
          className="abacus-helper-trigger"
          onClick={openAbacus}
          aria-label="Open counting abacus"
        >
          <span className="abacus-helper-trigger-icon">
            🧮
          </span>

          <span>
            Need help counting?
          </span>
        </button>
      </div>
    );
  }

  /* =========================================
     OPEN STATE
     ========================================= */

  return (
    <div className="abacus-helper">
      <div className="abacus-helper-content">

        <button
          type="button"
          className="abacus-helper-close"
          onClick={closeAbacus}
          aria-label="Hide counting abacus"
        >
          ×
        </button>

        <div className="abacus-helper-title">
          Counting Helper
        </div>

        <div className="abacus">
          <div className="abacus-frame">

            <div className="abacus-rail">
              {beads.map((bead) => (
                <button
                  key={bead.id}
                  type="button"
                  className={`abacus-bead ${
                    bead.moved ? "moved" : ""
                  }`}
                  onClick={() => toggleBead(bead.id)}
                  aria-label={`Counting bead ${bead.id + 1}`}
                >
                  <span className="abacus-bead-highlight" />
                </button>
              ))}
            </div>

          </div>
        </div>

        <div className="abacus-helper-label">
          Tap a bead to move it
        </div>

      </div>
    </div>
  );
}