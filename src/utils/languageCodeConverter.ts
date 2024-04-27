import {LanguageCode, TranslatorType} from '..';
import LANGUAGE_MAP from '../constants/languageMap';

const languageCodeConverter = <
  F extends TranslatorType,
  T extends TranslatorType,
>(
  from: F,
  to: T,
  languageCode: LanguageCode<F>,
): LanguageCode<T> | undefined => {
  for (const key in LANGUAGE_MAP) {
    if (LANGUAGE_MAP[key][from] === languageCode) {
      return LANGUAGE_MAP[key][to] as LanguageCode<T> | undefined;
    }
  }
};

export default languageCodeConverter;
