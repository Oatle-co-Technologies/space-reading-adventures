import { useEffect, useMemo, useState } from "react";
import "./MathSection.css";
import { colors, shapes } from "../data/mathConstants";
import { mathMissions } from "../data/mathMissions";
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

function getMissionQuestions(mission) {
  return mission.questionBanks.flat();
}

const readProgress = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("oatle-maths-progress"));
    if (!saved) return defaultProgress;

    const savedMission = mathMissions.find((item) => item.id === saved.activeMission);
    const lastQuestion = Math.max((savedMission ? getMissionQuestions(savedMission).length : 1) - 1, 0);

    return {
      ...defaultProgress,
      ...saved,
      question: Math.min(saved.question || 0, lastQuestion),
    };
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

const countColors = [
  colors.red,
  colors.yellow,
  colors.blue,
  colors.green,
  colors.orange,
  colors.purple,
];

function Shape({ name, color = "currentColor", className = "" }) {
  return <span className={`math-shape math-shape-${name} ${className}`} style={{ "--shape-color": color }} aria-hidden="true" />;
}

function NumberVisual({ question }) {
  return <div className="math-number-display">{question.display}</div>;
}

function CountingShapesVisual({ question }) {
  return (
    <div className="math-count-display" aria-label={`${question.count} shapes`}>
      {question.shapes.map((shape, index) => (
        <Shape key={`${shape}-${index}`} name={shape} color={countColors[index % countColors.length]} />
      ))}
    </div>
  );
}

function ShapeFactVisual({ question }) {
  return <div className="math-feature-display"><Shape name={question.shape} color="#55c6ff" /></div>;
}

function ShapeRecognitionVisual({ question }) {
  return <div className="math-feature-display"><Shape name={question.shape} color="#ffd45c" /></div>;
}

function ColourVisual({ question }) {
  return (
    <div className="math-feature-display">
      <Shape name={question.shape} color={question.color} />
    </div>
  );
}

function ColourMixingVisual({ question }) {
  return (
    <div className="math-mix-display" aria-label="Two colours to mix">
      {question.mix.map((color) => (
        <span key={color} className="math-mix-swatch" style={{ background: color }} />
      ))}
    </div>
  );
}

function MatchingVisual({ question }) {
  if (question.quantity) {
    return (
      <div className="math-count-display" aria-label={`${question.quantity} shapes`}>
        {Array.from({ length: question.quantity }, (_, index) => (
          <Shape key={index} name={question.matchShape} color="#ffd45c" />
        ))}
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

  if (question.twoProperties) {
    return (
      <div className="math-feature-row">
        {question.groups.map((item, index) => {
          const [color, shape] = item.split(" ");
          return <Shape key={`${item}-${index}`} name={shape} color={colors[color]} />;
        })}
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

  return <ColourVisual question={question} />;
}

function SortingVisual({ question }) {
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

  return <ColourVisual question={question} />;
}

function ArithmeticVisual({ question }) {
  const [first, second] = question.values;
  const removedStart = first - second;
  const isSubtraction = question.operation === "-";
  const objectSymbol = question.object === "apple" ? "🍎" : question.object === "planet" ? "🪐" : "⭐";

  return (
    <div className="math-arithmetic-display" aria-label={`${first} ${question.operation} ${second}`}>
      <div className="math-arithmetic-group">
        {Array.from({ length: first }, (_, index) => (
          <span key={index} className={`math-object ${isSubtraction && index >= removedStart ? "is-taken" : ""}`}>{objectSymbol}</span>
        ))}
      </div>
      <strong className="math-operation-symbol">{question.operation}</strong>
      <div className="math-arithmetic-group">
        {isSubtraction ? null : Array.from({ length: second }, (_, index) => <span key={index} className="math-object">{objectSymbol}</span>)}
      </div>
      <strong className="math-operation-symbol">=</strong>
      <span className="math-operation-answer">?</span>
    </div>
  );
}

function NumberEquationVisual({ question }) {
  const first = question.values?.[0] ?? question.dividend;
  const second = question.values?.[1] ?? question.divisor;
  const operation = question.operation || "÷";
  return <div className="math-number-equation">{first} {operation} {second} = ?</div>;
}

function GroupingVisual({ question }) {
  return (
    <div className="math-equal-groups">
      {question.groups.map((group, groupIndex) => (
        <div className="math-small-group" key={groupIndex}>
          {Array.from({ length: group }, (_, itemIndex) => (
            <span className="math-object" key={itemIndex}>🍎</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function SharingVisual({ question }) {
  const groups = question.groups;

  return (
    <div className="math-sharing-display" aria-label="Objects shared into equal groups">
      {question.friends ? <div className="math-friends" aria-hidden="true">{Array.from({ length: question.friends }, (_, index) => <span key={index}>🧒</span>)}</div> : null}
      {groups.map((count, groupIndex) => (
        <div className="math-small-group" key={groupIndex}>
          {Array.from({ length: count }, (_, itemIndex) => (
            <span className="math-object" key={itemIndex}>🍎</span>
          ))}
        </div>
      ))}
    </div>
  );
}

const visualRenderers = {
  number: NumberVisual,
  "shape-introduction": ShapeFactVisual,
  "shape-sides": ShapeFactVisual,
  "shape-corners": ShapeFactVisual,
  "shape-recognition": ShapeRecognitionVisual,
  "counting-shapes": CountingShapesVisual,
  "colour-introduction": ColourVisual,
  "colour-recognition": ColourVisual,
  "colour-mixing": ColourMixingVisual,
  matching: MatchingVisual,
  sorting: SortingVisual,
  "addition-introduction": ArithmeticVisual,
  "addition-objects": ArithmeticVisual,
  "addition-numbers": NumberEquationVisual,
  "subtraction-introduction": ArithmeticVisual,
  "subtraction-objects": ArithmeticVisual,
  "subtraction-numbers": NumberEquationVisual,
  "equal-groups": GroupingVisual,
  sharing: SharingVisual,
  "division-introduction": SharingVisual,
  "division-numbers": NumberEquationVisual,
};

function QuestionVisual({ question }) {
  const Renderer = visualRenderers[question.type];

  if (Renderer) return <Renderer question={question} />;

  return null;
}

function OptionVisual({ option, question }) {
  const colorKey = Object.keys(colorLabels).find((key) => colorLabels[key] === option) || option;
  const color = colors[colorKey];
  const isColorOption = Boolean(color);

  if (isColorOption) {
    return <Shape name={question?.shape || shapes.circle} color={color} />;
  }

  if (["shape-recognition", "shape-sides", "shape-corners"].includes(question?.type) && shapes[option]) {
    return <Shape name={option} color="#55c6ff" />;
  }

  if (question?.type === "matching" && question.quantity) {
    return option;
  }

  if (question?.twoProperties) {
    return option;
  }

  if (question?.type === "matching" && question.match) {
    const [optionColor, optionShape] = option.split(" ");
    return <Shape name={optionShape} color={colors[optionColor]} />;
  }

  if (question?.type === "sorting" && question.groups && question.groups.every((item) => /^\d+$/.test(item))) {
    return (
      <span className="math-option-group">
        {Array.from({ length: Number(option) }, (_, index) => (
          <Shape key={index} name={shapes.circle} color="#55c6ff" />
        ))}
      </span>
    );
  }

  if (question?.type === "sorting" && question.sort && shapes[option]) {
    return (
      <span className="math-option-group">
        {Array.from({ length: 4 }, (_, index) => (
          <Shape key={index} name={option} color="#66d17a" />
        ))}
      </span>
    );
  }

  if (question?.type === "sorting" && question.oddOneOut && shapes[option]) {
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
  const questions = useMemo(() => getMissionQuestions(mission), [mission]);
  const question = questions[progress.question] || questions[0];
  const isAssessment = mission.assessment;
  const journeyPercent = (progress.question / questions.length) * 100;

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

    const correct = question.teaching || selectedAnswer === question.answer;
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
      if (progress.question < questions.length - 1) {
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
        <span>{mission.title} · {progress.question + 1} of {questions.length}</span>
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
        {(question.teaching ? ["Continue"] : question.options).map((option) => (
          <button
            key={option}
            className="word-button math-answer-button"
            onClick={() => answerQuestion(question.teaching ? "__continue__" : option)}
            disabled={isProcessing}
          >
            {question.teaching ? option : <OptionVisual option={option} question={question} />}
          </button>
        ))}
      </div>
      <p className={`math-feedback ${feedback.includes("Almost") ? "is-wrong" : ""}`} aria-live="polite">{feedback}</p>
    </main>
  );
}
