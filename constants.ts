import { PartOfSpeech } from './types';

export const POS_COLORS: Record<PartOfSpeech, string> = {
  [PartOfSpeech.NOUN]: 'bg-pos-noun',
  [PartOfSpeech.VERB]: 'bg-pos-verb',
  [PartOfSpeech.ADJECTIVE]: 'bg-pos-adjective',
  [PartOfSpeech.ADVERB]: 'bg-pos-adverb',
  [PartOfSpeech.PARTICLE]: 'bg-pos-particle',
  [PartOfSpeech.AUXILIARY_VERB]: 'bg-pos-auxiliary',
  [PartOfSpeech.PUNCTUATION]: 'bg-transparent',
  [PartOfSpeech.OTHER]: 'bg-pos-other',
};

export const POS_LABELS: Record<PartOfSpeech, string> = {
  [PartOfSpeech.NOUN]: '名词',
  [PartOfSpeech.VERB]: '动词',
  [PartOfSpeech.ADJECTIVE]: '形容词',
  [PartOfSpeech.ADVERB]: '副词',
  [PartOfSpeech.PARTICLE]: '助词',
  [PartOfSpeech.AUXILIARY_VERB]: '助动词',
  [PartOfSpeech.PUNCTUATION]: '标点',
  [PartOfSpeech.OTHER]: '其他',
};

export const SAMPLE_TEXT = "Japanese Sentence Analyzer（日本語文章解析器）は、中国語学習者向けに開発されたAI日本語学習ツールです。";
