export const numberTracingNumbers = Array.from(
  { length: 21 },
  (_, index) => index
);

export const numberTracingMission = {
  id: 2,
  title: "Trace Numbers",
  description: "Trace numbers from 0 to 20.",
  numbers: numberTracingNumbers,
};