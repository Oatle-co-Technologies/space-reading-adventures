import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { questions } from "./data/questions";
import { lowercaseQuestions } from "./data/lowercaseQuestions";
import { matchingQuestions } from "./data/matchingQuestions";
import { phonicsQuestions } from "./data/phonicsQuestions";
import { generateOptions } from "./utils/generateOptions";

const planets = [
  { id: 1, name: "Mercury", emoji: "☿", color: "#ffbd59", description: "Learn capital letters", questions },
  { id: 2, name: "Venus", emoji: "♀", color: "#ff8d70", description: "Explore lowercase letters", questions: lowercaseQuestions },
  { id: 3, name: "Earth", emoji: "🌍", color: "#55c6ff", description: "Match upper and lowercase", questions: matchingQuestions },
  { id: 4, name: "Mars", emoji: "🔴", color: "#ef5b5b", description: "Listen for letter sounds", questions: phonicsQuestions },
];

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

function App() {
  const [progress, setProgress] = useState(savedGame);
  const [screen, setScreen] = useState("home");
  const [soundOn, setSoundOn] = useState(true);
  const [feedback, setFeedback] = useState("");

  const planet = planets.find((item) => item.id === progress.activePlanet) || planets[0];
  const question = planet.questions[progress.question] || planet.questions[0];
  const options = useMemo(() => generateOptions(question.answer), [question.answer]);

  useEffect(() => {
    localStorage.setItem("atli-space-progress", JSON.stringify(progress));
  }, [progress]);

  const goToPlanet = (id) => {
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
      setFeedback("Almost! Try another star.");
      return;
    }
    setFeedback("");
    if (progress.question < planet.questions.length - 1) {
      setProgress((current) => ({ ...current, question: current.question + 1 }));
      return;
    }
    setScreen("celebration");
  };

  const unlockNext = () => {
    const nextPlanet = planet.id + 1;
    if (nextPlanet > planets.length) {
      setScreen("map");
      return;
    }
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
        {action("Launch game", () => setScreen("launch"))}
        {action(`Resume ${planet.name}`, () => setScreen("mission"), "secondary-button")}
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
          <span>{locked ? "🔒" : item.emoji}</span><strong>{item.name}</strong><small>{locked ? "Complete the previous planet" : item.description}</small>
        </button>;
      })}</div>
    </main>;
  } else if (screen === "planet") {
    content = <main className="planet-overview"><span className="planet-icon" style={{ color: planet.color }}>{planet.emoji}</span><p className="eyebrow">PLANET {planet.id}</p><h1>Welcome to {planet.name}</h1><p>{planet.description}. You have {planet.questions.length} stars to collect.</p>{action("Start mission", () => setScreen("mission"))}</main>;
  } else if (screen === "mission") {
    content = <main className="mission-panel"><div className="mission-status"><button className="text-button" onClick={() => setScreen("planet")}>← Planet</button><span>{planet.name} · Star {progress.question + 1} of {planet.questions.length}</span></div><div className="progress"><i style={{ width: `${((progress.question + 1) / planet.questions.length) * 100}%` }} /></div>
      <p className="eyebrow">{question.sound ? "LISTEN AND CHOOSE" : "FIND THE LETTER"}</p>{question.sound ? <button className="sound-target" onClick={speak}>🔊 Hear the sound</button> : <div className="target-letter">{question.target}</div>}
      <div className="answer-grid">{options.map((letter) => <button key={letter} className="letter-button" onClick={() => answer(letter)}>{letter}</button>)}</div>
      <p className="feedback" aria-live="polite">{feedback}</p>
    </main>;
  } else if (screen === "celebration") {
    content = <main className="celebration-panel"><span>🎉</span><p className="eyebrow">MISSION COMPLETE</p><h1>You did it, Captain!</h1><p>You collected every star on {planet.name}.</p>{planet.id < planets.length ? action("Unlock next planet", unlockNext) : action("Return to planet map", () => setScreen("map"))}</main>;
  } else if (screen === "unlock") {
    const next = planets[planet.id];
    content = <main className="unlock-panel"><span className="unlock-planet" style={{ color: next.color }}>{next.emoji}</span><p className="eyebrow">NEW DESTINATION</p><h1>{next.name} unlocked!</h1><p>Your next mission is ready: {next.description}.</p>{action(`Explore ${next.name}`, () => setScreen("planet"))}</main>;
  } else {
    content = <main className="settings-panel"><p className="eyebrow">MISSION CONTROL</p><h1>Settings</h1><label className="setting-row">Sound effects and spoken prompts <button className="toggle" aria-pressed={soundOn} onClick={() => setSoundOn((on) => !on)}>{soundOn ? "On" : "Off"}</button></label><button className="danger-button" onClick={resetProgress}>Reset game progress</button></main>;
  }

  return <div className="app"><AppNav onHome={() => setScreen("home")} onMap={() => setScreen("map")} onSettings={() => setScreen("settings")} />{content}</div>;
}

export default App;
