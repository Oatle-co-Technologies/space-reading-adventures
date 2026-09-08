const phonicsData = [
  ["A", "ah"],
  ["B", "buh"],
  ["C", "kuh"],
  ["D", "duh"],
  ["E", "eh"],
  ["F", "fuh"],
  ["G", "guh"],
  ["H", "huh"],
  ["I", "ih"],
  ["J", "juh"],
  ["K", "kuh"],
  ["L", "luh"],
  ["M", "muh"],
  ["N", "nuh"],
  ["O", "aw"],
  ["P", "puh"],
  ["Q", "kwuh"],
  ["R", "ruh"],
  ["S", "sss"],
  ["T", "tuh"],
  ["U", "uh"],
  ["V", "vuh"],
  ["W", "wuh"],
  ["X", "ks"],
  ["Y", "yuh"],
  ["Z", "zuh"],
];

export const phonicsQuestions = phonicsData.map(
  ([letter, soundText]) => ({
    letter,
    soundText,
    answer: letter,
  })
);
