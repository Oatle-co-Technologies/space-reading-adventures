import { colors, shapes } from "./mathConstants";

export const mathMatchingQuestions = [
  { type: "matching", prompt: "Which shape matches the red circle?", answer: "red circle", options: ["blue circle", "red circle", "red square"], match: { color: colors.red, shape: shapes.circle } },
  { type: "matching", prompt: "Which colour matches the blue shape?", answer: "blue", options: ["red", "blue", "yellow"], match: { color: colors.blue, shape: shapes.circle } },
  { type: "matching", prompt: "Which number matches these four stars?", answer: "4", options: ["3", "4", "5"], quantity: 4, matchShape: shapes.star },
  { type: "sorting", prompt: "Put the circles together.", answer: shapes.circle, options: [shapes.square, shapes.circle, shapes.triangle], sort: shapes.circle },
  { type: "sorting", prompt: "Put the yellow things together.", answer: "yellow", options: ["red", "yellow", "blue"], color: colors.yellow, shape: shapes.circle, sortColor: "yellow" },
  { type: "sorting", prompt: "Find the red triangles.", answer: "red triangle", options: ["blue triangle", "red star", "red triangle"], groups: ["red triangle", "blue triangle", "red star", "red triangle", "yellow triangle"], twoProperties: true },
];
