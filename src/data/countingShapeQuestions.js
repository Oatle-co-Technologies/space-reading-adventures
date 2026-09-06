import { shapes } from "./mathConstants";

const countTarget = (prompt, shape, count, options) => ({
  type: "counting-shapes",
  prompt,
  answer: String(count),
  options: options.map(String),
  shapes: [shape],
  targetShape: shape,
  count,
});

const countMixed = (prompt, shownShapes, count, options) => ({
  type: "counting-shapes",
  prompt,
  answer: String(count),
  options: options.map(String),
  shapes: shownShapes,
  targetShape: "all",
  count,
});

export const countingShapeQuestions = [
  countTarget("How many circles are there?", shapes.circle, 2, [1, 2, 3]),
  countTarget("How many squares are there?", shapes.square, 3, [2, 3, 4]),
  countTarget("How many triangles are there?", shapes.triangle, 4, [3, 4, 5]),
  countTarget("How many rectangles are there?", shapes.rectangle, 5, [4, 5, 6]),
  countTarget("How many ovals are there?", shapes.oval, 2, [1, 2, 3]),
  countTarget("How many diamonds are there?", shapes.diamond, 3, [2, 3, 4]),
  countTarget("How many stars are there?", shapes.star, 4, [3, 4, 5]),
  countTarget("How many hearts are there?", shapes.heart, 5, [4, 5, 6]),
  countTarget("How many pentagons are there?", shapes.pentagon, 3, [2, 3, 4]),
  countTarget("How many hexagons are there?", shapes.hexagon, 4, [3, 4, 5]),
  countTarget("How many octagons are there?", shapes.octagon, 5, [4, 5, 6]),
  countTarget("How many crescents are there?", shapes.crescent, 2, [1, 2, 3]),
  countTarget("How many semicircles are there?", shapes.semicircle, 3, [2, 3, 4]),
  countMixed("How many shapes are there altogether?", [shapes.circle, shapes.star, shapes.heart, shapes.circle], 4, [3, 4, 5]),
  countMixed("How many shapes are there altogether?", [shapes.triangle, shapes.diamond, shapes.square, shapes.oval, shapes.star, shapes.heart], 6, [5, 6, 7]),
  countMixed("How many shapes are there altogether?", [shapes.hexagon, shapes.crescent, shapes.octagon, shapes.semicircle, shapes.rectangle, shapes.circle, shapes.pentagon, shapes.star], 8, [7, 8, 9]),
];