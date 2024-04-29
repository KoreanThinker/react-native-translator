import Translator from './components/Translator';

import useTranslator from './hooks/useTranslator';
import TranslatorProvider from './providers/TranslatorProvider';
import languageCodeConverter from './utils/languageCodeConverter';
import LANGUAGE_CODES, {
  LanguageCode,
  SourceLanguageCode,
} from './constants/languageCode';
import TRANSLATOR_TYPES, {TranslatorType} from './constants/translatorTypes';

export {
  useTranslator,
  TranslatorProvider,
  languageCodeConverter,
  LANGUAGE_CODES,
  TRANSLATOR_TYPES,
};
export type {LanguageCode, SourceLanguageCode, TranslatorType};
export default Translator;
