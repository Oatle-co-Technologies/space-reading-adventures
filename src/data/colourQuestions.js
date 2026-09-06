import { colors, shapes } from "./mathConstants";

export const colourQuestions = [
  // Primary colour reinforcement
  {
    type: "colour-recognition",
    prompt: "What colour is this shape?",
    answer: "red",
    options: ["red", "yellow", "blue"],
    color: colors.red,
    shape: shapes.circle,
  },

  {
    type: "colour-recognition",
    prompt: "What colour is this shape?",
    answer: "yellow",
    options: ["blue", "yellow", "red"],
    color: colors.yellow,
    shape: shapes.square,
  },

  {
    type: "colour-recognition",
    prompt: "What colour is this shape?",
    answer: "blue",
    options: ["yellow", "red", "blue"],
    color: colors.blue,
    shape: shapes.triangle,
  },

  // Extra colour vocabulary — teach first
  {
    type: "colour-recognition",
    teaching: true,
    prompt: "This is pink.",
    teachingText: "Pink is a light colour that looks like a soft flower.",
    answer: "pink",
    options: [],
    color: colors.pink,
    shape: shapes.star,
  },

  {
    type: "colour-recognition",
    teaching: true,
    prompt: "This is maroon.",
    teachingText: "Maroon is a deep red colour.",
    answer: "maroon",
    options: [],
    color: colors.maroon,
    shape: shapes.oval,
  },

  {
    type: "colour-recognition",
    teaching: true,
    prompt: "This is lime.",
    teachingText: "Lime is a bright green colour.",
    answer: "lime",
    options: [],
    color: colors.lime,
    shape: shapes.diamond,
  },

  {
    type: "colour-recognition",
    teaching: true,
    prompt: "This is turquoise.",
    teachingText: "Turquoise is a blue-green colour.",
    answer: "turquoise",
    options: [],
    color: colors.turquoise,
    shape: shapes.heart,
  },

  {
    type: "colour-recognition",
    teaching: true,
    prompt: "This is gold.",
    teachingText: "Gold is a warm yellow colour, like a treasure.",
    answer: "gold",
    options: [],
    color: colors.gold,
    shape: shapes.pentagon,
  },

  // Extra colour practice
  {
    type: "colour-recognition",
    prompt: "What colour is this shape?",
    answer: "pink",
    options: ["pink", "lime", "gold"],
    color: colors.pink,
    shape: shapes.star,
  },

  {
    type: "colour-recognition",
    prompt: "What colour is this shape?",
    answer: "maroon",
    options: ["gold", "maroon", "turquoise"],
    color: colors.maroon,
    shape: shapes.oval,
  },

  {
    type: "colour-recognition",
    prompt: "What colour is this shape?",
    answer: "lime",
    options: ["lime", "pink", "green"],
    color: colors.lime,
    shape: shapes.diamond,
  },

  {
    type: "colour-recognition",
    prompt: "What colour is this shape?",
    answer: "turquoise",
    options: ["blue", "turquoise", "gold"],
    color: colors.turquoise,
    shape: shapes.heart,
  },

  {
    type: "colour-recognition",
    prompt: "What colour is this shape?",
    answer: "gold",
    options: ["pink", "maroon", "gold"],
    color: colors.gold,
    shape: shapes.pentagon,
  },
];      