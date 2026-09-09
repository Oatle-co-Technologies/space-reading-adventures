export const alphabetTracingLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const alphabetTracingMission = {
  id: 1,
  title: "Trace the Alphabet",
  description: "Trace uppercase and lowercase letters from A to Z.",
  letters: alphabetTracingLetters.map((letter, index) => ({
    id: index + 1,
    uppercase: letter,
    lowercase: letter.toLowerCase(),
  })),
};