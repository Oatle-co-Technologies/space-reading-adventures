import { shapes } from "./mathConstants";

const introduction = (name, connection) => ({
  type: "shape-introduction",
  teaching: true,
  prompt: `This is a ${name}.`,
  teachingText: connection,
  shape: name,
  options: [],
});

const property = (type, prompt, shape, answer, options) => ({
  type,
  prompt,
  shape,
  answer: String(answer),
  options: options.map(String),
});

const recognition = (shape, options) => ({
  type: "shape-recognition",
  prompt: "Which shape is this?",
  shape,
  answer: shape,
  options,
});

export const shapeIntroductionQuestions = [
  introduction("circle", "A ball is shaped like a circle."),
  introduction("square", "A window can be shaped like a square."),
  introduction("triangle", "A roof can be shaped like a triangle."),
  introduction("rectangle", "A door can be shaped like a rectangle."),
  introduction("oval", "An egg is shaped like an oval."),
  introduction("diamond", "A kite can be shaped like a diamond."),
  introduction("star", "A star in the sky has a star shape."),
  introduction("heart", "A card can have a heart shape."),
  introduction("pentagon", "A house badge can be shaped like a pentagon."),
  introduction("hexagon", "A honeycomb cell is shaped like a hexagon."),
  introduction("octagon", "A stop sign is shaped like an octagon."),
  introduction("crescent", "The moon can look like a crescent."),
  introduction("semicircle", "A half moon is shaped like a semicircle."),
];

export const shapeFactQuestions = [
  property("shape-sides", "How many sides does a circle have?", shapes.circle, 1, [0, 1, 2]),
  property("shape-corners", "How many corners does a circle have?", shapes.circle, 0, [0, 1, 2]),
  property("shape-sides", "How many sides does a square have?", shapes.square, 4, [3, 4, 5]),
  property("shape-corners", "How many corners does a square have?", shapes.square, 4, [3, 4, 5]),
  property("shape-sides", "How many sides does a triangle have?", shapes.triangle, 3, [2, 3, 4]),
  property("shape-corners", "How many corners does a triangle have?", shapes.triangle, 3, [2, 3, 4]),
  property("shape-sides", "How many sides does a rectangle have?", shapes.rectangle, 4, [3, 4, 5]),
  property("shape-corners", "How many corners does a rectangle have?", shapes.rectangle, 4, [3, 4, 5]),
  property("shape-sides", "How many sides does an oval have?", shapes.oval, 1, [0, 1, 2]),
  property("shape-corners", "How many corners does an oval have?", shapes.oval, 0, [0, 1, 2]),
  property("shape-sides", "How many sides does a diamond have?", shapes.diamond, 4, [3, 4, 5]),
  property("shape-corners", "How many corners does a diamond have?", shapes.diamond, 4, [3, 4, 5]),
  property("shape-sides", "How many sides does a star have?", shapes.star, 10, [9, 10, 11]),
  property("shape-corners", "How many corners does a star have?", shapes.star, 5, [4, 5, 6]),
  property("shape-sides", "How many sides does a heart have?", shapes.heart, 1, [0, 1, 2]),
  property("shape-corners", "How many corners does a heart have?", shapes.heart, 1, [0, 1, 2]),
  property("shape-sides", "How many sides does a pentagon have?", shapes.pentagon, 5, [4, 5, 6]),
  property("shape-corners", "How many corners does a pentagon have?", shapes.pentagon, 5, [4, 5, 6]),
  property("shape-sides", "How many sides does a hexagon have?", shapes.hexagon, 6, [5, 6, 7]),
  property("shape-corners", "How many corners does a hexagon have?", shapes.hexagon, 6, [5, 6, 7]),
  property("shape-sides", "How many sides does an octagon have?", shapes.octagon, 8, [7, 8, 9]),
  property("shape-corners", "How many corners does an octagon have?", shapes.octagon, 8, [7, 8, 9]),
  property("shape-sides", "How many sides does a crescent have?", shapes.crescent, 1, [0, 1, 2]),
  property("shape-corners", "How many corners does a crescent have?", shapes.crescent, 0, [0, 1, 2]),
  property("shape-sides", "How many sides does a semicircle have?", shapes.semicircle, 2, [1, 2, 3]),
  property("shape-corners", "How many corners does a semicircle have?", shapes.semicircle, 2, [1, 2, 3]),
];

export const shapeRecognitionQuestions = [
  recognition(shapes.circle, [shapes.circle, shapes.square, shapes.triangle]),
  recognition(shapes.square, [shapes.triangle, shapes.square, shapes.oval]),
  recognition(shapes.triangle, [shapes.rectangle, shapes.diamond, shapes.triangle]),
  recognition(shapes.rectangle, [shapes.rectangle, shapes.circle, shapes.star]),
  recognition(shapes.oval, [shapes.heart, shapes.oval, shapes.square]),
  recognition(shapes.diamond, [shapes.star, shapes.diamond, shapes.hexagon]),
  recognition(shapes.star, [shapes.star, shapes.heart, shapes.pentagon]),
  recognition(shapes.heart, [shapes.crescent, shapes.heart, shapes.circle]),
  recognition(shapes.pentagon, [shapes.hexagon, shapes.octagon, shapes.pentagon]),
  recognition(shapes.hexagon, [shapes.hexagon, shapes.diamond, shapes.rectangle]),
  recognition(shapes.octagon, [shapes.circle, shapes.octagon, shapes.semicircle]),
  recognition(shapes.crescent, [shapes.oval, shapes.crescent, shapes.star]),
  recognition(shapes.semicircle, [shapes.semicircle, shapes.triangle, shapes.rectangle]),
];