function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generateMissingLetterOptions(correctLetter) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const wrongLetters = alphabet.filter((letter) => letter !== correctLetter);

  return shuffle([
    correctLetter,
    ...shuffle(wrongLetters).slice(0, 3),
  ]);
}