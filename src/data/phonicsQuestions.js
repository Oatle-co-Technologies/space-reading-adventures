const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const phonicsQuestions = alphabet.map((letter) => ({
  sound: `${letter.toLowerCase()} sound`,
  answer: letter,
}));
