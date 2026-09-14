const PREFERRED_VOICES = [
  "Samantha",
  "Ava",
  "Karen",
  "Victoria",
  "Google US English",
  "Microsoft Aria Online (Natural) - English (United States)",
];

let voices = [];

function loadVoices() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  voices = window.speechSynthesis.getVoices();
}

if (
  typeof window !== "undefined" &&
  "speechSynthesis" in window
) {
  loadVoices();

  window.speechSynthesis.addEventListener(
    "voiceschanged",
    loadVoices
  );
}

function getPreferredVoice() {
  if (!voices.length) {
    loadVoices();
  }

  // First: explicitly preferred female English voices.
  for (const preferredName of PREFERRED_VOICES) {
    const voice = voices.find(
      (item) =>
        item.name === preferredName &&
        item.lang.toLowerCase().startsWith("en")
    );

    if (voice) {
      return voice;
    }
  }

  // Second: look for common female voice names.
  const feminineNames = [
    "female",
    "samantha",
    "ava",
    "karen",
    "victoria",
    "allison",
    "susan",
    "moira",
    "fiona",
    "zira",
    "aria",
    "jenny",
    "siri",
  ];

  const feminineVoice = voices.find((voice) => {
    const name = voice.name.toLowerCase();
    const language = voice.lang.toLowerCase();

    return (
      language.startsWith("en") &&
      feminineNames.some((namePart) =>
        name.includes(namePart)
      )
    );
  });

  if (feminineVoice) {
    return feminineVoice;
  }

  // Final fallback: any English local voice.
  return (
    voices.find(
      (voice) =>
        voice.lang.toLowerCase().startsWith("en-") &&
        voice.localService
    ) ||
    voices.find((voice) =>
      voice.lang.toLowerCase().startsWith("en")
    ) ||
    null
  );
}

export function speak(text) {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window) ||
    !text
  ) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  const voice = getPreferredVoice();

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = "en-US";
  }

  // Bright, gentle, child-friendly voice.
  utterance.rate = 0.82;
  utterance.pitch = 1.25;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
}