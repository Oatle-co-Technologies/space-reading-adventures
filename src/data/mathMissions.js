import mercuryImage from "../assets/images/planets/mercury.png";
import venusImage from "../assets/images/planets/venus.png";
import earthImage from "../assets/images/planets/earth.png";
import marsImage from "../assets/images/planets/mars.png";
import jupiterImage from "../assets/images/planets/jupitor.png";
import saturnImage from "../assets/images/planets/saturn.png";
import uranusImage from "../assets/images/planets/uranus.png";
import neptuneImage from "../assets/images/planets/neptune.png";
import plutoImage from "../assets/images/planets/pluto.png";
import { numberQuestions } from "./numberQuestions";
import { shapeIntroductionQuestions, shapeFactQuestions, shapeRecognitionQuestions } from "./shapeQuestions";
import { countingShapeQuestions } from "./countingShapeQuestions";
import { colourIntroductionQuestions } from "./colourIntroductionQuestions";
import { colourQuestions } from "./colourQuestions";
import { colourMixingQuestions } from "./colourMixingQuestions";
import { mathMatchingQuestions } from "./mathMatchingQuestions";
import { additionQuestions } from "./additionQuestions";
import { subtractionQuestions } from "./subtractionQuestions";
import { groupingQuestions } from "./groupingQuestions";
import { mathAssessmentQuestions } from "./mathAssessmentQuestions";

export const mathMissions = [
  {
    id: 1,
    title: "Number recognition",
    description: "Meet the numbers from 0 to 20.",
    color: "#ffbd59",
    image: mercuryImage,
    questionBanks: [numberQuestions],
  },
  {
    id: 2,
    title: "Shape explorers",
    description: "Meet shapes, sides, corners, and names.",
    color: "#55c6ff",
    image: venusImage,
    questionBanks: [shapeIntroductionQuestions, shapeFactQuestions, shapeRecognitionQuestions],
  },
  {
    id: 3,
    title: "Counting shapes",
    description: "Count every kind of shape in space.",
    color: "#55c6ff",
    image: earthImage,
    questionBanks: [countingShapeQuestions],
  },
  {
    id: 4,
    title: "Colour explorers",
    description: "Learn colours and discover mixing.",
    color: "#ef5b5b",
    image: marsImage,
    questionBanks: [colourIntroductionQuestions, colourMixingQuestions, colourQuestions],
  },
  {
    id: 5,
    title: "Matching and sorting",
    description: "Match and sort by colour, shape, and number.",
    color: "#66d17a",
    image: jupiterImage,
    questionBanks: [mathMatchingQuestions],
  },
  {
    id: 6,
    title: "Adding numbers",
    description: "Put space objects together to find the total.",
    color: "#ff9f43",
    image: saturnImage,
    questionBanks: [additionQuestions],
  },
  {
    id: 7,
    title: "Taking away",
    description: "Take objects away and count what is left.",
    color: "#76d8e8",
    image: uranusImage,
    questionBanks: [subtractionQuestions],
  },
  {
    id: 8,
    title: "Making equal groups",
    description: "Share objects into equal groups.",
    color: "#c260a8",
    image: neptuneImage,
    questionBanks: [groupingQuestions],
  },
  {
    id: 9,
    title: "Maths assessment",
    description: "Show what you know across the space missions.",
    color: "#d9c5a4",
    image: plutoImage,
    assessment: true,
    questionBanks: [mathAssessmentQuestions],
  },
];
