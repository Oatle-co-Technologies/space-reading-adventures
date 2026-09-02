import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { questions } from "./data/questions";
import { lowercaseQuestions } from "./data/lowercaseQuestions";
import { matchingQuestions } from "./data/matchingQuestions";
import { phonicsQuestions } from "./data/phonicsQuestions";
import { readingQuestions } from "./data/readingQuestions";
import { sentenceQuestions } from "./data/sentenceQuestions";
import { missingLettersQuestions } from "./data/missingLettersQuestions";
import { generateOptions } from "./utils/generateOptions";
import { generateReadingOptions } from "./utils/generateReadingOptions";
import { generateSentenceOptions } from "./utils/generateSentenceOptions";
import { generateMissingLettersOptions } from "./utils/generateMissingLettersOptions";

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

import neptunePage1 from "./assets/images/story/neptune-page1.png";
import neptunePage2 from "./assets/images/story/neptune-page2.png";
import neptunePage3 from "./assets/images/story/neptune-page3.png";
import neptunePage4 from "./assets/images/story/neptune-page4.png";
import neptunePage5 from "./assets/images/story/neptune-page5.png";
import neptunePage6 from "./assets/images/story/neptune-page6.png";
import neptunePage7 from "./assets/images/story/neptune-page7.png";
import neptunePage8 from "./assets/images/story/neptune-page8.png";
import neptunePage9 from "./assets/images/story/neptune-page9.png";
import neptunePage10 from "./assets/images/story/neptune-page10.png";
import neptunePage11 from "./assets/images/story/neptune-page11.png";
import neptunePage12 from "./assets/images/story/neptune-page12.png";

const phonicsAudio = import.meta.glob("./sounds/*-sound.mp3", {
  eager: true,
  query: "?url",
  import: "default",
});

console.log(phonicsAudio);

const neptuneStory = [
  {
    image: neptunePage1,
    text: ["Atli is on Neptune."],
  },
  {
    image: neptunePage2,
    text: ["Atli has a red map."],
  },
  {
    image: neptunePage3,
    text: ["Atli has his bag."],
  },
  {
    image: neptunePage4,
    text: ["Atli lost his map."],
  },
  {
    image: neptunePage5,
    text: ["Atli looks in his bag."],
  },
  {
    image: neptunePage6,
    text: ["Atli looks on the rug."],
  },
  {
    image: neptunePage7,
    text: ["Atli sees a dog."],
  },
  {
    image: neptunePage8,
    text: ["The dog runs to the net."],
  },
  {
    image: neptunePage9,
    text: ["Atli finds his map under the net."],
  },
  {
    image: neptunePage10,
    text: ["Atli can go home."],
  },
  {
    image: neptunePage11,
    text: ["Atli is home with Mom and his brother."],
  },
  {
    image: neptunePage12,
    text: ["The stars will guide you home."],
  },
]

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
    questions: missingLettersQuestions,
  },
  {
    id: 7,
    name: "Uranus",
    image: uranusImage,
    color: "#76D8E8",
    description: "Build simple sentences",
    questions: sentenceQuestions,
  },
  {
    id: 8,
    name: "Neptune",
    image: neptuneImage,
    color: "#4C78FF",
    description: "Read Atli and the Lost Map",
    questions: neptuneStory,
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
  const [builtSentence, setBuiltSentence] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [revealedAnswer, setRevealedAnswer] = useState("");
  const promptAudio = useRef(null);
  const advanceTimer = useRef(null);

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

  // Neptune is a story, so its pages must stay in order.
  // All other planets continue to shuffle their questions.
  const missionQuestions = useMemo(
    () =>
      planet.id === 8
        ? planet.questions
        : shuffleArray(planet.questions),
    [planet.questions, planet.id]
  );

  const question =
    missionQuestions[progress.question] || missionQuestions[0];

  const recording = question?.sound
    ? phonicsAudio[
        `./sounds/${question.answer.toLowerCase()}-sound.mp3`
      ]
    : null;

  const options = useMemo(() => {
    if (!question || planet.id === 8) return [];

    if (planet.id === 5) {
      return generateReadingOptions(question.answer);
    }

    if (planet.id === 6) {
      return generateMissingLettersOptions(question.answer);
    }

    if (planet.id === 7) {
      return generateSentenceOptions(question.words);
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
    setBuiltSentence([]);
    setIsProcessing(false);
    setRevealedAnswer("");

    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
    }

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

  const previousStoryPage = () => {
    if (progress.question === 0) return;

    setProgress((current) => ({
      ...current,
      question: current.question - 1,
    }));
  };

  const nextStoryPage = () => {
    if (progress.question < missionQuestions.length - 1) {
      setProgress((current) => ({
        ...current,
        question: current.question + 1,
      }));

      return;
    }

    playSound(victorySound);
    setScreen("celebration");
  };

  const removeSentenceWord = (index) => {
    if (isProcessing) return;

    setBuiltSentence((current) =>
      current.filter((_, wordIndex) => wordIndex !== index)
    );

    setFeedback("");
  };

  const selectSentenceWord = (word) => {
    if (isProcessing || builtSentence.length >= question.words.length) return;

    const expectedWord = question.words[builtSentence.length];
    const correctWord = word === expectedWord;

    if (correctWord) {
      playSound(correctSound);
    } else {
      playSound(wrongSound);
    }

    const nextSentence = [...builtSentence, word];

    setBuiltSentence(nextSentence);
    setFeedback("");

    if (nextSentence.length !== question.words.length) {
      return;
    }

    const correct =
      nextSentence.every(
        (item, index) => item === question.words[index]
      );

    if (!correct) {
      return;
    }

    setIsProcessing(true);

    advanceTimer.current = setTimeout(() => {
      if (progress.question < missionQuestions.length - 1) {
        setProgress((current) => ({
          ...current,
          question: current.question + 1,
        }));

        setBuiltSentence([]);
        setFeedback("");
        setIsProcessing(false);

        return;
      }

      playSound(victorySound);
      setScreen("celebration");
      setIsProcessing(false);
    }, 3000);
  };

  const answer = (selectedAnswer) => {
    if (isProcessing) return;

    if (selectedAnswer !== question.answer) {
      playSound(wrongSound);

      if (planet.id === 6) {
        setFeedback("");
      } else {
        setFeedback("Almost! Try another star.");
      }

      return;
    }

    setFeedback("");
    playSound(correctSound);

    // Saturn is the only regular answer mission that needs a
    // 3-second pause so the child can read the completed word.
    if (planet.id === 6) {
      setIsProcessing(true);
      setRevealedAnswer(selectedAnswer);

      advanceTimer.current = setTimeout(() => {
        if (progress.question < missionQuestions.length - 1) {
          setProgress((current) => ({
            ...current,
            question: current.question + 1,
          }));

          setRevealedAnswer("");
          setIsProcessing(false);

          return;
        }

        playSound(victorySound);
        setScreen("celebration");
        setIsProcessing(false);
      }, 3000);

      return;
    }

    // Mercury through Jupiter advance immediately.
    // Uranus has its own 3-second delay in selectSentenceWord().
    if (progress.question < missionQuestions.length - 1) {
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
          {planet.id === 8
            ? `${planet.description}. Turn the pages and read the story.`
            : `${planet.description}. You have ${missionQuestions.length} stars to collect.`}
        </p>

        {action(
          planet.id === 8 ? "Read story" : "Start mission",
          () => {
            playSound(blastoffSound);
            setBuiltSentence([]);
            setFeedback("");
            setIsProcessing(false);
            setRevealedAnswer("");
            setScreen("mission");
          }
        )}
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
            {planet.name} · {planet.id === 8 ? "Page" : "Star"}{" "}
            {progress.question + 1} of {missionQuestions.length}
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

        {planet.id === 8 ? (
          <>
            <p className="eyebrow">ATLI AND THE LOST MAP</p>

            <div className="story-book">
              <div
                className="story-page"
                style={{
                  minHeight: "540px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="story-page-number">
                  Page {progress.question + 1} of {missionQuestions.length}
                </div>

                <div
                  className="story-image-container"
                  style={{
                    width: "100%",
                    height: "300px",
                    margin: "0 auto 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={question.image}
                    alt=""
                    className="story-image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div
                  className="story-text"
                  style={{
                    minHeight: "85px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {question.text.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="story-controls">
              <button
                className="secondary-button story-button"
                onClick={previousStoryPage}
                disabled={progress.question === 0}
              >
                ← Back
              </button>

              <button
                className="primary-button story-button"
                onClick={nextStoryPage}
              >
                {progress.question === missionQuestions.length - 1
                  ? "Finish Book 🚀"
                  : "Next Page →"}
              </button>
            </div>
          </>
        ) : planet.id === 5 ? (
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
                  disabled={isProcessing}
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
              {revealedAnswer
                ? question.word
                : question.display}
            </div>

            <div className="answer-grid">
              {options.map((letter) => (
                <button
                  key={letter}
                  className="letter-button"
                  onClick={() => answer(letter)}
                  disabled={isProcessing}
                >
                  {letter}
                </button>
              ))}
            </div>
          </>
        ) : planet.id === 7 ? (
          <>
            <p className="eyebrow">BUILD THE SENTENCE</p>

            <div className="sentence-target" aria-live="polite">
              {builtSentence.length > 0 ? (
                <>
                  {builtSentence.map((word, index) => (
                    <button
                      key={`${word}-${index}`}
                      className="sentence-word"
                      onClick={() => removeSentenceWord(index)}
                      disabled={isProcessing}
                      aria-label={`Remove ${word}`}
                      type="button"
                    >
                      {word}
                    </button>
                  ))}

                  <span className="sentence-hint">
                    Tap a word to remove it.
                  </span>
                </>
              ) : (
                <span className="sentence-placeholder">
                  Tap the words in the right order
                </span>
              )}
            </div>

            <div className="answer-grid sentence-options">
              {options.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  className="word-button"
                  onClick={() => selectSentenceWord(word)}
                  disabled={
                    isProcessing ||
                    builtSentence.includes(word)
                  }
                >
                  {word}
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
                  disabled={isProcessing}
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
          {planet.id === 8
            ? "You finished Atli and the Lost Map!"
            : `You collected every star on ${planet.name}.`}
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

        <h1>Welcome to Planet {nextPlanet.name}</h1>

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