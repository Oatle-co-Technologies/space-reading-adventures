import { colors, shapes } from "./mathConstants";

export const mathMatchingQuestions = [
  // -------------------------------------------------------
  // 1. MATCH BY SHAPE
  // -------------------------------------------------------

  {
    type: "matching",
    prompt: "Which shape matches?",
    answer: "circle",
    options: ["square", "circle", "triangle"],
    match: {
      color: colors.blue,
      shape: shapes.circle,
    },
  },

  {
    type: "matching",
    prompt: "Which shape matches?",
    answer: "star",
    options: ["heart", "star", "diamond"],
    match: {
      color: colors.yellow,
      shape: shapes.star,
    },
  },

  {
    type: "matching",
    prompt: "Which shape matches?",
    answer: "triangle",
    options: ["triangle", "oval", "square"],
    match: {
      color: colors.red,
      shape: shapes.triangle,
    },
  },

  {
    type: "matching",
    prompt: "Which shape matches?",
    answer: "heart",
    options: ["diamond", "heart", "circle"],
    match: {
      color: colors.pink,
      shape: shapes.heart,
    },
  },

  {
    type: "matching",
    prompt: "Which shape matches?",
    answer: "hexagon",
    options: ["pentagon", "hexagon", "octagon"],
    match: {
      color: colors.green,
      shape: shapes.hexagon,
    },
  },

  // -------------------------------------------------------
  // 2. MATCH BY COLOUR
  // -------------------------------------------------------

  {
    type: "matching",
    prompt: "Which colour matches?",
    answer: "red",
    options: ["blue", "red", "yellow"],
    match: {
      color: colors.red,
      shape: shapes.circle,
    },
  },

  {
    type: "matching",
    prompt: "Which colour matches?",
    answer: "yellow",
    options: ["green", "yellow", "blue"],
    match: {
      color: colors.yellow,
      shape: shapes.square,
    },
  },

  {
    type: "matching",
    prompt: "Which colour matches?",
    answer: "blue",
    options: ["red", "blue", "purple"],
    match: {
      color: colors.blue,
      shape: shapes.triangle,
    },
  },

  {
    type: "matching",
    prompt: "Which colour matches?",
    answer: "green",
    options: ["green", "orange", "purple"],
    match: {
      color: colors.green,
      shape: shapes.star,
    },
  },

  {
    type: "matching",
    prompt: "Which colour matches?",
    answer: "purple",
    options: ["yellow", "purple", "red"],
    match: {
      color: colors.purple,
      shape: shapes.heart,
    },
  },

  // -------------------------------------------------------
  // 3. MATCH NUMBER TO QUANTITY
  // -------------------------------------------------------

  {
    type: "matching",
    prompt: "Which number matches these stars?",
    answer: "3",
    options: ["2", "3", "4"],
    quantity: 3,
    matchShape: shapes.star,
  },

  {
    type: "matching",
    prompt: "Which number matches these hearts?",
    answer: "4",
    options: ["3", "4", "5"],
    quantity: 4,
    matchShape: shapes.heart,
  },

  {
    type: "matching",
    prompt: "Which number matches these circles?",
    answer: "5",
    options: ["4", "5", "6"],
    quantity: 5,
    matchShape: shapes.circle,
  },

  {
    type: "matching",
    prompt: "Which number matches these triangles?",
    answer: "6",
    options: ["5", "6", "7"],
    quantity: 6,
    matchShape: shapes.triangle,
  },

  {
    type: "matching",
    prompt: "Which number matches these squares?",
    answer: "7",
    options: ["6", "7", "8"],
    quantity: 7,
    matchShape: shapes.square,
  },

  // -------------------------------------------------------
  // 4. SORT BY SHAPE
  // -------------------------------------------------------

  {
    type: "sorting",
    prompt: "Put the circles together.",
    answer: shapes.circle,
    options: [shapes.square, shapes.circle, shapes.triangle],
    sort: shapes.circle,
  },

  {
    type: "sorting",
    prompt: "Put the stars together.",
    answer: shapes.star,
    options: [shapes.heart, shapes.star, shapes.diamond],
    sort: shapes.star,
  },

  {
    type: "sorting",
    prompt: "Put the triangles together.",
    answer: shapes.triangle,
    options: [shapes.oval, shapes.triangle, shapes.square],
    sort: shapes.triangle,
  },

  {
    type: "sorting",
    prompt: "Put the hearts together.",
    answer: shapes.heart,
    options: [shapes.circle, shapes.heart, shapes.pentagon],
    sort: shapes.heart,
  },

  {
    type: "sorting",
    prompt: "Put the hexagons together.",
    answer: shapes.hexagon,
    options: [shapes.octagon, shapes.hexagon, shapes.diamond],
    sort: shapes.hexagon,
  },

  // -------------------------------------------------------
  // 5. SORT BY COLOUR
  // -------------------------------------------------------

  {
    type: "sorting",
    prompt: "Put the red things together.",
    answer: "red",
    options: ["blue", "red", "yellow"],
    color: colors.red,
    shape: shapes.circle,
    sortColor: "red",
  },

  {
    type: "sorting",
    prompt: "Put the yellow things together.",
    answer: "yellow",
    options: ["green", "yellow", "blue"],
    color: colors.yellow,
    shape: shapes.square,
    sortColor: "yellow",
  },

  {
    type: "sorting",
    prompt: "Put the blue things together.",
    answer: "blue",
    options: ["red", "blue", "purple"],
    color: colors.blue,
    shape: shapes.triangle,
    sortColor: "blue",
  },

  {
    type: "sorting",
    prompt: "Put the green things together.",
    answer: "green",
    options: ["green", "orange", "purple"],
    color: colors.green,
    shape: shapes.star,
    sortColor: "green",
  },

  {
    type: "sorting",
    prompt: "Put the purple things together.",
    answer: "purple",
    options: ["yellow", "purple", "red"],
    color: colors.purple,
    shape: shapes.heart,
    sortColor: "purple",
  },

  // -------------------------------------------------------
  // 6. SORT USING TWO PROPERTIES
  // -------------------------------------------------------
  // These use actual colour + shape combinations.
  // The child must look for BOTH properties.
  // -------------------------------------------------------

  {
    type: "matching",
    prompt: "Find the red triangle.",
    answer: "red triangle",
    options: [
      "blue triangle",
      "red star",
      "red triangle",
    ],
    match: {
      color: colors.red,
      shape: shapes.triangle,
    },
  },

  {
    type: "matching",
    prompt: "Find the blue circle.",
    answer: "blue circle",
    options: [
      "blue square",
      "red circle",
      "blue circle",
    ],
    match: {
      color: colors.blue,
      shape: shapes.circle,
    },
  },

  {
    type: "matching",
    prompt: "Find the yellow star.",
    answer: "yellow star",
    options: [
      "yellow star",
      "red star",
      "yellow heart",
    ],
    match: {
      color: colors.yellow,
      shape: shapes.star,
    },
  },

  {
    type: "matching",
    prompt: "Find the green heart.",
    answer: "green heart",
    options: [
      "green circle",
      "green heart",
      "blue heart",
    ],
    match: {
      color: colors.green,
      shape: shapes.heart,
    },
  },

  {
    type: "matching",
    prompt: "Find the purple diamond.",
    answer: "purple diamond",
    options: [
      "purple diamond",
      "red diamond",
      "purple square",
    ],
    match: {
      color: colors.purple,
      shape: shapes.diamond,
    },
  },
];