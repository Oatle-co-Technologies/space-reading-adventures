import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { questions } from "./data/questions";
import { lowercaseQuestions } from "./data/lowercaseQuestions";
import { matchingQuestions } from "./data/matchingQuestions";
import { phonicsQuestions } from "./data/phonicsQuestions";
import { readingQuestions } from "./data/readingQuestions";
import { generateOptions } from "./utils/generateOptions";
import { generateReadingOptions } from "./utils/generateReadingOptions";

const missingLetterPositions = {
  ant: 0, bag: 1, cab: 2, dog: 1, egg: 0, fan: 2, gas: 1,
  hat: 0, ice: 2, jam: 1, key: 2, lid: 0, map: 1, net: 2,
  owl: 0, pen: 1, queen: 0, rug: 2, sun: 1, tag: 0, umbrella: 0,
  van: 1, web: 2, xylophone: 0, yoyo: 1, zip: 2,
};

function generateMissingLetterOptions(correctLetter) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const wrongLetters = alphabet.filter((letter) => letter !== correctLetter);
  return shuffleArray([
    correctLetter,
    ...shuffleArray(wrongLetters).slice(0, 3),
  ]);
}

import mercuryImage from "./assets/images/planets/mercury.png";
import venusImage from "./assets/images/planets/venus.png";
import earthImage from "./assets/images/planets/earth.png";
import marsImage from "./assets/images/planets/mars.png";
import jupiterImage from "./assets/images/planets/jupitor.png";
import saturnImage from "./assets/images/planets/saturn.png";
import uranusImage from "./assets/images/planets/uranus.png";
import neptuneImage from "./assets/images/planets/neptune.png";
import plutoImage from "./assets/images/planets/pluto.png";
import correctSound from "./sounds/correct.mp3";
import wrongSound from "./sounds/wrong.mp3";
import victorySound from "./sounds/victory.mp3";
import blastoffSound from "./sounds/blastoff.mp3";

const phonicsAudio = import.meta.glob("./sounds/*-sound.mp3", {
  eager: true,
  query: "?url",
  import: "default",
});

console.log(phonicsAudio);

const planets = [
  {
    id: 1,
    name: "Mercury",
    image: mercuryImage,
    color: "#FFBD59",
    description: "Learn capital letters",
    questions,
  },
  {
    id: 2,
    name: "Venus",
    image: venusImage,
    color: "#FF8D70",
    description: "Explore lowercase letters",
    questions: lowercaseQuestions,
  },
  {
    id: 3,
    name: "Earth",
    image: earthImage,
    color: "#55C6FF",
    description: "Match upper and lowercase",
    questions: matchingQuestions,
  },
  {
    id: 4,
    name: "Mars",
    image: marsImage,
    color: "#EF5B5B",
    description: "Listen for letter sounds",
    questions: phonicsQuestions,
  },
  {
    id: 5,
    name: "Jupiter",
    image: jupiterImage,
    color: "#D6B44C",
    description: "Read simple words",
    questions: readingQuestions,
  },
  {
    id: 6,
    name: "Saturn",
    image: saturnImage,
    color: "#E7C77A",
    description: "Fill in the missing letter",
    questions: readingQuestions.map((question) => {
      const word = question.answer;
      const missingIndex = missingLetterPositions[word];

      return {
        word,
        display: `${word.slice(0, missingIndex)}_${word.slice(missingIndex + 1)}`,
        answer: word[missingIndex],
      };
    }),
  },
  {
    id: 7,
    name: "Uranus",
    image: uranusImage,
    color: "#76D8E8",
    description: "Coming soon",
    questions: [],
  },
  {
    id: 8,
    name: "Neptune",
    image: neptuneImage,
    color: "#4C78FF",
    description: "Coming soon",
    questions: [],
  },
  {
    id: 9,
    name: "Pluto",
    image: plutoImage,
    color: "#D9C5A4",
    description: "Coming soon",
    questions: [],
  },
];

function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

const savedGame = () => {
  try {
    return (
      JSON.parse(localStorage.getItem("atli-space-progress")) || {
        unlocked: 1,
        activePlanet: 1,
        question: 0,
      }
    );
  } catch {
    return {
      unlocked: 1,
      activePlanet: 1,
      question: 0,
    };
  }
};

function AppNav({ onHome, onMap, onSettings }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={onHome} aria-label="Go home">
        🚀 Atli's Space Game
      </button>

      <nav>
        <button onClick={onHome}>Home</button>
        <button onClick={onMap}>Planet Map</button>
        <button onClick={onSettings}>Settings</button>
      </nav>
    </header>
  );
}

function PlanetVisual({ planet, className = "" }) {
  return planet.image ? (
    <img className={className} src={planet.image} alt={planet.name} />
  ) : (
    <span
      className={className}
      role="img"
      aria-label={planet.name}
    >
      {planet.emoji}
    </span>
  );
}

function App() {
  const [progress, setProgress] = useState(savedGame);
  const [screen, setScreen] = useState("home");
  const [soundOn, setSoundOn] = useState(true);
  const [feedback, setFeedback] = useState("");
  const promptAudio = useRef(null);

  const planet =
    planets.find((item) => item.id === progress.activePlanet) ||
    planets[0];

  // This is ONLY the destination shown on the travel track.
  // The current planet is always represented by `planet`.
  const nextPlanet =
    planets.find((item) => item.id === planet.id + 1) || {
      name: "Mission complete",
      emoji: "🏁",
    };

  const missionQuestions = useMemo(
    () => shuffleArray(planet.questions),
    [planet.questions]
  );

  const question =
    missionQuestions[progress.question] || missionQuestions[0];

  const recording = question?.sound
    ? phonicsAudio[
        `./sounds/${question.answer.toLowerCase()}-sound.mp3`
      ]
    : null;

  const options = useMemo(() => {
    if (!question) return [];

    if (planet.id === 5) {
      return generateReadingOptions(question.answer);
    }

    if (planet.id === 6) {
      return generateMissingLetterOptions(question.answer);
    }

    return generateOptions(question.answer);
  }, [question, planet.id]);

  console.log("Question:", question?.answer);
  console.log("Recording:", recording);

  useEffect(() => {
    localStorage.setItem(
      "atli-space-progress",
      JSON.stringify(progress)
    );
  }, [progress]);

  const playSound = (sound) => {
    if (!soundOn) return;

    const effect = new Audio(sound);
    effect.volume = 0.55;
    effect.play().catch(() => {});
  };

  const goToPlanet = (id) => {
    playSound(blastoffSound);

    setProgress((current) => ({
      ...current,
      activePlanet: id,
      question: 0,
    }));

    setFeedback("");
    setScreen("planet");
  };

  const speak = () => {
    if (!soundOn || !question?.sound) return;

    window.speechSynthesis?.cancel();

    if (recording) {
      promptAudio.current?.pause();

      const audio = new Audio(recording);
      audio.volume = 0.8;
      promptAudio.current = audio;

      audio.play().catch(() => {});
      return;
    }

    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(question.sound);
    utterance.rate = 0.75;

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (screen === "mission" && question?.sound) {
      speak();
    }

    // Playing the prompt when a phonics question changes is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, progress.question, planet.id]);

  const answer = (selectedAnswer) => {
    if (selectedAnswer !== question.answer) {
      playSound(wrongSound);
      setFeedback("Almost! Try another star.");
      return;
    }

    setFeedback("");

    if (progress.question < missionQuestions.length - 1) {
      playSound(correctSound);

      setProgress((current) => ({
        ...current,
        question: current.question + 1,
      }));

      return;
    }

    playSound(victorySound);
    setScreen("celebration");
  };

  const unlockNext = () => {
    const nextPlanetId = planet.id + 1;

    if (nextPlanetId > planets.length) {
      setScreen("map");
      return;
    }

    playSound(blastoffSound);

    setProgress((current) => ({
      ...current,
      unlocked: Math.max(current.unlocked, nextPlanetId),
      activePlanet: nextPlanetId,
      question: 0,
    }));

    setScreen("unlock");
  };

  const resetProgress = () => {
    setProgress({
      unlocked: 1,
      activePlanet: 1,
      question: 0,
    });

    setScreen("home");
  };

  const action = (
    label,
    handler,
    className = "primary-button"
  ) => (
    <button className={className} onClick={handler}>
      {label}
    </button>
  );

  let content;

  if (screen === "home") {
    content = (
      <main className="hero-panel">
        <span className="hero-rocket">🚀</span>

        <p className="eyebrow">WELCOME, CAPTAIN</p>

        <h1>Ready for a stellar adventure?</h1>

        <p>
          Learn letters, sounds, and matching while visiting every planet
          in our solar system.
        </p>

        <div className="button-row">
          {action("Start", () => {
            playSound(blastoffSound);
            setScreen("launch");
          })}

          {action(
            "Keep Playing",
            () => setScreen("mission"),
            "secondary-button"
          )}
        </div>
      </main>
    );
  } else if (screen === "launch") {
    content = (
      <main className="launch-panel">
        <div className="countdown-orbit">
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <b>🚀</b>
        </div>

        <p className="eyebrow">MISSION CONTROL</p>

        <h1>Launch sequence ready!</h1>

        <p>Choose a planet to begin your next learning mission.</p>

        {action("View planet map", () => setScreen("map"))}
      </main>
    );
  } else if (screen === "map") {
    content = (
      <main className="page">
        <p className="eyebrow">YOUR JOURNEY</p>

        <h1>Planet Map</h1>

        <p className="page-intro">
          Complete each planet to unlock the next destination.
        </p>

        <div className="planet-map">
          {planets.map((item) => {
            const locked = item.id > progress.unlocked;

            return (
              <button
                key={item.id}
                className={`planet-card ${locked ? "locked" : ""}`}
                style={{ "--planet": item.color }}
                disabled={locked}
                onClick={() => goToPlanet(item.id)}
              >
                {locked ? (
                  <span>🔒</span>
                ) : (
                  <PlanetVisual
                    planet={item}
                    className="planet-art"
                  />
                )}

                <strong>{item.name}</strong>

                <small>
                  {locked
                    ? "Complete the previous planet"
                    : item.description}
                </small>
              </button>
            );
          })}
        </div>
      </main>
    );
  } else if (screen === "planet") {
    content = (
      <main className="planet-overview">
        <PlanetVisual
          planet={planet}
          className="planet-icon planet-art"
        />

        <p className="eyebrow">PLANET {planet.id}</p>

        <h1>Welcome to Planet {planet.name}</h1>

        <p>
          {planet.description}. You have {missionQuestions.length} stars
          to collect.
        </p>

        {action("Start mission", () => {
          playSound(blastoffSound);
          setScreen("mission");
        })}
      </main>
    );
  } else if (screen === "mission") {
    const journeyPercent =
      (progress.question / missionQuestions.length) * 100;

    content = (
      <main className="mission-panel">
        <div className="mission-status">
          <button
            className="text-button"
            onClick={() => setScreen("planet")}
          >
            ← Planet
          </button>

          <span>
            {planet.name} · Star {progress.question + 1} of{" "}
            {missionQuestions.length}
          </span>
        </div>

        <div
          className="journey-track"
          aria-label={`Traveling from ${planet.name} to ${nextPlanet.name}. ${progress.question} questions completed.`}
        >
          <PlanetVisual
            planet={planet}
            className="journey-planet planet-art"
          />

          <div className="journey-line">
            <b
              className="journey-rocket"
              style={{ left: `${journeyPercent}%` }}
            >
              🚀
            </b>
          </div>

          <PlanetVisual
            planet={nextPlanet}
            className="journey-planet planet-art"
          />
        </div>

        {planet.id === 5 ? (
          <>
            <p className="eyebrow">WHAT IS THIS?</p>

            <div className="reading-image-container">
              <img
                src={question.image}
                alt="Picture clue"
                className="reading-image"
              />
            </div>

            <div className="answer-grid">
              {options.map((word) => (
                <button
                  key={word}
                  className="word-button"
                  onClick={() => answer(word)}
                >
                  {word}
                </button>
              ))}
            </div>
          </>
        ) : planet.id === 6 ? (
          <>
            <p className="eyebrow">FILL IN THE MISSING LETTER</p>

            <div className="missing-word-target">
              {question.display}
            </div>

            <div className="answer-grid">
              {options.map((letter) => (
                <button
                  key={letter}
                  className="letter-button"
                  onClick={() => answer(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">
              {question.sound
                ? "LISTEN AND CHOOSE"
                : "FIND THE LETTER"}
            </p>

            {question.sound ? (
              <button
                className="sound-target"
                onClick={speak}
              >
                🔊 Hear the sound
              </button>
            ) : (
              <div className="target-letter">
                {question.target}
              </div>
            )}

            <div className="answer-grid">
              {options.map((letter) => (
                <button
                  key={letter}
                  className="letter-button"
                  onClick={() => answer(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          </>
        )}

        <p
          className="feedback"
          aria-live="polite"
        >
          {feedback}
        </p>
      </main>
    );
  } else if (screen === "celebration") {
    content = (
      <main className="celebration-panel">
        <span>🎉</span>

        <p className="eyebrow">MISSION COMPLETE</p>

        <h1>You did it, Captain!</h1>

        <p>
          You collected every star on {planet.name}.
        </p>

        {planet.id < planets.length
          ? action("Unlock next planet", unlockNext)
          : action(
              "Return to planet map",
              () => setScreen("map")
            )}
      </main>
    );
  } else if (screen === "unlock") {
    content = (
      <main className="unlock-panel">
        <PlanetVisual
          planet={nextPlanet}
          className="unlock-planet planet-art"
        />

        <p className="eyebrow">NEW DESTINATION</p>

        <h1>{nextPlanet.name} unlocked!</h1>

        <p>
          Your next mission is ready: {nextPlanet.description}.
        </p>

        {action(
          `Explore ${nextPlanet.name}`,
          () => setScreen("planet")
        )}
      </main>
    );
  } else {
    content = (
      <main className="settings-panel">
        <p className="eyebrow">MISSION CONTROL</p>

        <h1>Settings</h1>

        <label className="setting-row">
          Sound effects and spoken prompts

          <button
            className="toggle"
            aria-pressed={soundOn}
            onClick={() => setSoundOn((on) => !on)}
          >
            {soundOn ? "On" : "Off"}
          </button>
        </label>

        <button
          className="danger-button"
          onClick={resetProgress}
        >
          Reset game progress
        </button>
      </main>
    );
  }

  return (
    <div className="app">
      <AppNav
        onHome={() => setScreen("home")}
        onMap={() => setScreen("map")}
        onSettings={() => setScreen("settings")}
      />

      {content}
    </div>
  );
}

export default App;