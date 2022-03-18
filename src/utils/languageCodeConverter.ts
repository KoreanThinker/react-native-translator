import {LanguageCode, TranslatorType} from '..';

export const LANGUAGE_TABLE: Record<string, Record<string, string>> = {
  Afrikaans: {google: 'af'},
  Irish: {google: 'ga'},
  Albanian: {google: 'sq'},
  Italian: {google: 'it', papago: 'it', kakao: 'it'},
  Arabic: {google: 'ar', kakao: 'ar'},
  Japanese: {google: 'ja', papago: 'ja', kakao: 'jp'},
  Azerbaijani: {google: 'az'},
  Kannada: {google: 'kn'},
  Basque: {google: 'eu'},
  Korean: {google: 'ko', papago: 'ko', kakao: 'kr'},
  Bengali: {google: 'bn', kakao: 'bn'},
  Latin: {google: 'la'},
  Belarusian: {google: 'be'},
  Latvian: {google: 'lv'},
  Bulgarian: {google: 'bg'},
  Lithuanian: {google: 'lt'},
  Catalan: {google: 'ca'},
  Macedonian: {google: 'mk'},
  'Chinese Simplified': {google: 'zh-CN', papago: 'zh-CN', kakao: 'cn'},
  Malay: {google: 'ms'},
  'Chinese Traditional': {google: 'zh-TW', papago: 'zh-TW', kakao: 'cn'},
  Maltese: {google: 'mt'},
  Croatian: {google: 'hr'},
  Norwegian: {google: 'no'},
  Czech: {google: 'cs'},
  Persian: {google: 'fa'},
  Danish: {google: 'da'},
  Polish: {google: 'pl'},
  Dutch: {google: 'nl', kakao: 'nl'},
  Portuguese: {google: 'pt', kakao: 'pt'},
  English: {google: 'en', papago: 'en', kakao: 'en'},
  Romanian: {google: 'ro'},
  Esperanto: {google: 'eo'},
  Russian: {google: 'ru', papago: 'ru', kakao: 'ru'},
  Estonian: {google: 'et'},
  Serbian: {google: 'sr'},
  Filipino: {google: 'tl'},
  Slovak: {google: 'sk'},
  Finnish: {google: 'fi'},
  Slovenian: {google: 'sl'},
  French: {google: 'fr', papago: 'fr', kakao: 'fr'},
  Spanish: {google: 'es', papago: 'es', kakao: 'es'},
  Galician: {google: 'gl'},
  Swahili: {google: 'sw'},
  Georgian: {google: 'ka'},
  Swedish: {google: 'sv'},
  German: {google: 'de', papago: 'de', kakao: 'de'},
  Tamil: {google: 'ta'},
  Greek: {google: 'el'},
  Telugu: {google: 'te'},
  Gujarati: {google: 'gu'},
  Thai: {google: 'th', papago: 'th', kakao: 'th'},
  Haitian: {google: 'Creole'},
  Turkish: {google: 'tr', kakao: 'tr'},
  Hebrew: {google: 'iw'},
  Ukrainian: {google: 'uk'},
  Hindi: {google: 'hi', kakao: 'hi'},
  Urdu: {google: 'ur'},
  Hungarian: {google: 'hu'},
  Vietnamese: {google: 'vi', papago: 'vi', kakao: 'vi'},
  Icelandic: {google: 'is'},
  Welsh: {google: 'cy'},
  Indonesian: {google: 'id', papago: 'id', kakao: 'id'},
  Yiddish: {google: 'yi'},
};

const languageCodeConverter = <
  F extends TranslatorType,
  T extends TranslatorType,
>(
  from: F,
  to: T,
  code: LanguageCode<F>,
): LanguageCode<T> | undefined => {
  for (const key in LANGUAGE_TABLE) {
    try {
      if (LANGUAGE_TABLE[key][from] === code) {
        return LANGUAGE_TABLE[key][to] as LanguageCode<T> | undefined;
      }
    } catch (error) {}
  }
  return undefined;
};

export default languageCodeConverter;
