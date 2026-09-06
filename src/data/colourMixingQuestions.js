import { colors } from "./mathConstants";

export const colourMixingQuestions = [
  { type: "colour-mixing", prompt: "Red and yellow make what colour?", answer: "orange", options: ["orange", "green", "purple"], mix: [colors.red, colors.yellow] },
  { type: "colour-mixing", prompt: "Yellow and blue make what colour?", answer: "green", options: ["purple", "orange", "green"], mix: [colors.yellow, colors.blue] },
  { type: "colour-mixing", prompt: "Blue and red make what colour?", answer: "purple", options: ["green", "purple", "orange"], mix: [colors.blue, colors.red] },
];