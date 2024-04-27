import Translator from './components/Translator';
export default Translator;

export {default as useTranslator} from './hooks/useTranslator';
export {default as TranslatorProvider} from './providers/TranslatorProvider';
export {default as languageCodeConverter} from './utils/languageCodeConverter';
export {
  default as LANGUAGE_CODES,
  LanguageCode,
  SourceLanguageCode,
} from './constants/languageCode';
export {
  default as TRANSLATOR_TYPES,
  TranslatorType,
} from './constants/translatorTypes';
