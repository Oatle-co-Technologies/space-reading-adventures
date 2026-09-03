import { questions } from "./questions";
import { lowercaseQuestions } from "./lowercaseQuestions";
import { matchingQuestions } from "./matchingQuestions";
import { phonicsQuestions } from "./phonicsQuestions";
import { readingQuestions } from "./readingQuestions";
import { missingLettersQuestions } from "./missingLettersQuestions";
import { sentenceQuestions } from "./sentenceQuestions";

export const assessmentSkills = [
  { id: "capital", name: "Capital letters" },
  { id: "lowercase", name: "Lowercase letters" },
  { id: "matching", name: "Upper/lowercase matching" },
  { id: "phonics", name: "Letter sounds / phonics" },
  { id: "reading", name: "Reading simple words" },
  { id: "missing", name: "Missing letters" },
  { id: "sentences", name: "Building simple sentences" },
];

export const assessmentQuestions = [
  ...questions.slice(0, 4).map((question) => ({ ...question, skill: "capital", type: "letters" })),
  ...lowercaseQuestions.slice(0, 4).map((question) => ({ ...question, skill: "lowercase", type: "letters" })),
  ...matchingQuestions.slice(0, 4).map((question) => ({ ...question, skill: "matching", type: "letters" })),
  ...phonicsQuestions.slice(0, 4).map((question) => ({ ...question, skill: "phonics", type: "phonics" })),
  ...readingQuestions.slice(0, 4).map((question) => ({ ...question, skill: "reading", type: "reading" })),
  ...missingLettersQuestions.slice(0, 4).map((question) => ({ ...question, skill: "missing", type: "missing" })),
  ...sentenceQuestions.slice(0, 4).map((question) => ({ ...question, skill: "sentences", type: "sentences" })),
];
