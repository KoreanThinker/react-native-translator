import google from '../translators/google/languageCode';
import kakao from '../translators/kakao/languageCode';
import papago from '../translators/papago/languageCode';

const LANGUAGE_CODES = {papago, kakao, google} as const;
type ValueOf<T> = T[keyof T];

type SpecifiedLanguageCode<T extends TranslatorType> = ValueOf<
  Pick<typeof LANGUAGE_CODES, T>
>[number];

export type LanguageCode<T extends TranslatorType> = SpecifiedLanguageCode<T>;

type AutoDetectableLanguage = 'google' | 'papago';

export type SourceLanguageCode<T extends TranslatorType> =
  T extends AutoDetectableLanguage
    ? SpecifiedLanguageCode<T> | 'auto'
    : SpecifiedLanguageCode<T>;

type TranslatorType = keyof typeof LANGUAGE_CODES;

export default LANGUAGE_CODES;
