import { colors } from "./mathConstants";

export const colourMixingQuestions = [
  // -------------------------------------------------------
  // SECONDARY COLOURS — TEACH
  // -------------------------------------------------------

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red and yellow make orange.",
    teachingText:
      "When we mix red and yellow, we make orange.",
    answer: "orange",
    options: [],
    mix: [colors.red, colors.yellow],
    resultColor: colors.orange,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Yellow and blue make green.",
    teachingText:
      "When we mix yellow and blue, we make green.",
    answer: "green",
    options: [],
    mix: [colors.yellow, colors.blue],
    resultColor: colors.green,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Blue and red make purple.",
    teachingText:
      "When we mix blue and red, we make purple.",
    answer: "purple",
    options: [],
    mix: [colors.blue, colors.red],
    resultColor: colors.purple,
  },

  // -------------------------------------------------------
  // SECONDARY COLOURS — PRACTICE
  // -------------------------------------------------------

  {
    type: "colour-mixing",
    prompt: "Red and yellow make what colour?",
    answer: "orange",
    options: ["orange", "green", "purple"],
    mix: [colors.red, colors.yellow],
    resultColor: colors.orange,
  },

  {
    type: "colour-mixing",
    prompt: "Yellow and blue make what colour?",
    answer: "green",
    options: ["purple", "orange", "green"],
    mix: [colors.yellow, colors.blue],
    resultColor: colors.green,
  },

  {
    type: "colour-mixing",
    prompt: "Blue and red make what colour?",
    answer: "purple",
    options: ["green", "purple", "orange"],
    mix: [colors.blue, colors.red],
    resultColor: colors.purple,
  },

  // -------------------------------------------------------
  // TERTIARY COLOURS — TEACH
  // -------------------------------------------------------

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red and orange make red-orange.",
    teachingText:
      "When we mix red and orange, we make red-orange.",
    answer: "red-orange",
    options: [],
    mix: [colors.red, colors.orange],
    resultColor: colors.redOrange,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Yellow and orange make yellow-orange.",
    teachingText:
      "When we mix yellow and orange, we make yellow-orange.",
    answer: "yellow-orange",
    options: [],
    mix: [colors.yellow, colors.orange],
    resultColor: colors.yellowOrange,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Yellow and green make yellow-green.",
    teachingText:
      "When we mix yellow and green, we make yellow-green.",
    answer: "yellow-green",
    options: [],
    mix: [colors.yellow, colors.green],
    resultColor: colors.yellowGreen,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Blue and green make blue-green.",
    teachingText:
      "When we mix blue and green, we make blue-green.",
    answer: "blue-green",
    options: [],
    mix: [colors.blue, colors.green],
    resultColor: colors.blueGreen,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Blue and purple make blue-purple.",
    teachingText:
      "When we mix blue and purple, we make blue-purple.",
    answer: "blue-purple",
    options: [],
    mix: [colors.blue, colors.purple],
    resultColor: colors.bluePurple,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red and purple make red-purple.",
    teachingText:
      "When we mix red and purple, we make red-purple.",
    answer: "red-purple",
    options: [],
    mix: [colors.red, colors.purple],
    resultColor: colors.redPurple,
  },

  // -------------------------------------------------------
  // TERTIARY COLOURS — PRACTICE
  // -------------------------------------------------------

  {
    type: "colour-mixing",
    prompt: "Red and orange make what colour?",
    answer: "red-orange",
    options: ["red-orange", "yellow-orange", "red-purple"],
    mix: [colors.red, colors.orange],
    resultColor: colors.redOrange,
  },

  {
    type: "colour-mixing",
    prompt: "Yellow and orange make what colour?",
    answer: "yellow-orange",
    options: ["yellow-green", "yellow-orange", "red-orange"],
    mix: [colors.yellow, colors.orange],
    resultColor: colors.yellowOrange,
  },

  {
    type: "colour-mixing",
    prompt: "Yellow and green make what colour?",
    answer: "yellow-green",
    options: ["blue-green", "yellow-orange", "yellow-green"],
    mix: [colors.yellow, colors.green],
    resultColor: colors.yellowGreen,
  },

  {
    type: "colour-mixing",
    prompt: "Blue and green make what colour?",
    answer: "blue-green",
    options: ["blue-green", "blue-purple", "yellow-green"],
    mix: [colors.blue, colors.green],
    resultColor: colors.blueGreen,
  },

  {
    type: "colour-mixing",
    prompt: "Blue and purple make what colour?",
    answer: "blue-purple",
    options: ["red-purple", "blue-green", "blue-purple"],
    mix: [colors.blue, colors.purple],
    resultColor: colors.bluePurple,
  },

  {
    type: "colour-mixing",
    prompt: "Red and purple make what colour?",
    answer: "red-purple",
    options: ["red-orange", "red-purple", "blue-purple"],
    mix: [colors.red, colors.purple],
    resultColor: colors.redPurple,
  },
];