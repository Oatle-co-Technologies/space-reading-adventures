import { colors, shapes } from "./mathConstants";

export const mathMatchingQuestions = [
  // =========================================================
  // 1. MATCH BY SHAPE
  // =========================================================

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

  // =========================================================
  // 2. MATCH BY COLOUR
  // =========================================================

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

  // =========================================================
  // 3. MATCH NUMBER TO QUANTITY
  // =========================================================

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

  // =========================================================
  // 4. SORT BY SHAPE — DRAG INTO THE BOX
  // =========================================================

  {
    type: "sorting",
    mode: "shape",
    prompt: "Put the circles together.",
    sort: shapes.circle,

    items: [
      { id: "circle-1", shape: shapes.circle, color: colors.red },
      { id: "star-1", shape: shapes.star, color: colors.blue },
      { id: "circle-2", shape: shapes.circle, color: colors.yellow },
      { id: "triangle-1", shape: shapes.triangle, color: colors.green },
      { id: "circle-3", shape: shapes.circle, color: colors.purple },
      { id: "heart-1", shape: shapes.heart, color: colors.pink },
      { id: "circle-4", shape: shapes.circle, color: colors.orange },
      { id: "square-1", shape: shapes.square, color: colors.blue },
    ],

    zones: [
      {
        id: "circle-zone",
        targetShape: shapes.circle,
      },
    ],
  },

  {
    type: "sorting",
    mode: "shape",
    prompt: "Put the stars together.",
    sort: shapes.star,

    items: [
      { id: "star-1", shape: shapes.star, color: colors.yellow },
      { id: "circle-1", shape: shapes.circle, color: colors.blue },
      { id: "star-2", shape: shapes.star, color: colors.red },
      { id: "triangle-1", shape: shapes.triangle, color: colors.green },
      { id: "star-3", shape: shapes.star, color: colors.purple },
      { id: "heart-1", shape: shapes.heart, color: colors.pink },
      { id: "star-4", shape: shapes.star, color: colors.orange },
      { id: "square-1", shape: shapes.square, color: colors.blue },
    ],

    zones: [
      {
        id: "star-zone",
        targetShape: shapes.star,
      },
    ],
  },

  {
    type: "sorting",
    mode: "shape",
    prompt: "Put the triangles together.",
    sort: shapes.triangle,

    items: [
      { id: "triangle-1", shape: shapes.triangle, color: colors.red },
      { id: "circle-1", shape: shapes.circle, color: colors.blue },
      { id: "triangle-2", shape: shapes.triangle, color: colors.yellow },
      { id: "square-1", shape: shapes.square, color: colors.green },
      { id: "triangle-3", shape: shapes.triangle, color: colors.purple },
      { id: "heart-1", shape: shapes.heart, color: colors.pink },
      { id: "triangle-4", shape: shapes.triangle, color: colors.orange },
      { id: "star-1", shape: shapes.star, color: colors.blue },
    ],

    zones: [
      {
        id: "triangle-zone",
        targetShape: shapes.triangle,
      },
    ],
  },

  {
    type: "sorting",
    mode: "shape",
    prompt: "Put the hearts together.",
    sort: shapes.heart,

    items: [
      { id: "heart-1", shape: shapes.heart, color: colors.red },
      { id: "square-1", shape: shapes.square, color: colors.blue },
      { id: "heart-2", shape: shapes.heart, color: colors.yellow },
      { id: "diamond-1", shape: shapes.diamond, color: colors.green },
      { id: "heart-3", shape: shapes.heart, color: colors.purple },
      { id: "circle-1", shape: shapes.circle, color: colors.orange },
      { id: "heart-4", shape: shapes.heart, color: colors.pink },
      { id: "star-1", shape: shapes.star, color: colors.blue },
    ],

    zones: [
      {
        id: "heart-zone",
        targetShape: shapes.heart,
      },
    ],
  },

  {
    type: "sorting",
    mode: "shape",
    prompt: "Put the diamonds together.",
    sort: shapes.diamond,

    items: [
      { id: "diamond-1", shape: shapes.diamond, color: colors.red },
      { id: "star-1", shape: shapes.star, color: colors.blue },
      { id: "diamond-2", shape: shapes.diamond, color: colors.yellow },
      { id: "circle-1", shape: shapes.circle, color: colors.green },
      { id: "diamond-3", shape: shapes.diamond, color: colors.purple },
      { id: "triangle-1", shape: shapes.triangle, color: colors.orange },
      { id: "diamond-4", shape: shapes.diamond, color: colors.pink },
      { id: "heart-1", shape: shapes.heart, color: colors.blue },
    ],

    zones: [
      {
        id: "diamond-zone",
        targetShape: shapes.diamond,
      },
    ],
  },

  // =========================================================
  // 5. SORT BY COLOUR
  // =========================================================

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

  // =========================================================
  // 6. TWO-PROPERTY SORTING
  // =========================================================

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