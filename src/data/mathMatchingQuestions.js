import { colors, shapes } from "./mathConstants";

export const mathMatchingQuestions = [
  /*
   * ------------------------------------------------------
   * MATCH BY SHAPE
   * ------------------------------------------------------
   */

  {
    type: "matching",
    prompt: "Which shape matches the circle?",
    answer: "circle",
    options: [
      "circle",
      "square",
      "triangle",
    ],
    match: {
      shape: shapes.circle,
      color: colors.blue,
    },
  },

  {
    type: "matching",
    prompt: "Which shape matches the star?",
    answer: "star",
    options: [
      "triangle",
      "star",
      "heart",
    ],
    match: {
      shape: shapes.star,
      color: colors.yellow,
    },
  },

  {
    type: "matching",
    prompt: "Which shape matches the triangle?",
    answer: "triangle",
    options: [
      "triangle",
      "circle",
      "square",
    ],
    match: {
      shape: shapes.triangle,
      color: colors.green,
    },
  },

  {
    type: "matching",
    prompt: "Which shape matches the heart?",
    answer: "heart",
    options: [
      "square",
      "heart",
      "star",
    ],
    match: {
      shape: shapes.heart,
      color: colors.pink,
    },
  },

  {
    type: "matching",
    prompt: "Which shape matches the diamond?",
    answer: "diamond",
    options: [
      "oval",
      "diamond",
      "circle",
    ],
    match: {
      shape: shapes.diamond,
      color: colors.purple,
    },
  },

  /*
   * ------------------------------------------------------
   * MATCH BY COLOUR
   * ------------------------------------------------------
   */

  {
    type: "matching",
    prompt: "Which shape is the same colour?",
    answer: "red",
    options: [
      "red",
      "blue",
      "yellow",
    ],
    match: {
      color: colors.red,
      shape: shapes.circle,
    },
  },

  {
    type: "matching",
    prompt: "Which shape is the same colour?",
    answer: "yellow",
    options: [
      "blue",
      "yellow",
      "red",
    ],
    match: {
      color: colors.yellow,
      shape: shapes.square,
    },
  },

  {
    type: "matching",
    prompt: "Which shape is the same colour?",
    answer: "blue",
    options: [
      "yellow",
      "red",
      "blue",
    ],
    match: {
      color: colors.blue,
      shape: shapes.triangle,
    },
  },

  {
    type: "matching",
    prompt: "Which shape is the same colour?",
    answer: "green",
    options: [
      "purple",
      "green",
      "orange",
    ],
    match: {
      color: colors.green,
      shape: shapes.star,
    },
  },

  {
    type: "matching",
    prompt: "Which shape is the same colour?",
    answer: "purple",
    options: [
      "purple",
      "yellow",
      "blue",
    ],
    match: {
      color: colors.purple,
      shape: shapes.heart,
    },
  },

  /*
   * ------------------------------------------------------
   * MATCH NUMBER TO QUANTITY
   * ------------------------------------------------------
   */

  {
    type: "matching",
    prompt: "How many stars are there?",
    answer: 3,
    options: [2, 3, 4],
    quantity: 3,
    matchShape: shapes.star,
  },

  {
    type: "matching",
    prompt: "How many circles are there?",
    answer: 4,
    options: [3, 4, 5],
    quantity: 4,
    matchShape: shapes.circle,
  },

  {
    type: "matching",
    prompt: "How many triangles are there?",
    answer: 5,
    options: [4, 5, 6],
    quantity: 5,
    matchShape: shapes.triangle,
  },

  {
    type: "matching",
    prompt: "How many hearts are there?",
    answer: 2,
    options: [1, 2, 3],
    quantity: 2,
    matchShape: shapes.heart,
  },

  {
    type: "matching",
    prompt: "How many squares are there?",
    answer: 6,
    options: [5, 6, 7],
    quantity: 6,
    matchShape: shapes.square,
  },

  /*
   * ------------------------------------------------------
   * SORT BY SHAPE — PHYSICAL DRAG AND DROP
   * ------------------------------------------------------
   *
   * The child sees a mixed pile.
   *
   * Only the requested shapes are
   * dragged into the empty box.
   *
   * Other shapes stay in the pile.
   */

  {
    type: "sorting",
    mode: "shape",
    prompt: "Put the circles together.",
    sort: shapes.circle,

    items: [
      {
        id: "circle-1",
        shape: shapes.circle,
        color: colors.red,
      },
      {
        id: "star-1",
        shape: shapes.star,
        color: colors.blue,
      },
      {
        id: "circle-2",
        shape: shapes.circle,
        color: colors.yellow,
      },
      {
        id: "triangle-1",
        shape: shapes.triangle,
        color: colors.green,
      },
      {
        id: "circle-3",
        shape: shapes.circle,
        color: colors.purple,
      },
      {
        id: "heart-1",
        shape: shapes.heart,
        color: colors.pink,
      },
      {
        id: "circle-4",
        shape: shapes.circle,
        color: colors.orange,
      },
      {
        id: "square-1",
        shape: shapes.square,
        color: colors.blue,
      },
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
      {
        id: "circle-5",
        shape: shapes.circle,
        color: colors.blue,
      },
      {
        id: "star-2",
        shape: shapes.star,
        color: colors.purple,
      },
      {
        id: "triangle-2",
        shape: shapes.triangle,
        color: colors.green,
      },
      {
        id: "star-3",
        shape: shapes.star,
        color: colors.yellow,
      },
      {
        id: "heart-2",
        shape: shapes.heart,
        color: colors.pink,
      },
      {
        id: "star-4",
        shape: shapes.star,
        color: colors.red,
      },
      {
        id: "square-2",
        shape: shapes.square,
        color: colors.blue,
      },
      {
        id: "star-5",
        shape: shapes.star,
        color: colors.orange,
      },
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
      {
        id: "triangle-3",
        shape: shapes.triangle,
        color: colors.blue,
      },
      {
        id: "circle-6",
        shape: shapes.circle,
        color: colors.red,
      },
      {
        id: "triangle-4",
        shape: shapes.triangle,
        color: colors.yellow,
      },
      {
        id: "heart-3",
        shape: shapes.heart,
        color: colors.pink,
      },
      {
        id: "square-3",
        shape: shapes.square,
        color: colors.green,
      },
      {
        id: "triangle-5",
        shape: shapes.triangle,
        color: colors.purple,
      },
      {
        id: "star-6",
        shape: shapes.star,
        color: colors.orange,
      },
      {
        id: "triangle-6",
        shape: shapes.triangle,
        color: colors.red,
      },
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
      {
        id: "heart-4",
        shape: shapes.heart,
        color: colors.pink,
      },
      {
        id: "circle-7",
        shape: shapes.circle,
        color: colors.blue,
      },
      {
        id: "heart-5",
        shape: shapes.heart,
        color: colors.red,
      },
      {
        id: "star-7",
        shape: shapes.star,
        color: colors.yellow,
      },
      {
        id: "triangle-7",
        shape: shapes.triangle,
        color: colors.green,
      },
      {
        id: "heart-6",
        shape: shapes.heart,
        color: colors.purple,
      },
      {
        id: "square-4",
        shape: shapes.square,
        color: colors.blue,
      },
      {
        id: "heart-7",
        shape: shapes.heart,
        color: colors.orange,
      },
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
      {
        id: "diamond-1",
        shape: shapes.diamond,
        color: colors.purple,
      },
      {
        id: "star-8",
        shape: shapes.star,
        color: colors.yellow,
      },
      {
        id: "diamond-2",
        shape: shapes.diamond,
        color: colors.blue,
      },
      {
        id: "circle-8",
        shape: shapes.circle,
        color: colors.red,
      },
      {
        id: "triangle-8",
        shape: shapes.triangle,
        color: colors.green,
      },
      {
        id: "diamond-3",
        shape: shapes.diamond,
        color: colors.yellow,
      },
      {
        id: "heart-8",
        shape: shapes.heart,
        color: colors.pink,
      },
      {
        id: "diamond-4",
        shape: shapes.diamond,
        color: colors.orange,
      },
    ],

    zones: [
      {
        id: "diamond-zone",
        targetShape: shapes.diamond,
      },
    ],
  },

  /*
   * ------------------------------------------------------
   * SORT BY COLOUR — PHYSICAL DRAG AND DROP
   * ------------------------------------------------------
   *
   * SAME PRINCIPLE AS SHAPE SORTING.
   *
   * The target colour is represented
   * visually by the large coloured
   * shape above the pile.
   *
   * The child drags every object of
   * that colour into the EMPTY BOX.
   *
   * The other colours remain in the
   * mixed pile.
   */

  {
    type: "sorting",
    mode: "colour",
    prompt: "Put the red things together.",
    targetColor: "red",

    items: [
      {
        id: "red-circle-1",
        shape: shapes.circle,
        color: colors.red,
        colorName: "red",
      },
      {
        id: "blue-star-1",
        shape: shapes.star,
        color: colors.blue,
        colorName: "blue",
      },
      {
        id: "red-triangle-1",
        shape: shapes.triangle,
        color: colors.red,
        colorName: "red",
      },
      {
        id: "yellow-heart-1",
        shape: shapes.heart,
        color: colors.yellow,
        colorName: "yellow",
      },
      {
        id: "red-square-1",
        shape: shapes.square,
        color: colors.red,
        colorName: "red",
      },
      {
        id: "purple-diamond-1",
        shape: shapes.diamond,
        color: colors.purple,
        colorName: "purple",
      },
    ],

    zones: [
      {
        id: "red-zone",
        targetColor: "red",
      },
    ],
  },

  {
    type: "sorting",
    mode: "colour",
    prompt: "Put the yellow things together.",
    targetColor: "yellow",

    items: [
      {
        id: "yellow-circle-1",
        shape: shapes.circle,
        color: colors.yellow,
        colorName: "yellow",
      },
      {
        id: "blue-star-2",
        shape: shapes.star,
        color: colors.blue,
        colorName: "blue",
      },
      {
        id: "green-triangle-1",
        shape: shapes.triangle,
        color: colors.green,
        colorName: "green",
      },
      {
        id: "yellow-heart-1",
        shape: shapes.heart,
        color: colors.yellow,
        colorName: "yellow",
      },
      {
        id: "purple-square-1",
        shape: shapes.square,
        color: colors.purple,
        colorName: "purple",
      },
      {
        id: "yellow-diamond-1",
        shape: shapes.diamond,
        color: colors.yellow,
        colorName: "yellow",
      },
    ],

    zones: [
      {
        id: "yellow-zone",
        targetColor: "yellow",
      },
    ],
  },

  {
    type: "sorting",
    mode: "colour",
    prompt: "Put the blue things together.",
    targetColor: "blue",

    items: [
      {
        id: "blue-triangle-1",
        shape: shapes.triangle,
        color: colors.blue,
        colorName: "blue",
      },
      {
        id: "purple-circle-1",
        shape: shapes.circle,
        color: colors.purple,
        colorName: "purple",
      },
      {
        id: "blue-square-1",
        shape: shapes.square,
        color: colors.blue,
        colorName: "blue",
      },
      {
        id: "red-heart-1",
        shape: shapes.heart,
        color: colors.red,
        colorName: "red",
      },
      {
        id: "blue-star-3",
        shape: shapes.star,
        color: colors.blue,
        colorName: "blue",
      },
      {
        id: "yellow-diamond-1",
        shape: shapes.diamond,
        color: colors.yellow,
        colorName: "yellow",
      },
    ],

    zones: [
      {
        id: "blue-zone",
        targetColor: "blue",
      },
    ],
  },

  {
    type: "sorting",
    mode: "colour",
    prompt: "Put the green things together.",
    targetColor: "green",

    items: [
      {
        id: "green-circle-1",
        shape: shapes.circle,
        color: colors.green,
        colorName: "green",
      },
      {
        id: "red-star-1",
        shape: shapes.star,
        color: colors.red,
        colorName: "red",
      },
      {
        id: "green-triangle-1",
        shape: shapes.triangle,
        color: colors.green,
        colorName: "green",
      },
      {
        id: "purple-heart-1",
        shape: shapes.heart,
        color: colors.purple,
        colorName: "purple",
      },
      {
        id: "green-square-1",
        shape: shapes.square,
        color: colors.green,
        colorName: "green",
      },
      {
        id: "yellow-diamond-2",
        shape: shapes.diamond,
        color: colors.yellow,
        colorName: "yellow",
      },
    ],

    zones: [
      {
        id: "green-zone",
        targetColor: "green",
      },
    ],
  },

  {
    type: "sorting",
    mode: "colour",
    prompt: "Put the purple things together.",
    targetColor: "purple",

    items: [
      {
        id: "purple-star-1",
        shape: shapes.star,
        color: colors.purple,
        colorName: "purple",
      },
      {
        id: "blue-circle-2",
        shape: shapes.circle,
        color: colors.blue,
        colorName: "blue",
      },
      {
        id: "purple-triangle-1",
        shape: shapes.triangle,
        color: colors.purple,
        colorName: "purple",
      },
      {
        id: "red-heart-2",
        shape: shapes.heart,
        color: colors.red,
        colorName: "red",
      },
      {
        id: "purple-square-2",
        shape: shapes.square,
        color: colors.purple,
        colorName: "purple",
      },
      {
        id: "yellow-diamond-2",
        shape: shapes.diamond,
        color: colors.yellow,
        colorName: "yellow",
      },
    ],

    zones: [
      {
        id: "purple-zone",
        targetColor: "purple",
      },
    ],
  },

  /*
   * ------------------------------------------------------
   * TWO-PROPERTY CLASSIFICATION
   * ------------------------------------------------------
   */

  {
    type: "sorting",
    mode: "two-properties",
    prompt: "Find the red triangles.",
    answer: "red triangle",
    options: [
      "red triangle",
      "blue triangle",
      "red star",
    ],
    twoProperties: true,
    groups: [
      "red triangle",
      "blue triangle",
      "red star",
      "yellow triangle",
    ],
  },

  {
    type: "sorting",
    mode: "two-properties",
    prompt: "Find the blue circles.",
    answer: "blue circle",
    options: [
      "blue circle",
      "red circle",
      "blue star",
    ],
    twoProperties: true,
    groups: [
      "blue circle",
      "red circle",
      "blue star",
      "yellow circle",
    ],
  },

  {
    type: "sorting",
    mode: "two-properties",
    prompt: "Find the yellow stars.",
    answer: "yellow star",
    options: [
      "yellow star",
      "blue star",
      "yellow heart",
    ],
    twoProperties: true,
    groups: [
      "yellow star",
      "blue star",
      "yellow heart",
      "red star",
    ],
  },

  {
    type: "sorting",
    mode: "two-properties",
    prompt: "Find the green squares.",
    answer: "green square",
    options: [
      "green square",
      "green circle",
      "blue square",
    ],
    twoProperties: true,
    groups: [
      "green square",
      "green circle",
      "blue square",
      "yellow square",
    ],
  },

  {
    type: "sorting",
    mode: "two-properties",
    prompt: "Find the purple hearts.",
    answer: "purple heart",
    options: [
      "purple heart",
      "red heart",
      "purple star",
    ],
    twoProperties: true,
    groups: [
      "purple heart",
      "red heart",
      "purple star",
      "blue heart",
    ],
  },
];