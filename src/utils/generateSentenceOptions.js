function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generateSentenceOptions(correctWords) {
  return shuffle(correctWords);
}