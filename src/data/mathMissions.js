const choice = (prompt, answer, options, extra = {}) => ({
  prompt,
  answer: String(answer),
  options: options.map(String),
  ...extra,
});

const shapes = {
  circle: "circle",
  square: "square",
  triangle: "triangle",
  rectangle: "rectangle",
  star: "star",
  oval: "oval",
};

const colors = {
  red: "#ef5b5b",
  yellow: "#ffd45c",
  blue: "#55c6ff",
  green: "#66d17a",
  orange: "#ff9f43",
  purple: "#a875e8",
  redOrange: "#f2764f",
  yellowOrange: "#ffc247",
  yellowGreen: "#a9cf54",
  blueGreen: "#4abfa5",
  bluePurple: "#6878d8",
  redPurple: "#c260a8",
};

export const mathMissions = [
  {
    id: 1,
    title: "Number recognition",
    description: "Meet the numbers from 0 to 20.",
    color: "#ffbd59",
    questions: [
      choice("Which number is this?", 0, [0, 3, 5], { display: "0" }),
      choice("Which number is this?", 7, [4, 7, 9], { display: "7" }),
      choice("Which number is this?", 12, [10, 12, 20], { display: "12" }),
      choice("Which number is this?", 20, [2, 12, 20], { display: "20" }),
      choice("Which number is this?", 15, [5, 15, 18], { display: "15" }),
    ],
  },
  {
    id: 2,
    title: "Counting shapes",
    description: "Count the shapes in each space group.",
    color: "#55c6ff",
    questions: [
      choice("How many circles do you see?", 3, [2, 3, 4], { shape: shapes.circle, count: 3 }),
      choice("How many squares do you see?", 5, [4, 5, 6], { shape: shapes.square, count: 5 }),
      choice("How many triangles do you see?", 7, [6, 7, 8], { shape: shapes.triangle, count: 7 }),
      choice("How many stars do you see?", 8, [6, 8, 10], { shape: shapes.star, count: 8 }),
      choice("How many ovals do you see?", 10, [8, 9, 10], { shape: shapes.oval, count: 10 }),
    ],
  },
  {
    id: 3,
    title: "Primary colours",
    description: "Find red, yellow, and blue.",
    color: "#ef5b5b",
    questions: [
      choice("Find the red shape.", "red", ["red", "yellow", "blue"], { color: colors.red, shape: shapes.circle }),
      choice("Find the yellow shape.", "yellow", ["blue", "yellow", "red"], { color: colors.yellow, shape: shapes.square }),
      choice("Find the blue shape.", "blue", ["yellow", "red", "blue"], { color: colors.blue, shape: shapes.triangle }),
      choice("What colour is this shape?", "red", ["red", "blue", "yellow"], { color: colors.red, shape: shapes.star }),
      choice("What colour is this shape?", "blue", ["yellow", "blue", "red"], { color: colors.blue, shape: shapes.oval }),
    ],
  },
  {
    id: 4,
    title: "Tertiary colours",
    description: "Explore colours made by mixing nearby colours.",
    color: "#a875e8",
    questions: [
      choice("Find red-orange.", "red-orange", ["red-orange", "blue-green", "yellow-green"], { color: colors.redOrange, shape: shapes.circle }),
      choice("Find yellow-orange.", "yellow-orange", ["blue-purple", "yellow-orange", "red-purple"], { color: colors.yellowOrange, shape: shapes.square }),
      choice("Find yellow-green.", "yellow-green", ["red-orange", "yellow-green", "blue-purple"], { color: colors.yellowGreen, shape: shapes.triangle }),
      choice("Find blue-green.", "blue-green", ["red-purple", "blue-green", "yellow-orange"], { color: colors.blueGreen, shape: shapes.star }),
      choice("Find blue-purple.", "blue-purple", ["blue-purple", "yellow-green", "red-orange"], { color: colors.bluePurple, shape: shapes.oval }),
    ],
  },
  {
    id: 5,
    title: "Matching and sorting",
    description: "Match and sort by colour, shape, and number.",
    color: "#66d17a",
    questions: [
      choice("Which shape matches the red circle?", "red circle", ["blue circle", "red circle", "red square"], { match: { color: colors.red, shape: shapes.circle } }),
      choice("Which group has only triangles?", "triangles", ["circles", "squares", "triangles"], { sort: shapes.triangle }),
      choice("Which group has the most shapes?", "5", ["3", "5", "4"], { groups: [3, 5, 4] }),
      choice("Which shape does not belong?", "triangle", ["circle", "square", "triangle"], { oddOneOut: [shapes.circle, shapes.square, shapes.triangle] }),
      choice("Sort this shape by colour.", "blue", ["red", "blue", "yellow"], { color: colors.blue, shape: shapes.oval }),
    ],
  },
  {
    id: 6,
    title: "Adding numbers",
    description: "Put space objects together to find the total.",
    color: "#ff9f43",
    questions: [
      choice("1 star and 1 star make", 2, [1, 2, 3], { operation: "+", values: [1, 1] }),
      choice("2 planets and 1 planet make", 3, [2, 3, 4], { operation: "+", values: [2, 1] }),
      choice("3 stars and 2 stars make", 5, [4, 5, 6], { operation: "+", values: [3, 2] }),
      choice("4 moons and 3 moons make", 7, [6, 7, 8], { operation: "+", values: [4, 3] }),
      choice("5 stars and 4 stars make", 9, [8, 9, 10], { operation: "+", values: [5, 4] }),
    ],
  },
  {
    id: 7,
    title: "Taking away",
    description: "Take objects away and count what is left.",
    color: "#76d8e8",
    questions: [
      choice("Take 1 star from 3. How many are left?", 2, [1, 2, 3], { operation: "-", values: [3, 1] }),
      choice("Take 2 planets from 5. How many are left?", 3, [2, 3, 4], { operation: "-", values: [5, 2] }),
      choice("Take 3 moons from 7. How many are left?", 4, [3, 4, 5], { operation: "-", values: [7, 3] }),
      choice("Take 2 stars from 8. How many are left?", 6, [5, 6, 7], { operation: "-", values: [8, 2] }),
      choice("Take 4 planets from 10. How many are left?", 6, [5, 6, 7], { operation: "-", values: [10, 4] }),
    ],
  },
  {
    id: 8,
    title: "Making equal groups",
    description: "Learn multiplication by making equal groups.",
    color: "#c260a8",
    questions: [
      choice("2 groups of 2 stars make", 4, [3, 4, 5], { operation: "x", values: [2, 2] }),
      choice("3 groups of 2 planets make", 6, [5, 6, 7], { operation: "x", values: [3, 2] }),
      choice("2 groups of 3 moons make", 6, [5, 6, 8], { operation: "x", values: [2, 3] }),
      choice("3 groups of 3 stars make", 9, [6, 8, 9], { operation: "x", values: [3, 3] }),
      choice("2 groups of 5 planets make", 10, [8, 9, 10], { operation: "x", values: [2, 5] }),
    ],
  },
  {
    id: 9,
    title: "Maths assessment",
    description: "Show what you know across the space missions.",
    color: "#d9c5a4",
    assessment: true,
    questions: [
      choice("Which number is this?", 18, [8, 12, 18], { display: "18", skill: "numbers" }),
      choice("How many triangles do you see?", 4, [3, 4, 5], { shape: shapes.triangle, count: 4, skill: "counting" }),
      choice("What colour is this shape?", "blue", ["red", "blue", "yellow"], { color: colors.blue, shape: shapes.circle, skill: "colours" }),
      choice("Which group has the most shapes?", "6", ["4", "6", "5"], { groups: [4, 6, 5], skill: "sorting" }),
      choice("2 stars and 3 stars make", 5, [4, 5, 6], { operation: "+", values: [2, 3], skill: "addition" }),
      choice("Take 2 from 6. How many are left?", 4, [3, 4, 5], { operation: "-", values: [6, 2], skill: "subtraction" }),
      choice("2 groups of 2 make", 4, [3, 4, 5], { operation: "x", values: [2, 2], skill: "groups" }),
    ],
  },
];

export { colors, shapes };
