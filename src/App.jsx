import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { questions } from "./data/questions";
import { lowercaseQuestions } from "./data/lowercaseQuestions";
import { matchingQuestions } from "./data/matchingQuestions";
import { phonicsQuestions } from "./data/phonicsQuestions";
import { generateOptions } from "./utils/generateOptions";
import mercuryImage from "./assets/mercury.png";
import venusImage from "./assets/venus.png";
import earthImage from "./assets/earth.png";
import marsImage from "./assets/mars.png";
import correctSound from "./sounds/correct.mp3";
import wrongSound from "./sounds/wrong.mp3";
import victorySound from "./sounds/victory.mp3";
import blastoffSound from "./sounds/blastoff.mp3";

const planets = [
  { id: 1, name: "Mercury", image: mercuryImage, color: "#ffbd59", description: "Learn capital letters", questions },
  { id: 2, name: "Venus", image: venusImage, color: "#ff8d70", description: "Explore lowercase letters", questions: lowercaseQuestions },
  { id: 3, name: "Earth", image: earthImage, color: "#55c6ff", description: "Match upper and lowercase", questions: matchingQuestions },
  { id: 4, name: "Mars", image: marsImage, color: "#ef5b5b", description: "Listen for letter sounds", questions: phonicsQuestions },
];

function shuffleArray(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

const savedGame = () => {
  try {
    return JSON.parse(localStorage.getItem("atli-space-progress")) || { unlocked: 1, activePlanet: 1, question: 0 };
  } catch {
    return { unlocked: 1, activePlanet: 1, question: 0 };
  }
};

function AppNav({ onHome, onMap, onSettings }) {
  return <header className="topbar">
    <button className="brand" onClick={onHome} aria-label="Go home">🚀 Atli's Space Game</button>
    <nav>
      <button onClick={onHome}>Home</button>
      <button onClick={onMap}>Planet Map</button>
      <button onClick={onSettings}>Settings</button>
    </nav>
  </header>;
}

function PlanetVisual({ planet, className = "" }) {
  return planet.image
    ? <img className={className} src={planet.image} alt={planet.name} />
    : <span className={className} role="img" aria-label={planet.name}>{planet.emoji}</span>;
}

function App() {
  const [progress, setProgress] = useState(savedGame);
  const [screen, setScreen] = useState("home");
  const [soundOn, setSoundOn] = useState(true);
  const [feedback, setFeedback] = useState("");

  const planet = planets.find((item) => item.id === progress.activePlanet) || planets[0];
  const nextPlanet = planets[planet.id] || { name: "Mission complete", emoji: "🏁" };
  const missionQuestions = useMemo(() => shuffleArray(planet.questions), [planet.questions]);
  const question = missionQuestions[progress.question] || missionQuestions[0];
  const options = useMemo(() => generateOptions(question.answer), [question.answer]);

  useEffect(() => {
    localStorage.setItem("atli-space-progress", JSON.stringify(progress));
  }, [progress]);

  const playSound = (sound) => {
    if (!soundOn) return;
    const effect = new Audio(sound);
    effect.volume = 0.55;
    effect.play().catch(() => {});
  };

  const goToPlanet = (id) => {
    playSound(blastoffSound);
    setProgress((current) => ({ ...current, activePlanet: id, question: 0 }));
    setFeedback("");
    setScreen("planet");
  };

  const speak = () => {
    if (soundOn && "speechSynthesis" in window && question.sound) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(question.sound);
      utterance.rate = 0.75;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (screen === "mission" && question.sound) speak();
  // Playing the prompt when a phonics question changes is intentional.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, progress.question, planet.id]);

  const answer = (letter) => {
    if (letter !== question.answer) {
      playSound(wrongSound);
      setFeedback("Almost! Try another star.");
      return;
    }
    setFeedback("");
    if (progress.question < missionQuestions.length - 1) {
      playSound(correctSound);
      setProgress((current) => ({ ...current, question: current.question + 1 }));
      return;
    }
    playSound(victorySound);
    setScreen("celebration");
  };

  const unlockNext = () => {
    const nextPlanet = planet.id + 1;
    if (nextPlanet > planets.length) {
      setScreen("map");
      return;
    }
    playSound(blastoffSound);
    setProgress((current) => ({ ...current, unlocked: Math.max(current.unlocked, nextPlanet), activePlanet: nextPlanet, question: 0 }));
    setScreen("unlock");
  };

  const resetProgress = () => {
    setProgress({ unlocked: 1, activePlanet: 1, question: 0 });
    setScreen("home");
  };

  const action = (label, handler, className = "primary-button") => <button className={className} onClick={handler}>{label}</button>;

  let content;
  if (screen === "home") {
    content = <main className="hero-panel">
      <span className="hero-rocket">🚀</span>
      <p className="eyebrow">WELCOME, CAPTAIN</p>
      <h1>Ready for a stellar adventure?</h1>
      <p>Learn letters, sounds, and matching while visiting every planet in our solar system.</p>
      <div className="button-row">
        {action("Start", () => { playSound(blastoffSound); setScreen("launch"); })}
        {action("Keep Playing", () => setScreen("mission"), "secondary-button")}
      </div>
    </main>;
  } else if (screen === "launch") {
    content = <main className="launch-panel">
      <div className="countdown-orbit"><span>3</span><span>2</span><span>1</span><b>🚀</b></div>
      <p className="eyebrow">MISSION CONTROL</p><h1>Launch sequence ready!</h1>
      <p>Choose a planet to begin your next learning mission.</p>
      {action("View planet map", () => setScreen("map"))}
    </main>;
  } else if (screen === "map") {
    content = <main className="page"><p className="eyebrow">YOUR JOURNEY</p><h1>Planet Map</h1><p className="page-intro">Complete each planet to unlock the next destination.</p>
      <div className="planet-map">{planets.map((item) => {
        const locked = item.id > progress.unlocked;
        return <button key={item.id} className={`planet-card ${locked ? "locked" : ""}`} style={{ "--planet": item.color }} disabled={locked} onClick={() => goToPlanet(item.id)}>
          {locked ? <span>🔒</span> : <PlanetVisual planet={item} className="planet-art" />}<strong>{item.name}</strong><small>{locked ? "Complete the previous planet" : item.description}</small>
        </button>;
      })}</div>
    </main>;
  } else if (screen === "planet") {
    content = <main className="planet-overview"><PlanetVisual planet={planet} className="planet-icon planet-art" /><p className="eyebrow">PLANET {planet.id}</p><h1>Welcome to {planet.name}</h1><p>{planet.description}. You have {missionQuestions.length} stars to collect.</p>{action("Start mission", () => { playSound(blastoffSound); setScreen("mission"); })}</main>;
  } else if (screen === "mission") {
    const journeyPercent = (progress.question / missionQuestions.length) * 100;
    content = <main className="mission-panel"><div className="mission-status"><button className="text-button" onClick={() => setScreen("planet")}>← Planet</button><span>{planet.name} · Star {progress.question + 1} of {missionQuestions.length}</span></div><div className="journey-track" aria-label={`Traveling from ${planet.name} to ${nextPlanet.name}. ${progress.question} letters completed.`}><PlanetVisual planet={planet} className="journey-planet planet-art" /><div className="journey-line"><b className="journey-rocket" style={{ left: `${journeyPercent}%` }}>🚀</b></div><PlanetVisual planet={nextPlanet} className="journey-planet planet-art" /></div>
      <p className="eyebrow">{question.sound ? "LISTEN AND CHOOSE" : "FIND THE LETTER"}</p>{question.sound ? <button className="sound-target" onClick={speak}>🔊 Hear the sound</button> : <div className="target-letter">{question.target}</div>}
      <div className="answer-grid">{options.map((letter) => <button key={letter} className="letter-button" onClick={() => answer(letter)}>{letter}</button>)}</div>
      <p className="feedback" aria-live="polite">{feedback}</p>
    </main>;
  } else if (screen === "celebration") {
    content = <main className="celebration-panel"><span>🎉</span><p className="eyebrow">MISSION COMPLETE</p><h1>You did it, Captain!</h1><p>You collected every star on {planet.name}.</p>{planet.id < planets.length ? action("Unlock next planet", unlockNext) : action("Return to planet map", () => setScreen("map"))}</main>;
  } else if (screen === "unlock") {
    content = <main className="unlock-panel"><PlanetVisual planet={nextPlanet} className="unlock-planet planet-art" /><p className="eyebrow">NEW DESTINATION</p><h1>{nextPlanet.name} unlocked!</h1><p>Your next mission is ready: {nextPlanet.description}.</p>{action(`Explore ${nextPlanet.name}`, () => setScreen("planet"))}</main>;
  } else {
    content = <main className="settings-panel"><p className="eyebrow">MISSION CONTROL</p><h1>Settings</h1><label className="setting-row">Sound effects and spoken prompts <button className="toggle" aria-pressed={soundOn} onClick={() => setSoundOn((on) => !on)}>{soundOn ? "On" : "Off"}</button></label><button className="danger-button" onClick={resetProgress}>Reset game progress</button></main>;
  }

  return <div className="app"><AppNav onHome={() => setScreen("home")} onMap={() => setScreen("map")} onSettings={() => setScreen("settings")} />{content}</div>;
}

export default App;
