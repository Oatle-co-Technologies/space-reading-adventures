import { colors } from "./mathConstants";

export const colourMixingQuestions = [
  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Red and yellow make orange.",
    teachingText: "When we mix red and yellow, we make orange.",
    answer: "orange",
    options: [],
    mix: [colors.red, colors.yellow],
    resultColor: colors.orange,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Yellow and blue make green.",
    teachingText: "When we mix yellow and blue, we make green.",
    answer: "green",
    options: [],
    mix: [colors.yellow, colors.blue],
    resultColor: colors.green,
  },

  {
    type: "colour-mixing",
    teaching: true,
    prompt: "Blue and red make purple.",
    teachingText: "When we mix blue and red, we make purple.",
    answer: "purple",
    options: [],
    mix: [colors.blue, colors.red],
    resultColor: colors.purple,
  },

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
];