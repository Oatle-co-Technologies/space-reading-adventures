import { readingQuestions } from "./readingQuestions";

const missingLetterPositions = {
  ant: 0,
  bag: 1,
  cab: 2,
  dog: 1,
  egg: 0,
  fan: 2,
  gas: 1,
  hat: 0,
  ice: 2,
  jam: 1,
  key: 2,
  lid: 0,
  map: 1,
  net: 2,
  owl: 0,
  pen: 1,
  queen: 0,
  rug: 2,
  sun: 1,
  tag: 0,
  umbrella: 0,
  van: 1,
  web: 2,
  xylophone: 0,
  yoyo: 1,
  zip: 2,
};

export const missingLetterQuestions = readingQuestions.map((question) => {
  const word = question.answer;
  const missingIndex = missingLetterPositions[word];

  return {
    word,
    display: `${word.slice(0, missingIndex)}_${word.slice(missingIndex + 1)}`,
    answer: word[missingIndex],
  };
});