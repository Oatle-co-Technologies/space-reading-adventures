import { useEffect, useMemo, useState } from "react";
import "./MathSection.css";
import { colors, mathMissions, shapes } from "../data/mathMissions";
import correctSound from "../sounds/correct.mp3";
import wrongSound from "../sounds/wrong.mp3";
import victorySound from "../sounds/victory.mp3";
import blastoffSound from "../sounds/blastoff.mp3";

const defaultProgress = {
  unlocked: 1,
  activeMission: 1,
  question: 0,
  assessmentResults: {},
};

const readProgress = () => {
  try {
    return JSON.parse(localStorage.getItem("oatle-maths-progress")) || defaultProgress;
  } catch {
    return defaultProgress;
  }
};

const colorLabels = {
  gold: "gold",
  lime: "lime",
  violet: "violet",
  pink: "pink",
  turquoise: "turquoise",
  coral: "coral",
  maroon: "maroon",
  skyBlue: "sky blue",
  navyBlue: "navy blue",
};

const countColors = [colors.red, colors.yellow, colors.blue, colors.green, colors.orange, colors.purple];

function shapeLabel(shape) {
  return Object.entries(shapes).find(([, value]) => value === shape)?.[0] || shape;
}

function Shape({ name, color = "currentColor", className = "" }) {
  return <span className={`math-shape math-shape-${name} ${className}`} style={{ "--shape-color": color }} aria-hidden="true" />;
}

function QuestionVisual({ question }) {
  if (question.display) {
    return <div className="math-number-display">{question.display}</div>;
  }

  if (question.mix) {
    return (
      <div className="math-mix-display" aria-label="Two colours to mix">
        {question.mix.map((color) => (
          <span key={color} className="math-mix-swatch" style={{ background: color }} />
        ))}
      </div>
    );
  }

  if (question.count) {
    return (
      <div className="math-count-display" aria-label={`${question.count} ${shapeLabel(question.shape)}s`}>
        {Array.from({ length: question.count }, (_, index) => (
          <Shape key={index} name={question.shape} color={countColors[index % countColors.length]} />
        ))}
      </div>
    );
  }

  if (question.color && question.shape) {
    return (
      <div className="math-feature-display">
        <Shape name={question.shape} color={question.color} />
      </div>
    );
  }

  if (question.match) {
    return (
      <div className="math-feature-display">
        <Shape name={question.match.shape} color={question.match.color} />
      </div>
    );
  }

  if (question.sort) {
    return (
      <div className="math-group-display">
        {Array.from({ length: 4 }, (_, index) => (
          <Shape key={index} name={question.sort} color="#66d17a" />
        ))}
      </div>
    );
  }

  if (question.oddOneOut) {
    return (
      <div className="math-feature-row">
        {question.oddOneOut.map((shape, index) => (
          <Shape key={`${shape}-${index}`} name={shape} color="#55c6ff" />
        ))}
      </div>
    );
  }

  if (question.groups) {
    return (
      <div className="math-bars" aria-label={`Groups of ${question.groups.join(", ")}`}>
        {question.groups.map((group, index) => (
          <span key={index} style={{ "--bar-size": group }} />
        ))}
      </div>
    );
  }

  if (question.values) {
    if (question.operation === "x") {
      return (
        <div className="math-equal-groups">
          {Array.from({ length: question.values[0] }, (_, groupIndex) => (
            <div className="math-small-group" key={groupIndex}>
              {Array.from({ length: question.values[1] }, (_, itemIndex) => (
                <Shape key={itemIndex} name={shapes.star} color="#ffd45c" />
              ))}
            </div>
          ))}
        </div>
      );
    }

    const [first, second] = question.values;
    const visibleCount = question.operation === "+" ? first + second : first;

    return (
      <div className="math-count-display" aria-label={`${first} ${question.operation} ${second}`}>
        {Array.from({ length: visibleCount }, (_, index) => (
          <Shape
            key={index}
            name={shapes.star}
            color={question.operation === "-" && index >= first - second ? "#ef5b5b" : "#ffd45c"}
            className={question.operation === "-" && index >= first - second ? "is-taken" : ""}
          />
        ))}
      </div>
    );
  }

  return null;
}

function OptionVisual({ option, question }) {
  const colorKey = Object.keys(colorLabels).find((key) => colorLabels[key] === option) || option;
  const color = colors[colorKey];
  const isColorOption = Boolean(color);

  if (isColorOption) {
    return <Shape name={question?.shape || shapes.circle} color={color} />;
  }

  if (question?.match) {
    const [optionColor, optionShape] = option.split(" ");
    return <Shape name={optionShape} color={colors[optionColor]} />;
  }

  if (question?.groups) {
    return (
      <span className="math-option-group">
        {Array.from({ length: Number(option) }, (_, index) => (
          <Shape key={index} name={shapes.circle} color="#55c6ff" />
        ))}
      </span>
    );
  }

  if (question?.sort && shapes[option]) {
    return (
      <span className="math-option-group">
        {Array.from({ length: 4 }, (_, index) => (
          <Shape key={index} name={option} color="#66d17a" />
        ))}
      </span>
    );
  }

  if (question?.oddOneOut && shapes[option]) {
    return <Shape name={option} color="#55c6ff" />;
  }

  return option;
}

function MissionCard({ mission, locked, onSelect }) {
  return (
    <button
      className={`planet-card math-mission-card ${locked ? "locked" : ""}`}
      style={{ "--mission-color": mission.color }}
      disabled={locked}
      onClick={onSelect}
    >
      {locked ? (
        <span className="math-mission-number">🔒</span>
      ) : (
        <img className="math-mission-planet" src={mission.image} alt="" />
      )}
      <strong>{mission.title}</strong>
      <small>{locked ? "Complete the previous mission" : mission.description}</small>
    </button>
  );
}

export default function MathSection({ onHome, soundOn }) {
  const [progress, setProgress] = useState(readProgress);
  const [screen, setScreen] = useState("map");
  const [feedback, setFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState([]);

  const mission = mathMissions.find((item) => item.id === progress.activeMission) || mathMissions[0];
  const question = mission.questions[progress.question] || mission.questions[0];
  const isAssessment = mission.assessment;
  const journeyPercent = (progress.question / mission.questions.length) * 100;

  useEffect(() => {
    localStorage.setItem("oatle-maths-progress", JSON.stringify(progress));
  }, [progress]);

  const assessmentSummary = useMemo(() => {
    const total = assessmentAnswers.length;
    const correct = assessmentAnswers.filter((answer) => answer.correct).length;
    return { total, correct };
  }, [assessmentAnswers]);

  const playSound = (sound) => {
    if (!soundOn) return;

    const effect = new Audio(sound);
    effect.volume = 0.55;
    effect.play().catch(() => {});
  };

  const startMission = (id) => {
    playSound(blastoffSound);
    setProgress((current) => ({ ...current, activeMission: id, question: 0 }));
    setFeedback("");
    setIsProcessing(false);
    setAssessmentAnswers([]);
    setScreen("mission");
  };

  const finishMission = () => {
    if (isAssessment) {
      playSound(victorySound);
      setScreen("assessment-results");
      return;
    }

    playSound(victorySound);
    setProgress((current) => ({
      ...current,
      unlocked: Math.max(current.unlocked, Math.min(current.activeMission + 1, mathMissions.length)),
    }));
    setScreen("complete");
  };

  const answerQuestion = (selectedAnswer) => {
    if (isProcessing) return;

    const correct = selectedAnswer === question.answer;
    playSound(correct ? correctSound : wrongSound);
    setFeedback(correct ? "Great exploring!" : "Almost! Try another answer.");

    const nextAssessmentAnswers = isAssessment
      ? [...assessmentAnswers, { skill: question.skill, correct }]
      : assessmentAnswers;

    if (isAssessment) {
      setAssessmentAnswers(nextAssessmentAnswers);
    }

    if (!correct && !isAssessment) return;

    setIsProcessing(true);
    window.setTimeout(() => {
      if (progress.question < mission.questions.length - 1) {
        setProgress((current) => ({ ...current, question: current.question + 1 }));
        setFeedback("");
        setIsProcessing(false);
      } else {
        finishMission();
        setIsProcessing(false);
      }
    }, 700);
  };

  if (screen === "map") {
    return (
      <main className="page math-page">
        <p className="eyebrow">YOUR JOURNEY</p>
        <h1>Maths Map</h1>
        <p className="page-intro">
          Complete each mission to unlock the next destination.
        </p>
        <div className="planet-map">
          {mathMissions.map((item) => (
            <MissionCard
              key={item.id}
              mission={item}
              locked={item.id > progress.unlocked}
              onSelect={() => startMission(item.id)}
            />
          ))}
        </div>
      </main>
    );
  }

  if (screen === "complete") {
    return (
      <main className="math-center-panel">
        <span className="math-celebration">⭐</span>
        <p className="math-eyebrow">MISSION COMPLETE</p>
        <h1>{mission.title} complete!</h1>
        <p>You collected every star in this maths mission.</p>
        <div className="math-action-row">
          <button className="primary-button" onClick={() => setScreen("map")}>Next mission</button>
          <button className="secondary-button" onClick={onHome}>Back to home</button>
        </div>
      </main>
    );
  }

  if (screen === "assessment-results") {
    return (
      <main className="math-center-panel">
        <span className="math-celebration">🚀</span>
        <p className="math-eyebrow">MATHS ASSESSMENT COMPLETE</p>
        <h1>Wonderful space work!</h1>
        <p>You answered {assessmentSummary.correct} of {assessmentSummary.total} questions correctly.</p>
        <div className="math-action-row">
          <button className="primary-button" onClick={() => setScreen("map")}>View missions</button>
          <button className="secondary-button" onClick={onHome}>Back to home</button>
        </div>
      </main>
    );
  }

  return (
    <main className="math-page math-mission-page">
      <div className="math-status-row">
        <button className="math-back-button" onClick={() => setScreen("map")}>← Missions</button>
        <span>{mission.title} · {progress.question + 1} of {mission.questions.length}</span>
      </div>
      <div className="math-journey-track" aria-label={`${progress.question} questions completed`}>
        <img className="math-journey-planet" src={mission.image} alt="" />
        <div className="math-journey-line">
          <span className="math-journey-rocket" style={{ left: `${journeyPercent}%` }}>🚀</span>
        </div>
      </div>
      <p className="math-eyebrow">{isAssessment ? "SHOW WHAT YOU KNOW" : mission.title.toUpperCase()}</p>
      <h1>{question.prompt}</h1>
      <QuestionVisual question={question} />
      <div className={`math-answer-grid ${question.options.length === 3 ? "has-three-options" : ""}`}>
        {question.options.map((option) => (
          <button
            key={option}
            className="word-button math-answer-button"
            onClick={() => answerQuestion(option)}
            disabled={isProcessing}
          >
            <OptionVisual option={option} question={question} />
          </button>
        ))}
      </div>
      <p className={`math-feedback ${feedback.includes("Almost") ? "is-wrong" : ""}`} aria-live="polite">{feedback}</p>
    </main>
  );
}
