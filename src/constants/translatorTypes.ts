import LANGUAGE_CODES from './languageCode';

const TRANSLATOR_TYPES = ['papago', 'kakao', 'google'] as const;
export type TranslatorType = keyof typeof LANGUAGE_CODES;

export default TRANSLATOR_TYPES;
