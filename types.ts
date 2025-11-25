export enum PartOfSpeech {
  NOUN = 'Noun',
  VERB = 'Verb',
  ADJECTIVE = 'Adjective',
  ADVERB = 'Adverb',
  PARTICLE = 'Particle',
  AUXILIARY_VERB = 'Auxiliary Verb',
  PUNCTUATION = 'Punctuation',
  OTHER = 'Other'
}

export interface Token {
  surface: string;
  reading: string; // Hiragana or Katakana
  romaji: string;
  pos: PartOfSpeech;
  meaning: string; // Chinese meaning
  baseForm?: string; // Dictionary form
}

export interface AnalysisResult {
  tokens: Token[];
  translation: string; // Full Chinese translation
}

export interface GeminiError {
  message: string;
}
