const phonicsData = [
  ["A", "/ă/"],
  ["B", "/b/"],
  ["C", "/k/"],
  ["D", "/d/"],
  ["E", "/ĕ/"],
  ["F", "/f/"],
  ["G", "/g/"],
  ["H", "/h/"],
  ["I", "/ĭ/"],
  ["J", "/j/"],
  ["K", "/k/"],
  ["L", "/l/"],
  ["M", "/m/"],
  ["N", "/n/"],
  ["O", "/ŏ/"],
  ["P", "/p/"],
  ["Q", "/kw/"],
  ["R", "/r/"],
  ["S", "/s/"],
  ["T", "/t/"],
  ["U", "/ŭ/"],
  ["V", "/v/"],
  ["W", "/w/"],
  ["X", "/ks/"],
  ["Y", "/y/"],
  ["Z", "/z/"],
];

export const phonicsQuestions = phonicsData.map(
  ([letter, phoneme]) => ({
    letter,
    phoneme,
    soundText: phoneme,
    answer: letter,
  })
);