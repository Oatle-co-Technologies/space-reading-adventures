import { shapes, colors } from "./mathConstants";

export const additionQuestions = [
  // --------------------------------------------------
  // PART 1 — INTRODUCE THE PLUS SIGN
  // --------------------------------------------------

  {
    type: "addition-introduction",
    teaching: true,
    prompt: "This is a plus sign: +",
    teachingText: "The plus sign means we are putting groups together.",
    answer: null,
    options: [],
    operation: "+",
  },

  // --------------------------------------------------
  // PART 2 — WHAT DOES PLUS MEAN?
  // --------------------------------------------------

  {
    type: "addition-objects",
    teaching: true,
    prompt: "When you put two circles together with two more circles, you are adding them.",
    teachingText: "Adding means putting groups together.",
    answer: null,
    options: [],
    operation: "+",
    values: [2, 2],
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "addition-objects",
    teaching: true,
    prompt: "Two circles plus two circles makes four circles.",
    teachingText: "Two circles and two more circles make four circles altogether.",
    answer: null,
    options: [],
    operation: "+",
    values: [2, 2],
    object: shapes.circle,
    color: colors.blue,
  },

  // --------------------------------------------------
  // PART 3 — FIRST VISUAL ADDITION
  // --------------------------------------------------

  {
    type: "addition-objects",
    prompt: "How many circles are there altogether?",
    answer: "4",
    options: ["3", "4", "5"],
    operation: "+",
    values: [2, 2],
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "addition-objects",
    prompt: "How many squares are there altogether?",
    answer: "5",
    options: ["4", "5", "6"],
    operation: "+",
    values: [2, 3],
    object: shapes.square,
    color: colors.red,
  },

  {
    type: "addition-objects",
    prompt: "How many triangles are there altogether?",
    answer: "5",
    options: ["4", "5", "6"],
    operation: "+",
    values: [3, 2],
    object: shapes.triangle,
    color: colors.yellow,
  },

  // --------------------------------------------------
  // PART 4 — VISUAL ADDITION WITH LARGER GROUPS
  // --------------------------------------------------

  {
    type: "addition-objects",
    prompt: "How many stars are there altogether?",
    answer: "7",
    options: ["6", "7", "8"],
    operation: "+",
    values: [4, 3],
    object: shapes.star,
    color: colors.purple,
  },

  {
    type: "addition-objects",
    prompt: "How many hearts are there altogether?",
    answer: "8",
    options: ["7", "8", "9"],
    operation: "+",
    values: [4, 4],
    object: shapes.heart,
    color: colors.red,
  },

  {
    type: "addition-objects",
    prompt: "How many circles are there altogether?",
    answer: "9",
    options: ["8", "9", "10"],
    operation: "+",
    values: [5, 4],
    object: shapes.circle,
    color: colors.green,
  },

  // --------------------------------------------------
  // PART 5 — INTRODUCE NUMBER ADDITION
  // --------------------------------------------------

  {
    type: "addition-numbers",
    teaching: true,
    prompt: "Now we can use numbers to show addition.",
    teachingText: "Two plus two equals four.",
    answer: null,
    options: [],
    operation: "+",
    values: [2, 2],
  },

  {
    type: "addition-numbers",
    prompt: "2 + 2 = ?",
    answer: "4",
    options: ["3", "4", "5"],
    operation: "+",
    values: [2, 2],
  },

  {
    type: "addition-numbers",
    prompt: "2 + 3 = ?",
    answer: "5",
    options: ["4", "5", "6"],
    operation: "+",
    values: [2, 3],
  },

  {
    type: "addition-numbers",
    prompt: "3 + 2 = ?",
    answer: "5",
    options: ["4", "5", "6"],
    operation: "+",
    values: [3, 2],
  },

  // --------------------------------------------------
  // PART 6 — BUILDING CONFIDENCE
  // --------------------------------------------------

  {
    type: "addition-objects",
    prompt: "How many diamonds are there altogether?",
    answer: "7",
    options: ["6", "7", "8"],
    operation: "+",
    values: [3, 4],
    object: shapes.diamond,
    color: colors.blue,
  },

  {
    type: "addition-numbers",
    prompt: "4 + 2 = ?",
    answer: "6",
    options: ["5", "6", "7"],
    operation: "+",
    values: [4, 2],
  },

  {
    type: "addition-objects",
    prompt: "How many pentagons are there altogether?",
    answer: "8",
    options: ["7", "8", "9"],
    operation: "+",
    values: [4, 4],
    object: shapes.pentagon,
    color: colors.yellow,
  },

  {
    type: "addition-numbers",
    prompt: "4 + 3 = ?",
    answer: "7",
    options: ["6", "7", "8"],
    operation: "+",
    values: [4, 3],
  },

  {
    type: "addition-objects",
    prompt: "How many hexagons are there altogether?",
    answer: "9",
    options: ["8", "9", "10"],
    operation: "+",
    values: [5, 4],
    object: shapes.hexagon,
    color: colors.orange,
  },

  {
    type: "addition-numbers",
    prompt: "5 + 3 = ?",
    answer: "8",
    options: ["7", "8", "9"],
    operation: "+",
    values: [5, 3],
  },

  {
    type: "addition-numbers",
    prompt: "5 + 4 = ?",
    answer: "9",
    options: ["8", "9", "10"],
    operation: "+",
    values: [5, 4],
  },
];