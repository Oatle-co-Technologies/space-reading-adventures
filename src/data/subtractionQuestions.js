import { shapes, colors } from "./mathConstants";

export const subtractionQuestions = [
  // --------------------------------------------------
  // PART 1 — INTRODUCE THE MINUS SIGN
  // --------------------------------------------------

  {
    type: "subtraction-introduction",
    teaching: true,
    prompt: "This is a minus sign: −",
    teachingText: "The minus sign means we are taking something away.",
    answer: null,
    options: [],
    operation: "-",
  },

  // --------------------------------------------------
  // PART 2 — WHAT DOES MINUS MEAN?
  // --------------------------------------------------

  {
    type: "subtraction-objects",
    teaching: true,
    prompt: "When you take circles away from a group, you are subtracting them.",
    teachingText: "Subtracting means taking something away from a group.",
    answer: null,
    options: [],
    operation: "-",
    values: [4, 2],
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "subtraction-objects",
    teaching: true,
    prompt: "Four circles take away two circles leaves two circles.",
    teachingText: "When we take two circles away from four circles, two circles are left.",
    answer: null,
    options: [],
    operation: "-",
    values: [4, 2],
    object: shapes.circle,
    color: colors.blue,
  },

  // --------------------------------------------------
  // PART 3 — FIRST VISUAL SUBTRACTION
  // --------------------------------------------------

  {
    type: "subtraction-objects",
    prompt: "How many circles are left?",
    answer: "2",
    options: ["1", "2", "3"],
    operation: "-",
    values: [4, 2],
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "subtraction-objects",
    prompt: "How many squares are left?",
    answer: "3",
    options: ["2", "3", "4"],
    operation: "-",
    values: [5, 2],
    object: shapes.square,
    color: colors.red,
  },

  {
    type: "subtraction-objects",
    prompt: "How many triangles are left?",
    answer: "3",
    options: ["2", "3", "4"],
    operation: "-",
    values: [5, 2],
    object: shapes.triangle,
    color: colors.yellow,
  },

  // --------------------------------------------------
  // PART 4 — LARGER VISUAL SUBTRACTION
  // --------------------------------------------------

  {
    type: "subtraction-objects",
    prompt: "How many stars are left?",
    answer: "4",
    options: ["3", "4", "5"],
    operation: "-",
    values: [7, 3],
    object: shapes.star,
    color: colors.purple,
  },

  {
    type: "subtraction-objects",
    prompt: "How many hearts are left?",
    answer: "4",
    options: ["3", "4", "5"],
    operation: "-",
    values: [8, 4],
    object: shapes.heart,
    color: colors.red,
  },

  {
    type: "subtraction-objects",
    prompt: "How many diamonds are left?",
    answer: "5",
    options: ["4", "5", "6"],
    operation: "-",
    values: [8, 3],
    object: shapes.diamond,
    color: colors.blue,
  },

  // --------------------------------------------------
  // PART 5 — INTRODUCE NUMBER SUBTRACTION
  // --------------------------------------------------

  {
    type: "subtraction-numbers",
    teaching: true,
    prompt: "Now we can use numbers to show subtraction.",
    teachingText: "Four minus two equals two.",
    answer: null,
    options: [],
    operation: "-",
    values: [4, 2],
  },

  {
    type: "subtraction-numbers",
    prompt: "4 − 2 = ?",
    answer: "2",
    options: ["1", "2", "3"],
    operation: "-",
    values: [4, 2],
  },

  {
    type: "subtraction-numbers",
    prompt: "5 − 2 = ?",
    answer: "3",
    options: ["2", "3", "4"],
    operation: "-",
    values: [5, 2],
  },

  {
    type: "subtraction-numbers",
    prompt: "6 − 2 = ?",
    answer: "4",
    options: ["3", "4", "5"],
    operation: "-",
    values: [6, 2],
  },

  // --------------------------------------------------
  // PART 6 — BUILDING CONFIDENCE
  // --------------------------------------------------

  {
    type: "subtraction-objects",
    prompt: "How many pentagons are left?",
    answer: "4",
    options: ["3", "4", "5"],
    operation: "-",
    values: [7, 3],
    object: shapes.pentagon,
    color: colors.yellow,
  },

  {
    type: "subtraction-numbers",
    prompt: "7 − 3 = ?",
    answer: "4",
    options: ["3", "4", "5"],
    operation: "-",
    values: [7, 3],
  },

  {
    type: "subtraction-objects",
    prompt: "How many hexagons are left?",
    answer: "5",
    options: ["4", "5", "6"],
    operation: "-",
    values: [9, 4],
    object: shapes.hexagon,
    color: colors.orange,
  },

  {
    type: "subtraction-numbers",
    prompt: "8 − 3 = ?",
    answer: "5",
    options: ["4", "5", "6"],
    operation: "-",
    values: [8, 3],
  },

  {
    type: "subtraction-objects",
    prompt: "How many stars are left?",
    answer: "6",
    options: ["5", "6", "7"],
    operation: "-",
    values: [10, 4],
    object: shapes.star,
    color: colors.purple,
  },

  {
    type: "subtraction-numbers",
    prompt: "10 − 4 = ?",
    answer: "6",
    options: ["5", "6", "7"],
    operation: "-",
    values: [10, 4],
  },
];