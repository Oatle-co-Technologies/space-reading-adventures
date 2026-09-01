import { readingQuestions } from "../data/readingQuestions";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generateReadingOptions(correctWord) {
  const words = readingQuestions
    .map((question) => question.answer)
    .filter((word) => word !== correctWord);

  const shuffledWrong = shuffle(words);

  return shuffle([
    correctWord,
    shuffledWrong[0],
    shuffledWrong[1],
    shuffledWrong[2],
  ]);
}