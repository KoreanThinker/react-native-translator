import LANGUAGE_CODES from './languageCode';

const TRANSLATOR_TYPES = Object.keys(LANGUAGE_CODES) as TranslatorType[];
export type TranslatorType = keyof typeof LANGUAGE_CODES;

export default TRANSLATOR_TYPES;
