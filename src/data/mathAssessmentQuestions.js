import { numberQuestions } from "./numberQuestions";
import { countingShapeQuestions } from "./countingShapeQuestions";
import { colourQuestions } from "./colourQuestions";
import { mathMatchingQuestions } from "./mathMatchingQuestions";
import { additionQuestions } from "./additionQuestions";
import { subtractionQuestions } from "./subtractionQuestions";
import { groupingQuestions } from "./groupingQuestions";
import { colourMixingQuestions } from "./colourMixingQuestions";

export const mathAssessmentQuestions = [
  { ...numberQuestions[8], skill: "number-recognition" },
  { ...countingShapeQuestions[13], skill: "counting" },
  { ...colourQuestions[5], skill: "colour-recognition" },
  { ...colourMixingQuestions[0], skill: "colour-mixing" },
  { ...mathMatchingQuestions[5], skill: "matching-and-sorting" },
  { ...additionQuestions[4], skill: "addition" },
  { ...subtractionQuestions[4], skill: "subtraction" },
  { ...groupingQuestions[8], skill: "equal-groups-and-sharing" },
];