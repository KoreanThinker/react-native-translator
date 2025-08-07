import LANGUAGE_CODES from './languageCode';

const TRANSLATOR_TYPES = ['papago', 'google'] as const; // kakao is deprecated
export type TranslatorType = keyof typeof LANGUAGE_CODES;

export default TRANSLATOR_TYPES;
