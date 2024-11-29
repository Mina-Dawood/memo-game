export const speakLetter = (letter: string): void => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = "en-US"; // Set the language to English
    utterance.rate = 0.9; // Adjust the rate of speech (optional)
    utterance.pitch = 1; // Adjust the pitch (optional)
    window.speechSynthesis.speak(utterance);
  } else {
    console.error("Speech synthesis is not supported in this browser.");
  }
};
