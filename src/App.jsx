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

import MathSection from "./components/MathSection";
import Scribbler from "./components/Scribbler";
import AlphabetTracingMission from "./components/AlphabetTracingMission";
import NumberTracingMission from "./components/NumberTracingMission";
import ShapeTracingMission from "./components/ShapeTracingMission";
import SentenceWritingMission from "./components/SentenceWritingMission";

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
];

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
    description: "Complete the final skills assessment",
    questions: "pluto-assessment",
  },
];

const plutoSkills = [
  { id: "capital", name: "Capital letters" },
  { id: "lowercase", name: "Lowercase letters" },
  { id: "matching", name: "Upper/lowercase matching" },
  { id: "phonics", name: "Letter sounds / phonics" },
  { id: "reading", name: "Reading simple words" },
  { id: "missing", name: "Missing letters" },
  { id: "sentences", name: "Building simple sentences" },
];

const plutoQuestions = [
  ...questions.slice(0, 4).map((question) => ({
    ...question,
    skill: "capital",
    type: "letters",
  })),

  ...lowercaseQuestions.slice(0, 4).map((question) => ({
    ...question,
    skill: "lowercase",
    type: "letters",
  })),

  ...matchingQuestions.slice(0, 4).map((question) => ({
    ...question,
    skill: "matching",
    type: "letters",
  })),

  ...phonicsQuestions.slice(0, 4).map((question) => ({
    ...question,
    skill: "phonics",
    type: "phonics",
  })),

  ...readingQuestions.slice(0, 4).map((question) => ({
    ...question,
    skill: "reading",
    type: "reading",
  })),

  ...missingLettersQuestions.slice(0, 4).map((question) => ({
    ...question,
    skill: "missing",
    type: "missing",
  })),

  ...sentenceQuestions.slice(0, 4).map((question) => ({
    ...question,
    skill: "sentences",
    type: "sentences",
  })),
];

const emptyPlutoResults = () =>
  Object.fromEntries(
    plutoSkills.map((skill) => [
      skill.id,
      {
        correct: 0,
        total: 4,
      },
    ])
  );

const savedAssessmentResults = () => {
  try {
    return (
      JSON.parse(
        localStorage.getItem("atli-space-assessment-results")
      ) || null
    );
  } catch {
    return null;
  }
};

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

const savedWritingProgress = () => {
  try {
    return (
      JSON.parse(
        localStorage.getItem("atli-writing-progress")
      ) || {
        unlocked: 1,
      }
    );
  } catch {
    return {
      unlocked: 1,
    };
  }
};

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 10.5 12 3l9 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M5.5 9.5V21h13V9.5M9 21v-6h6v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlanetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12"
        cy="12"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(-20 12 12)"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="m19.4 15.2 1.2 1-.2 1.2-1.8 1.8-1.2.2-1-1.2-1.6.7-.2 1.5-1 .8h-2.6l-1-.8-.2-1.5-1.6-.7-1 1.2-1.2-.2-1.8-1.8-.2-1.2 1.2-1-.7-1.6-1.5-.2-.8-1V9.8l.8-1 1.5-.2.7-1.6-1.2-1 .2-1.2L6 3l1.2-.2 1 1.2 1.6-.7.2-1.5 1-.8h2.6l1 .8.2 1.5 1.6.7 1-1.2L19 3l1.8 1.8.2 1.2-1.2 1 .7 1.6 1.5.2.8 1v2.6l-.8 1-1.5.2-.7 1.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NumberIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="currentColor"
      >
        123
      </text>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 5.5c2.8-.8 5.5-.2 8 1.5v12c-2.5-1.7-5.2-2.3-8-1.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M20 5.5c-2.8-.8-5.5-.2-8 1.5v12c2.5-1.7 5.2-2.3-8-1.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m15.5 5.5 3 3L8 19H5v-3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="m14 7 3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AppNav({
  onHome,
  onExplore,
  onSettings,
  activeScreen,
}) {
  const items = [
    {
      label: "Home",
      action: onHome,
      icon: <HomeIcon />,
      active: activeScreen === "home",
    },
    {
      label: "Explore",
      action: onExplore,
      icon: <PlanetIcon />,
      active:
        activeScreen === "explore" ||
        activeScreen === "map" ||
        activeScreen === "planet" ||
        activeScreen === "mission" ||
        activeScreen === "launch" ||
        activeScreen === "math" ||
        activeScreen === "writing" ||
        activeScreen === "writingMap" ||
        activeScreen === "scribbler" ||
        activeScreen === "writingMission1" ||
        activeScreen === "writingMission2" ||
        activeScreen === "writingMission3" ||
        activeScreen === "writingMission4",
    },
    {
      label: "Settings",
      action: onSettings,
      icon: <SettingsIcon />,
      active: activeScreen === "settings",
    },
  ];

  return (
    <nav
      className="bottom-nav"
      aria-label="Main navigation"
    >
      {items.map((item) => (
        <button
          key={item.label}
          className={`bottom-nav-item ${
            item.active ? "active" : ""
          }`}
          onClick={item.action}
          type="button"
          aria-label={item.label}
          aria-current={
            item.active ? "page" : undefined
          }
        >
          <span className="bottom-nav-icon">
            {item.icon}
          </span>

          <span className="bottom-nav-label">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

function PlanetVisual({
  planet,
  className = "",
}) {
  return planet.image ? (
    <img
      className={className}
      src={planet.image}
      alt={planet.name}
    />
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

  const [writingProgress, setWritingProgress] =
    useState(savedWritingProgress);

  const [screen, setScreen] = useState("home");

  const [assessmentResults, setAssessmentResults] =
    useState(savedAssessmentResults);

  const [assessmentScores, setAssessmentScores] =
    useState(emptyPlutoResults);

  const [soundOn, setSoundOn] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [builtSentence, setBuiltSentence] =
    useState([]);
  const [isProcessing, setIsProcessing] =
    useState(false);
  const [revealedAnswer, setRevealedAnswer] =
    useState("");

  const advanceTimer = useRef(null);

  const planet =
    planets.find(
      (item) => item.id === progress.activePlanet
    ) || planets[0];

  const missionQuestions = useMemo(
    () =>
      planet.id === 8
        ? planet.questions
        : planet.id === 9
          ? shuffleArray(plutoQuestions)
          : shuffleArray(planet.questions),
    [planet.id, planet.questions]
  );

  const question =
    missionQuestions[progress.question] ||
    missionQuestions[0];

  const options = useMemo(() => {
    if (!question || planet.id === 8) {
      return [];
    }

    if (
      planet.id === 5 ||
      question.type === "reading"
    ) {
      return generateReadingOptions(
        question.answer
      );
    }

    if (
      planet.id === 6 ||
      question.type === "missing"
    ) {
      return generateMissingLettersOptions(
        question.answer
      );
    }

    if (
      planet.id === 7 ||
      question.type === "sentences"
    ) {
      return generateSentenceOptions(
        question.words
      );
    }

    return generateOptions(question.answer);
  }, [question, planet.id]);

  useEffect(() => {
    localStorage.setItem(
      "atli-space-progress",
      JSON.stringify(progress)
    );
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(
      "atli-writing-progress",
      JSON.stringify(writingProgress)
    );
  }, [writingProgress]);

  useEffect(() => {
    if (assessmentResults) {
      localStorage.setItem(
        "atli-space-assessment-results",
        JSON.stringify(assessmentResults)
      );
    }
  }, [assessmentResults]);

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

    if (id === 9) {
      setAssessmentScores(
        emptyPlutoResults()
      );
    }

    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
    }

    setScreen("planet");
  };

  const startPlutoAssessment = () => {
    setProgress((current) => ({
      ...current,
      question: 0,
    }));

    setAssessmentScores(
      emptyPlutoResults()
    );

    setBuiltSentence([]);
    setFeedback("");
    setIsProcessing(false);
    setRevealedAnswer("");
    setScreen("mission");
  };

  const savePlutoAnswer = (isCorrect) => {
    const nextScores = {
      ...assessmentScores,
      [question.skill]: {
        ...assessmentScores[question.skill],
        correct:
          assessmentScores[question.skill].correct +
          (isCorrect ? 1 : 0),
      },
    };

    setAssessmentScores(nextScores);

    return nextScores;
  };

  const finishPlutoAssessment = (scores) => {
    setAssessmentResults(scores);
    playSound(victorySound);
    setScreen("celebration");
  };

  const previousStoryPage = () => {
    if (progress.question === 0) {
      return;
    }

    setProgress((current) => ({
      ...current,
      question: current.question - 1,
    }));
  };

  const nextStoryPage = () => {
    if (
      progress.question <
      missionQuestions.length - 1
    ) {
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
    if (isProcessing) {
      return;
    }

    setBuiltSentence((current) =>
      current.filter(
        (_, wordIndex) =>
          wordIndex !== index
      )
    );

    setFeedback("");
  };

  const selectSentenceWord = (word) => {
    if (
      isProcessing ||
      builtSentence.length >=
        question.words.length
    ) {
      return;
    }

    const expectedWord =
      question.words[
        builtSentence.length
      ];

    const correctWord =
      word === expectedWord;

    if (correctWord) {
      playSound(correctSound);
    } else {
      playSound(wrongSound);
    }

    const nextSentence = [
      ...builtSentence,
      word,
    ];

    setBuiltSentence(nextSentence);
    setFeedback("");

    if (
      nextSentence.length !==
      question.words.length
    ) {
      return;
    }

    const correct = nextSentence.every(
      (item, index) =>
        item === question.words[index]
    );

    if (!correct) {
      return;
    }

    const nextScores =
      planet.id === 9
        ? savePlutoAnswer(true)
        : null;

    setIsProcessing(true);

    advanceTimer.current = setTimeout(() => {
      if (
        progress.question <
        missionQuestions.length - 1
      ) {
        setProgress((current) => ({
          ...current,
          question: current.question + 1,
        }));

        setBuiltSentence([]);
        setFeedback("");
        setIsProcessing(false);

        return;
      }

      if (planet.id === 9) {
        finishPlutoAssessment(
          nextScores
        );
      } else {
        playSound(victorySound);
        setScreen("celebration");
      }

      setIsProcessing(false);
    }, 3000);
  };

  const answer = (selectedAnswer) => {
    if (isProcessing) {
      return;
    }

    if (
      selectedAnswer !== question.answer
    ) {
      playSound(wrongSound);

      if (planet.id === 6) {
        setFeedback("");
      } else {
        setFeedback(
          "Almost! Try another star."
        );
      }

      return;
    }

    setFeedback("");
    playSound(correctSound);

    const nextScores =
      planet.id === 9
        ? savePlutoAnswer(true)
        : null;

    if (
      planet.id === 6 ||
      question.type === "reading"
    ) {
      setIsProcessing(true);
      setRevealedAnswer(
        selectedAnswer
      );

      advanceTimer.current = setTimeout(() => {
        if (
          progress.question <
          missionQuestions.length - 1
        ) {
          setProgress((current) => ({
            ...current,
            question:
              current.question + 1,
          }));

          setRevealedAnswer("");
          setIsProcessing(false);

          return;
        }

        if (planet.id === 9) {
          finishPlutoAssessment(
            nextScores
          );
        } else {
          playSound(victorySound);
          setScreen("celebration");
        }

        setIsProcessing(false);
      }, 3000);

      return;
    }

    if (
      progress.question <
      missionQuestions.length - 1
    ) {
      setProgress((current) => ({
        ...current,
        question: current.question + 1,
      }));

      return;
    }

    if (planet.id === 9) {
      finishPlutoAssessment(
        nextScores
      );
    } else {
      playSound(victorySound);
      setScreen("celebration");
    }
  };

  // Writing missions:
  // 1 = Alphabet
  // 2 = Numbers
  // 3 = Shapes
  // 4 = Sentences
  const completeWritingMission = (
    missionId
  ) => {
    const nextMission = missionId + 1;

    setWritingProgress((current) => ({
      ...current,
      unlocked: Math.max(
        current.unlocked,
        nextMission
      ),
    }));

    setScreen("writingMap");
  };

  const unlockNext = () => {
    const nextPlanetId =
      planet.id + 1;

    const unlockedPlanet =
      planets.find(
        (item) =>
          item.id === nextPlanetId
      );

    if (
      nextPlanetId >
      planets.length
    ) {
      setScreen("map");
      return;
    }

    playSound(blastoffSound);

    setProgress((current) => ({
      ...current,
      unlocked: Math.max(
        current.unlocked,
        nextPlanetId
      ),
      activePlanet: nextPlanetId,
      question: 0,
    }));

    setScreen(
      unlockedPlanet
        ? "planet"
        : "map"
    );
  };

  const resetProgress = () => {
    setProgress({
      unlocked: 1,
      activePlanet: 1,
      question: 0,
    });

    setWritingProgress({
      unlocked: 1,
    });

    setScreen("home");
  };

  const action = (
    label,
    handler,
    className = "primary-button"
  ) => (
    <button
      className={className}
      onClick={handler}
      type="button"
    >
      {label}
    </button>
  );

  let content;

  if (screen === "explore") {
    content = (
      <main className="page adventure-hub">
        <p className="eyebrow">
          LET'S EXPLORE
        </p>

        <h1>
          What shall we explore?
        </h1>

        <p className="page-intro">
          Pick an adventure and
          let's go!
        </p>

        <div className="adventure-grid">
          <button
            className="adventure-card"
            onClick={() => {
              playSound(blastoffSound);
              setScreen("launch");
            }}
            type="button"
          >
            <span className="adventure-card-icon">
              <BookIcon />
            </span>

            <strong>
              Reading
            </strong>
          </button>

          <button
            className="adventure-card"
            onClick={() =>
              setScreen("math")
            }
            type="button"
          >
            <span className="adventure-card-icon">
              <NumberIcon />
            </span>

            <strong>
              Counting
            </strong>
          </button>

          <button
            className="adventure-card"
            onClick={() =>
              setScreen("writingMap")
            }
            type="button"
          >
            <span className="adventure-card-icon">
              <PencilIcon />
            </span>

            <strong>
              Writing
            </strong>
          </button>
        </div>
      </main>
    );
  } else if (
    screen === "writingMap"
  ) {
    content = (
      <main className="page writing-map-page">
        <p className="eyebrow">
          YOUR JOURNEY
        </p>

        <h1>
          Writing Map
        </h1>

        <p className="page-intro">
          Choose a writing adventure
          and explore at your own pace.
        </p>

        <div className="planet-map writing-map">
          {/* SCRIBBLER */}
          <button
            className="planet-card writing-map-free"
            type="button"
            onClick={() =>
              setScreen("scribbler")
            }
          >
            <span className="writing-map-icon">
              ✏️
            </span>

            <strong>
              Scribbler
            </strong>

            <small>
              Write, draw and explore
              freely.
            </small>
          </button>

          {/* MISSION 1 */}
          <button
            className={`planet-card ${
              writingProgress.unlocked >= 1
                ? "writing-map-active"
                : "writing-map-locked"
            }`}
            type="button"
            onClick={() =>
              setScreen("writingMission1")
            }
            disabled={
              writingProgress.unlocked < 1
            }
          >
            <span className="writing-map-icon">
              🔤
            </span>

            <strong>
              Trace the Alphabet
            </strong>

            <small>
              Trace A to Z.
            </small>
          </button>

          {/* MISSION 2 */}
          <button
            className={`planet-card ${
              writingProgress.unlocked >= 2
                ? "writing-map-active"
                : "writing-map-locked"
            }`}
            type="button"
            onClick={() =>
              setScreen("writingMission2")
            }
            disabled={
              writingProgress.unlocked < 2
            }
          >
            {writingProgress.unlocked >= 2 ? (
              <span className="writing-map-icon">
                123
              </span>
            ) : (
              <span className="writing-map-lock">
                🔒
              </span>
            )}

            <strong>
              Trace the Numbers
            </strong>

            <small>
              {writingProgress.unlocked >=
              2
                ? "Trace 0 to 20."
                : "Complete the previous mission."}
            </small>
          </button>

          {/* MISSION 3 */}
          <button
            className={`planet-card ${
              writingProgress.unlocked >= 3
                ? "writing-map-active"
                : "writing-map-locked"
            }`}
            type="button"
            onClick={() =>
              setScreen("writingMission3")
            }
            disabled={
              writingProgress.unlocked < 3
            }
          >
            {writingProgress.unlocked >= 3 ? (
              <span className="writing-map-icon">
                △
              </span>
            ) : (
              <span className="writing-map-lock">
                🔒
              </span>
            )}

            <strong>
              Trace the Shapes
            </strong>

            <small>
              {writingProgress.unlocked >=
              3
                ? "Trace simple shapes."
                : "Complete the previous mission."}
            </small>
          </button>

          {/* MISSION 4 */}
          <button
            className={`planet-card ${
              writingProgress.unlocked >= 4
                ? "writing-map-active"
                : "writing-map-locked"
            }`}
            type="button"
            onClick={() =>
              setScreen("writingMission4")
            }
            disabled={
              writingProgress.unlocked < 4
            }
          >
            {writingProgress.unlocked >= 4 ? (
              <span className="writing-map-icon">
                ✍️
              </span>
            ) : (
              <span className="writing-map-lock">
                🔒
              </span>
            )}

            <strong>
              Write Sentences
            </strong>

            <small>
              {writingProgress.unlocked >=
              4
                ? "Write your own sentences."
                : "Complete the previous mission."}
            </small>
          </button>
        </div>
      </main>
    );
  } else if (
    screen === "scribbler"
  ) {
    content = (
      <Scribbler
        onBack={() =>
          setScreen("writingMap")
        }
      />
    );
  } else if (
    screen === "writingMission1"
  ) {
    content = (
      <AlphabetTracingMission
        onBack={() =>
          setScreen("writingMap")
        }
        onComplete={() =>
          completeWritingMission(1)
        }
      />
    );
  } else if (
    screen === "writingMission2"
  ) {
    content = (
      <NumberTracingMission
        onBack={() =>
          setScreen("writingMap")
        }
        onComplete={() =>
          completeWritingMission(2)
        }
      />
    );
  } else if (
    screen === "writingMission3"
  ) {
    content = (
      <ShapeTracingMission
        onBack={() =>
          setScreen("writingMap")
        }
        onComplete={() =>
          completeWritingMission(3)
        }
      />
    );
  } else if (
    screen === "writingMission4"
  ) {
    content = (
      <SentenceWritingMission
        onBack={() =>
          setScreen("writingMap")
        }
        onComplete={() =>
          completeWritingMission(4)
        }
      />
    );
  } else if (
    screen === "home"
  ) {
    content = (
      <main className="hero-panel">
        <span className="hero-rocket">
          🚀
        </span>

        <p className="eyebrow">
          WELCOME, CAPTAIN
        </p>

        <h1>
          Ready for a stellar
          adventure?
        </h1>

        <p>
          Explore learning
          adventures across
          letters, reading,
          maths, and the
          planets.
        </p>

        <div className="button-row">
          {action(
            "Explore",
            () =>
              setScreen("explore")
          )}

          {assessmentResults &&
            action(
              "Parent Results",
              () =>
                setScreen("results"),
              "secondary-button"
            )}
        </div>
      </main>
    );
  } else if (
    screen === "math"
  ) {
    content = (
      <MathSection
        onHome={() =>
          setScreen("home")
        }
        soundOn={soundOn}
      />
    );
  } else if (
    screen === "launch"
  ) {
    content = (
      <main className="launch-panel">
        <div className="countdown-orbit">
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <b>🚀</b>
        </div>

        <p className="eyebrow">
          MISSION CONTROL
        </p>

        <h1>
          Launch sequence ready!
        </h1>

        <p>
          Choose a planet to begin
          your next learning mission.
        </p>

        {action(
          "View planet map",
          () =>
            setScreen("map")
        )}
      </main>
    );
  } else if (
    screen === "map"
  ) {
    content = (
      <main className="page">
        <p className="eyebrow">
          YOUR JOURNEY
        </p>

        <h1>
          Planet Map
        </h1>

        <p className="page-intro">
          Complete each planet to
          unlock the next destination.
        </p>

        <div className="planet-map">
          {planets.map((item) => {
            const locked =
              item.id >
              progress.unlocked;

            return (
              <button
                key={item.id}
                className={`planet-card ${
                  locked
                    ? "locked"
                    : ""
                }`}
                style={{
                  "--planet":
                    item.color,
                }}
                disabled={locked}
                onClick={() =>
                  goToPlanet(
                    item.id
                  )
                }
                type="button"
              >
                {locked ? (
                  <span>
                    🔒
                  </span>
                ) : (
                  <PlanetVisual
                    planet={item}
                    className="planet-art"
                  />
                )}

                <strong>
                  {item.name}
                </strong>

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
  } else if (
    screen === "planet"
  ) {
    content = (
      <main className="planet-overview">
        <PlanetVisual
          planet={planet}
          className="planet-icon planet-art"
        />

        <p className="eyebrow">
          PLANET {planet.id}
        </p>

        <h1>
          Welcome to Planet{" "}
          {planet.name}
        </h1>

        <p>
          {planet.id === 8
            ? `${planet.description}. Turn the pages and read the story.`
            : `${planet.description}. You have ${missionQuestions.length} stars to collect.`}
        </p>

        {action(
          planet.id === 8
            ? "Read story"
            : planet.id === 9
              ? "Start assessment"
              : "Start mission",
          () => {
            playSound(
              blastoffSound
            );

            if (planet.id === 9) {
              startPlutoAssessment();
            } else {
              setBuiltSentence([]);
              setFeedback("");
              setIsProcessing(false);
              setRevealedAnswer("");
              setScreen("mission");
            }
          }
        )}
      </main>
    );
  } else if (
    screen === "mission"
  ) {
    const journeyPercent =
      (progress.question /
        missionQuestions.length) *
      100;

    content = (
      <main className="mission-panel">
        <div className="mission-status">
          <button
            className="text-button"
            onClick={() =>
              setScreen("planet")
            }
            type="button"
          >
            ← Planet
          </button>

          <span>
            {planet.name} ·{" "}
            {planet.id === 8
              ? "Page"
              : planet.id === 9
                ? "Question"
                : "Star"}{" "}
            {progress.question +
              1}{" "}
            of{" "}
            {missionQuestions.length}
          </span>
        </div>

        <div
          className="journey-track"
          aria-label={`Currently on ${planet.name}. ${progress.question} questions completed.`}
        >
          <PlanetVisual
            planet={planet}
            className="journey-planet planet-art"
          />

          <div className="journey-line">
            <b
              className="journey-rocket"
              style={{
                left: `${journeyPercent}%`,
              }}
            >
              🚀
            </b>
          </div>
        </div>

        {planet.id === 8 ? (
          <>
            <p className="eyebrow">
              ATLI AND THE LOST MAP
            </p>

            <div className="story-book">
              <div
                className="story-page"
                style={{
                  minHeight: "540px",
                  display: "flex",
                  flexDirection:
                    "column",
                }}
              >
                <div className="story-page-number">
                  Page{" "}
                  {progress.question +
                    1}{" "}
                  of{" "}
                  {missionQuestions.length}
                </div>

                <div
                  className="story-image-container"
                  style={{
                    width: "100%",
                    height: "300px",
                    margin:
                      "0 auto 14px",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                  }}
                >
                  <img
                    src={
                      question.image
                    }
                    alt=""
                    className="story-image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit:
                        "contain",
                    }}
                  />
                </div>

                <div
                  className="story-text"
                  style={{
                    minHeight: "85px",
                    display: "flex",
                    flexDirection:
                      "column",
                    justifyContent:
                      "center",
                  }}
                >
                  {question.text.map(
                    (
                      line,
                      index
                    ) => (
                      <p key={index}>
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="story-controls">
              <button
                className="secondary-button story-button"
                onClick={
                  previousStoryPage
                }
                disabled={
                  progress.question ===
                  0
                }
                type="button"
              >
                ← Back
              </button>

              <button
                className="primary-button story-button"
                onClick={
                  nextStoryPage
                }
                type="button"
              >
                {progress.question ===
                missionQuestions.length -
                  1
                  ? "Finish Book 🚀"
                  : "Next Page →"}
              </button>
            </div>
          </>
        ) : planet.id === 5 ||
          question.type ===
            "reading" ? (
          <>
            <p className="eyebrow">
              WHAT IS THIS?
            </p>

            <div className="reading-image-container">
              <img
                src={
                  question.image
                }
                alt="Picture clue"
                className="reading-image"
              />
            </div>

            <div className="answer-grid">
              {options.map(
                (word) => (
                  <button
                    key={word}
                    className="word-button"
                    onClick={() =>
                      answer(word)
                    }
                    disabled={
                      isProcessing
                    }
                    type="button"
                  >
                    {word}
                  </button>
                )
              )}
            </div>
          </>
        ) : planet.id === 6 ||
          question.type ===
            "missing" ? (
          <>
            <p className="eyebrow">
              FILL IN THE MISSING LETTER
            </p>

            <div className="missing-word-target">
              {revealedAnswer
                ? question.word
                : question.display}
            </div>

            <div className="answer-grid">
              {options.map(
                (letter) => (
                  <button
                    key={letter}
                    className="letter-button"
                    onClick={() =>
                      answer(letter)
                    }
                    disabled={
                      isProcessing
                    }
                    type="button"
                  >
                    {letter}
                  </button>
                )
              )}
            </div>
          </>
        ) : planet.id === 7 ||
          question.type ===
            "sentences" ? (
          <>
            <p className="eyebrow">
              BUILD THE SENTENCE
            </p>

            <div
              className="sentence-target"
              aria-live="polite"
            >
              {builtSentence.length >
              0 ? (
                <>
                  {builtSentence.map(
                    (
                      word,
                      index
                    ) => (
                      <button
                        key={`${word}-${index}`}
                        className="sentence-word"
                        onClick={() =>
                          removeSentenceWord(
                            index
                          )
                        }
                        disabled={
                          isProcessing
                        }
                        aria-label={`Remove ${word}`}
                        type="button"
                      >
                        {word}
                      </button>
                    )
                  )}

                  <span className="sentence-hint">
                    Tap a word to remove
                    it.
                  </span>
                </>
              ) : (
                <span className="sentence-placeholder">
                  Tap the words in the
                  right order
                </span>
              )}
            </div>

            <div className="answer-grid sentence-options">
              {options.map(
                (
                  word,
                  index
                ) => (
                  <button
                    key={`${word}-${index}`}
                    className="word-button"
                    onClick={() =>
                      selectSentenceWord(
                        word
                      )
                    }
                    disabled={
                      isProcessing ||
                      builtSentence.includes(
                        word
                      )
                    }
                    type="button"
                  >
                    {word}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">
              {question.soundText
                ? "LISTEN AND CHOOSE"
                : "FIND THE LETTER"}
            </p>

            {question.soundText ? (
              <button
                className="sound-target"
                type="button"
                disabled
              >
                🔊 Hear the sound
              </button>
            ) : (
              <div className="target-letter">
                {question.target}
              </div>
            )}

            <div className="answer-grid">
              {options.map(
                (letter) => (
                  <button
                    key={letter}
                    className="letter-button"
                    onClick={() =>
                      answer(letter)
                    }
                    disabled={
                      isProcessing
                    }
                    type="button"
                  >
                    {letter}
                  </button>
                )
              )}
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
  } else if (
    screen === "celebration"
  ) {
    content = (
      <main className="celebration-panel">
        <span>🎉</span>

        <p className="eyebrow">
          MISSION COMPLETE
        </p>

        <h1>
          You did it, Captain!
        </h1>

        <p>
          {planet.id === 8
            ? "You finished Atli and the Lost Map!"
            : planet.id === 9
              ? "You finished the final Pluto assessment!"
              : `You collected every star on ${planet.name}.`}
        </p>

        {planet.id === 9
          ? action(
              "See Parent Results",
              () =>
                setScreen(
                  "results"
                )
            )
          : planet.id <
              planets.length
            ? action(
                "Unlock next planet",
                unlockNext
              )
            : action(
                "Return to planet map",
                () =>
                  setScreen("map")
              )}
      </main>
    );
  } else if (
    screen === "results"
  ) {
    const resultEntries =
      plutoSkills.map(
        (skill) => {
          const result =
            assessmentResults?.[
              skill.id
            ] || {
              correct: 0,
              total: 4,
            };

          const percentage =
            Math.round(
              (result.correct /
                result.total) *
                100
            );

          const status =
            percentage >= 90
              ? "Strong"
              : percentage >= 70
                ? "Developing"
                : "Keep Practicing";

          return {
            ...skill,
            ...result,
            percentage,
            status,
          };
        }
      );

    const overallCorrect =
      resultEntries.reduce(
        (
          total,
          result
        ) =>
          total +
          result.correct,
        0
      );

    const overallTotal =
      resultEntries.reduce(
        (
          total,
          result
        ) =>
          total +
          result.total,
        0
      );

    const doingWell =
      resultEntries.filter(
        (result) =>
          result.percentage >= 70
      );

    const keepPracticing =
      resultEntries.filter(
        (result) =>
          result.percentage < 70
      );

    content = (
      <main className="page results-page">
        <p className="eyebrow">
          ATLI SPACE GAME
        </p>

        <h1>
          Parent Results
        </h1>

        <p className="page-intro">
          Results from the final Pluto
          assessment in Atli Space Game.
        </p>

        <div className="result-summary">
          <h2>
            Overall score
          </h2>

          <strong>
            {overallCorrect}/
            {overallTotal}
          </strong>

          <span>
            {Math.round(
              (overallCorrect /
                overallTotal) *
                100
            )}
            %
          </span>
        </div>

        <div className="result-list">
          {resultEntries.map(
            (result) => (
              <div
                className="result-row"
                key={result.id}
              >
                <strong>
                  {result.name}
                </strong>

                <span>
                  {result.correct}/
                  {result.total}
                </span>

                <span>
                  {result.percentage}%
                </span>

                <span>
                  {result.status}
                </span>
              </div>
            )
          )}
        </div>

        <div className="result-columns">
          <section>
            <h2>
              Doing well
            </h2>

            <p>
              {doingWell.length >
              0
                ? doingWell
                    .map(
                      (
                        result
                      ) =>
                        result.name
                    )
                    .join(", ")
                : "Keep exploring each skill."}
            </p>
          </section>

          <section>
            <h2>
              Keep practicing
            </h2>

            <p>
              {keepPracticing.length >
              0
                ? keepPracticing
                    .map(
                      (
                        result
                      ) =>
                        result.name
                    )
                    .join(", ")
                : "No skills to list."}
            </p>
          </section>
        </div>

        {action(
          "Return home",
          () =>
            setScreen("home"),
          "secondary-button"
        )}
      </main>
    );
  } else {
    content = (
      <main className="settings-panel">
        <p className="eyebrow">
          MISSION CONTROL
        </p>

        <h1>
          Settings
        </h1>

        <label className="setting-row">
          Sound effects and spoken
          prompts

          <button
            className="toggle"
            aria-pressed={soundOn}
            onClick={() =>
              setSoundOn(
                (on) => !on
              )
            }
            type="button"
          >
            {soundOn
              ? "On"
              : "Off"}
          </button>
        </label>

        <button
          className="danger-button"
          onClick={
            resetProgress
          }
          type="button"
        >
          Reset game progress
        </button>
      </main>
    );
  }

  return (
    <div className="app">
      {content}

      {screen !==
        "scribbler" && (
        <AppNav
          onHome={() =>
            setScreen("home")
          }
          onExplore={() =>
            setScreen("explore")
          }
          onSettings={() =>
            setScreen("settings")
          }
          activeScreen={screen}
        />
      )}
    </div>
  );
}

export default App;