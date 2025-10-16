export interface TextToSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

export interface HighlightedText {
  text: string;
  isHighlighted: boolean;
  isLastWord: boolean;
}

export interface TTSState {
  isPlaying: boolean;
  isPaused: boolean;
  currentWord: string;
  currentSentence: string;
}
