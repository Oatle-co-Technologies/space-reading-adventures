import { colors } from "./mathConstants";

export const colourMixingQuestions = [
  // -------------------------------------------------------
  // SECONDARY COLOURS — TEACH
  // -------------------------------------------------------

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red and yellow make orange.",
    answer: "orange",
    options: [],
    mix: [colors.red, colors.yellow],
    resultColor: colors.orange,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Yellow and blue make green.",
    answer: "green",
    options: [],
    mix: [colors.yellow, colors.blue],
    resultColor: colors.green,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Blue and red make purple.",
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
    prompt: "Red + yellow = ?",
    answer: "orange",
    options: ["orange", "green", "purple"],
    mix: [colors.red, colors.yellow],
    resultColor: colors.orange,
  },

  {
    type: "colour-mixing",
    prompt: "Yellow + blue = ?",
    answer: "green",
    options: ["purple", "orange", "green"],
    mix: [colors.yellow, colors.blue],
    resultColor: colors.green,
  },

  {
    type: "colour-mixing",
    prompt: "Blue + red = ?",
    answer: "purple",
    options: ["green", "purple", "orange"],
    mix: [colors.blue, colors.red],
    resultColor: colors.purple,
  },

  // -------------------------------------------------------
  // NEW COLOURS — TEACH
  // -------------------------------------------------------

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red + orange = vermilion.",
    answer: "vermilion",
    options: [],
    mix: [colors.red, colors.orange],
    resultColor: "#e34234",
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Yellow + orange = gold.",
    answer: "gold",
    options: [],
    mix: [colors.yellow, colors.orange],
    resultColor: colors.gold,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Yellow + green = lime.",
    answer: "lime",
    options: [],
    mix: [colors.yellow, colors.green],
    resultColor: colors.lime,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Blue + green = turquoise.",
    answer: "turquoise",
    options: [],
    mix: [colors.blue, colors.green],
    resultColor: colors.turquoise,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Blue + purple = violet.",
    answer: "violet",
    options: [],
    mix: [colors.blue, colors.purple],
    resultColor: colors.violet,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red + purple = maroon.",
    answer: "maroon",
    options: [],
    mix: [colors.red, colors.purple],
    resultColor: colors.maroon,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red + white = pink.",
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
    prompt: "Red + orange = ?",
    answer: "vermilion",
    options: ["vermilion", "gold", "maroon"],
    mix: [colors.red, colors.orange],
    resultColor: "#e34234",
  },

  {
    type: "colour-mixing",
    prompt: "Yellow + orange = ?",
    answer: "gold",
    options: ["lime", "gold", "violet"],
    mix: [colors.yellow, colors.orange],
    resultColor: colors.gold,
  },

  {
    type: "colour-mixing",
    prompt: "Yellow + green = ?",
    answer: "lime",
    options: ["turquoise", "lime", "gold"],
    mix: [colors.yellow, colors.green],
    resultColor: colors.lime,
  },

  {
    type: "colour-mixing",
    prompt: "Blue + green = ?",
    answer: "turquoise",
    options: ["turquoise", "violet", "lime"],
    mix: [colors.blue, colors.green],
    resultColor: colors.turquoise,
  },

  {
    type: "colour-mixing",
    prompt: "Blue + purple = ?",
    answer: "violet",
    options: ["maroon", "violet", "turquoise"],
    mix: [colors.blue, colors.purple],
    resultColor: colors.violet,
  },

  {
    type: "colour-mixing",
    prompt: "Red + purple = ?",
    answer: "maroon",
    options: ["pink", "maroon", "violet"],
    mix: [colors.red, colors.purple],
    resultColor: colors.maroon,
  },

  {
    type: "colour-mixing",
    prompt: "Red + white = ?",
    answer: "pink",
    options: ["pink", "gold", "lime"],
    mix: [colors.red, "#ffffff"],
    resultColor: colors.pink,
  },
];