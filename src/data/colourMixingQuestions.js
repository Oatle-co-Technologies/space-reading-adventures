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
  // NEW COLOURS — TEACH THROUGH MIXING
  // -------------------------------------------------------

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red and orange make vermilion.",
    teachingText:
      "When we mix red and orange, we make vermilion.",
    answer: "vermilion",
    options: [],
    mix: [colors.red, colors.orange],
    resultColor: "#e34234",
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Yellow and orange make gold.",
    teachingText:
      "When we mix yellow and orange, we make gold.",
    answer: "gold",
    options: [],
    mix: [colors.yellow, colors.orange],
    resultColor: colors.gold,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Yellow and green make lime.",
    teachingText:
      "When we mix yellow and green, we make lime.",
    answer: "lime",
    options: [],
    mix: [colors.yellow, colors.green],
    resultColor: colors.lime,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Blue and green make turquoise.",
    teachingText:
      "When we mix blue and green, we make turquoise.",
    answer: "turquoise",
    options: [],
    mix: [colors.blue, colors.green],
    resultColor: colors.turquoise,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Blue and purple make violet.",
    teachingText:
      "When we mix blue and purple, we make violet.",
    answer: "violet",
    options: [],
    mix: [colors.blue, colors.purple],
    resultColor: colors.violet,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red and purple make maroon.",
    teachingText:
      "When we mix red and purple, we make maroon.",
    answer: "maroon",
    options: [],
    mix: [colors.red, colors.purple],
    resultColor: colors.maroon,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red and white make pink.",
    teachingText:
      "When we mix red and white, we make pink.",
    answer: "pink",
    options: [],
    mix: [colors.red, "#ffffff"],
    resultColor: colors.pink,
  },

  // -------------------------------------------------------
  // NEW COLOURS — PRACTICE
  // -------------------------------------------------------

  {
    type: "colour-mixing",
    prompt: "Red and orange make what colour?",
    answer: "vermilion",
    options: ["vermilion", "gold", "maroon"],
    mix: [colors.red, colors.orange],
    resultColor: "#e34234",
  },

  {
    type: "colour-mixing",
    prompt: "Yellow and orange make what colour?",
    answer: "gold",
    options: ["lime", "gold", "violet"],
    mix: [colors.yellow, colors.orange],
    resultColor: colors.gold,
  },

  {
    type: "colour-mixing",
    prompt: "Yellow and green make what colour?",
    answer: "lime",
    options: ["turquoise", "lime", "gold"],
    mix: [colors.yellow, colors.green],
    resultColor: colors.lime,
  },

  {
    type: "colour-mixing",
    prompt: "Blue and green make what colour?",
    answer: "turquoise",
    options: ["turquoise", "violet", "lime"],
    mix: [colors.blue, colors.green],
    resultColor: colors.turquoise,
  },

  {
    type: "colour-mixing",
    prompt: "Blue and purple make what colour?",
    answer: "violet",
    options: ["maroon", "violet", "turquoise"],
    mix: [colors.blue, colors.purple],
    resultColor: colors.violet,
  },

  {
    type: "colour-mixing",
    prompt: "Red and purple make what colour?",
    answer: "maroon",
    options: ["pink", "maroon", "violet"],
    mix: [colors.red, colors.purple],
    resultColor: colors.maroon,
  },

  {
    type: "colour-mixing",
    prompt: "Red and white make what colour?",
    answer: "pink",
    options: ["pink", "gold", "lime"],
    mix: [colors.red, "#ffffff"],
    resultColor: colors.pink,
  },
];