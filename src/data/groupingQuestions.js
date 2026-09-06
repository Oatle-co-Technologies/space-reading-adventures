import { shapes, colors } from "./mathConstants";

export const groupingQuestions = [
  // --------------------------------------------------
  // PART 1 — DISCOVER EQUAL GROUPS
  // --------------------------------------------------

  {
    type: "equal-groups",
    teaching: true,
    prompt: "These are equal groups.",
    teachingText: "Equal groups have the same number of shapes.",
    answer: null,
    options: [],
    total: 4,
    groupsCount: 2,
    groups: [2, 2],
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "equal-groups",
    teaching: true,
    prompt: "Each group has two circles.",
    teachingText: "Two circles and two circles are equal groups.",
    answer: null,
    options: [],
    total: 4,
    groupsCount: 2,
    groups: [2, 2],
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "equal-groups",
    prompt: "How many circles are in each group?",
    answer: "2",
    options: ["1", "2", "3"],
    total: 4,
    groupsCount: 2,
    groups: [2, 2],
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "equal-groups",
    prompt: "How many squares are in each group?",
    answer: "3",
    options: ["2", "3", "4"],
    total: 6,
    groupsCount: 2,
    groups: [3, 3],
    object: shapes.square,
    color: colors.red,
  },

  // --------------------------------------------------
  // PART 2 — INTRODUCE MULTIPLICATION
  // --------------------------------------------------

  {
    type: "multiplication-introduction",
    teaching: true,
    prompt: "This is the multiplication sign: ×",
    teachingText: "The multiplication sign means equal groups of the same size.",
    answer: null,
    options: [],
    operation: "×",
  },

  {
    type: "equal-groups",
    teaching: true,
    prompt: "These are two groups of three triangles.",
    teachingText: "Two groups of three triangles make six triangles altogether.",
    answer: null,
    options: [],
    total: 6,
    groupsCount: 2,
    groups: [3, 3],
    object: shapes.triangle,
    color: colors.yellow,
    operation: "×",
    multiplication: true,
  },

  {
    type: "equal-groups",
    teaching: true,
    prompt: "Two groups of three triangles is six triangles.",
    teachingText: "Two groups of three is the same as two times three.",
    answer: null,
    options: [],
    total: 6,
    groupsCount: 2,
    groups: [3, 3],
    object: shapes.triangle,
    color: colors.yellow,
    operation: "×",
    multiplication: true,
  },

  // --------------------------------------------------
  // PART 3 — FIRST VISUAL MULTIPLICATION
  // --------------------------------------------------

  {
    type: "equal-groups",
    prompt: "How many triangles are there altogether?",
    answer: "6",
    options: ["5", "6", "7"],
    total: 6,
    groupsCount: 2,
    groups: [3, 3],
    object: shapes.triangle,
    color: colors.yellow,
    operation: "×",
    multiplication: true,
  },

  {
    type: "equal-groups",
    prompt: "How many circles are there altogether?",
    answer: "6",
    options: ["5", "6", "7"],
    total: 6,
    groupsCount: 3,
    groups: [2, 2, 2],
    object: shapes.circle,
    color: colors.blue,
    operation: "×",
    multiplication: true,
  },

  {
    type: "equal-groups",
    prompt: "How many squares are there altogether?",
    answer: "8",
    options: ["7", "8", "9"],
    total: 8,
    groupsCount: 2,
    groups: [4, 4],
    object: shapes.square,
    color: colors.red,
    operation: "×",
    multiplication: true,
  },

  {
    type: "equal-groups",
    prompt: "How many stars are there altogether?",
    answer: "9",
    options: ["8", "9", "10"],
    total: 9,
    groupsCount: 3,
    groups: [3, 3, 3],
    object: shapes.star,
    color: colors.purple,
    operation: "×",
    multiplication: true,
  },

  // --------------------------------------------------
  // PART 4 — INTRODUCE MULTIPLICATION EQUATIONS
  // --------------------------------------------------

  {
    type: "multiplication-numbers",
    teaching: true,
    prompt: "Now we can use numbers to show multiplication.",
    teachingText: "Two groups of three is two times three. Two times three equals six.",
    answer: null,
    options: [],
    operation: "×",
    values: [2, 3],
  },

  {
    type: "multiplication-numbers",
    prompt: "2 × 3 = ?",
    answer: "6",
    options: ["5", "6", "7"],
    operation: "×",
    values: [2, 3],
  },

  {
    type: "multiplication-numbers",
    prompt: "3 × 2 = ?",
    answer: "6",
    options: ["5", "6", "7"],
    operation: "×",
    values: [3, 2],
  },

  {
    type: "multiplication-numbers",
    prompt: "2 × 4 = ?",
    answer: "8",
    options: ["7", "8", "9"],
    operation: "×",
    values: [2, 4],
  },

  {
    type: "multiplication-numbers",
    prompt: "3 × 3 = ?",
    answer: "9",
    options: ["8", "9", "10"],
    operation: "×",
    values: [3, 3],
  },

  // --------------------------------------------------
  // PART 5 — MORE MULTIPLICATION WITH FAMILIAR SHAPES
  // --------------------------------------------------

  {
    type: "equal-groups",
    prompt: "How many hearts are there altogether?",
    answer: "8",
    options: ["7", "8", "9"],
    total: 8,
    groupsCount: 2,
    groups: [4, 4],
    object: shapes.heart,
    color: colors.red,
    operation: "×",
    multiplication: true,
  },

  {
    type: "multiplication-numbers",
    prompt: "2 × 5 = ?",
    answer: "10",
    options: ["8", "10", "12"],
    operation: "×",
    values: [2, 5],
  },

  {
    type: "equal-groups",
    prompt: "How many diamonds are there altogether?",
    answer: "10",
    options: ["9", "10", "11"],
    total: 10,
    groupsCount: 2,
    groups: [5, 5],
    object: shapes.diamond,
    color: colors.blue,
    operation: "×",
    multiplication: true,
  },

  {
    type: "multiplication-numbers",
    prompt: "2 × 5 = ?",
    answer: "10",
    options: ["8", "10", "12"],
    operation: "×",
    values: [2, 5],
  },

  // --------------------------------------------------
  // PART 6 — RETURN TO EQUAL GROUPS AND SHARING
  // --------------------------------------------------

  {
    type: "sharing",
    teaching: true,
    prompt: "We can also share shapes into equal groups.",
    teachingText: "Sharing means giving the same number to each group.",
    answer: null,
    options: [],
    total: 4,
    groupsCount: 2,
    groups: [2, 2],
    friends: 2,
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "sharing",
    teaching: true,
    prompt: "Four circles shared between two groups gives two circles to each group.",
    teachingText: "When we share equally, every group gets the same number.",
    answer: null,
    options: [],
    total: 4,
    groupsCount: 2,
    groups: [2, 2],
    friends: 2,
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "sharing",
    prompt: "How many circles does each group get?",
    answer: "2",
    options: ["1", "2", "3"],
    total: 4,
    groupsCount: 2,
    groups: [2, 2],
    friends: 2,
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "sharing",
    prompt: "How many squares does each group get?",
    answer: "3",
    options: ["2", "3", "4"],
    total: 6,
    groupsCount: 2,
    groups: [3, 3],
    friends: 2,
    object: shapes.square,
    color: colors.red,
  },

  {
    type: "sharing",
    prompt: "How many triangles does each group get?",
    answer: "2",
    options: ["1", "2", "3"],
    total: 6,
    groupsCount: 3,
    groups: [2, 2, 2],
    friends: 3,
    object: shapes.triangle,
    color: colors.yellow,
  },

  // --------------------------------------------------
  // PART 7 — INTRODUCE THE DIVISION SIGN
  // --------------------------------------------------

  {
    type: "division-introduction",
    teaching: true,
    prompt: "This is the division sign: ÷",
    teachingText: "The division sign means sharing or splitting into equal groups.",
    answer: null,
    options: [],
    total: 4,
    groupsCount: 2,
    groups: [2, 2],
    friends: 2,
    object: shapes.circle,
    color: colors.blue,
  },

  {
    type: "sharing",
    teaching: true,
    prompt: "Four circles divided into two equal groups gives two circles in each group.",
    teachingText: "Four divided by two equals two.",
    answer: null,
    options: [],
    total: 4,
    groupsCount: 2,
    groups: [2, 2],
    friends: 2,
    object: shapes.circle,
    color: colors.blue,
    dividend: 4,
    divisor: 2,
  },

  // --------------------------------------------------
  // PART 8 — VISUAL DIVISION
  // --------------------------------------------------

  {
    type: "sharing",
    prompt: "How many circles are in each group?",
    answer: "2",
    options: ["1", "2", "3"],
    total: 4,
    groupsCount: 2,
    groups: [2, 2],
    friends: 2,
    object: shapes.circle,
    color: colors.blue,
    dividend: 4,
    divisor: 2,
  },

  {
    type: "sharing",
    prompt: "How many squares are in each group?",
    answer: "3",
    options: ["2", "3", "4"],
    total: 6,
    groupsCount: 2,
    groups: [3, 3],
    friends: 2,
    object: shapes.square,
    color: colors.red,
    dividend: 6,
    divisor: 2,
  },

  {
    type: "sharing",
    prompt: "How many triangles are in each group?",
    answer: "3",
    options: ["2", "3", "4"],
    total: 9,
    groupsCount: 3,
    groups: [3, 3, 3],
    friends: 3,
    object: shapes.triangle,
    color: colors.yellow,
    dividend: 9,
    divisor: 3,
  },

  {
    type: "sharing",
    prompt: "How many stars are in each group?",
    answer: "4",
    options: ["3", "4", "5"],
    total: 8,
    groupsCount: 2,
    groups: [4, 4],
    friends: 2,
    object: shapes.star,
    color: colors.purple,
    dividend: 8,
    divisor: 2,
  },

  // --------------------------------------------------
  // PART 9 — NUMBER DIVISION
  // --------------------------------------------------

  {
    type: "division-numbers",
    prompt: "2 ÷ 1 = ?",
    answer: "2",
    options: ["1", "2", "3"],
    dividend: 2,
    divisor: 1,
  },

  {
    type: "division-numbers",
    prompt: "4 ÷ 2 = ?",
    answer: "2",
    options: ["1", "2", "3"],
    dividend: 4,
    divisor: 2,
  },

  {
    type: "division-numbers",
    prompt: "6 ÷ 2 = ?",
    answer: "3",
    options: ["2", "3", "4"],
    dividend: 6,
    divisor: 2,
  },

  {
    type: "division-numbers",
    prompt: "6 ÷ 3 = ?",
    answer: "2",
    options: ["1", "2", "3"],
    dividend: 6,
    divisor: 3,
  },

  {
    type: "division-numbers",
    prompt: "8 ÷ 2 = ?",
    answer: "4",
    options: ["3", "4", "5"],
    dividend: 8,
    divisor: 2,
  },

  {
    type: "division-numbers",
    prompt: "8 ÷ 4 = ?",
    answer: "2",
    options: ["1", "2", "3"],
    dividend: 8,
    divisor: 4,
  },

  {
    type: "division-numbers",
    prompt: "9 ÷ 3 = ?",
    answer: "3",
    options: ["2", "3", "4"],
    dividend: 9,
    divisor: 3,
  },

  {
    type: "division-numbers",
    prompt: "10 ÷ 2 = ?",
    answer: "5",
    options: ["4", "5", "6"],
    dividend: 10,
    divisor: 2,
  },

  {
    type: "division-numbers",
    prompt: "10 ÷ 5 = ?",
    answer: "2",
    options: ["1", "2", "3"],
    dividend: 10,
    divisor: 5,
  },
];