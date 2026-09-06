export const groupingQuestions = [
  { type: "equal-groups", prompt: "How many apples are in each group?", answer: "2", options: ["1", "2", "3"], total: 4, groupsCount: 2, groups: [2, 2] },
  { type: "equal-groups", prompt: "How many apples are in each group?", answer: "3", options: ["2", "3", "4"], total: 6, groupsCount: 2, groups: [3, 3] },
  { type: "equal-groups", prompt: "How many apples are in each group?", answer: "4", options: ["3", "4", "5"], total: 8, groupsCount: 2, groups: [4, 4] },
  { type: "sharing", prompt: "How many apples does each friend get?", answer: "3", options: ["2", "3", "4"], total: 6, groupsCount: 2, groups: [3, 3], friends: 2 },
  { type: "sharing", prompt: "How many apples does each friend get?", answer: "3", options: ["2", "3", "4"], total: 9, groupsCount: 3, groups: [3, 3, 3], friends: 3 },
  { type: "division-introduction", teaching: true, prompt: "This is the division sign: ÷", teachingText: "The division sign means we are sharing or splitting things into equal groups.", answer: null, options: [], total: 4, groupsCount: 2, groups: [2, 2], friends: 2 },
  { type: "division-numbers", prompt: "4 ÷ 2 = ?", answer: "2", options: ["1", "2", "3"], dividend: 4, divisor: 2 },
  { type: "sharing", prompt: "How many apples does each friend get?", answer: "4", options: ["3", "4", "5"], total: 8, groupsCount: 2, groups: [4, 4], friends: 2 },
  { type: "division-numbers", prompt: "8 ÷ 4 = ?", answer: "2", options: ["1", "2", "3"], dividend: 8, divisor: 4 },
  { type: "sharing", prompt: "How many apples does each friend get?", answer: "2", options: ["1", "2", "3"], total: 10, groupsCount: 5, groups: [2, 2, 2, 2, 2], friends: 5 },
  { type: "division-numbers", prompt: "9 ÷ 3 = ?", answer: "3", options: ["2", "3", "4"], dividend: 9, divisor: 3 },
];