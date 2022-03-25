import Translator from './components/Translator';
export default Translator;

export {default as useTranslator} from './hooks/useTranslator';
export {default as TranslatorProvider} from './providers/TranslatorProvider';
export {default as languageCodeConverter} from './utils/languageCodeConverter';

export const LOADING_MESSSAGE = '@L@O@A@D@I@N@G@';
// Language code
export const LANGUAGE_CODES = {
  papago: [
    'ko',
    'en',
    'ja',
    'zh-CN',
    'zh-TW',
    'vi',
    'id',
    'th',
    'de',
    'ru',
    'es',
    'it',
    'fr',
  ],
  kakao: [
    'kr',
    'en',
    'jp',
    'cn',
    'vi',
    'id',
    'ar',
    'bn',
    'de',
    'es',
    'fr',
    'hi',
    'it',
    'ms',
    'nl',
    'pt',
    'ru',
    'th',
    'tr',
  ],
  google: [
    'af',
    'ga',
    'sq',
    'it',
    'ar',
    'ja',
    'az',
    'kn',
    'eu',
    'ko',
    'bn',
    'la',
    'be',
    'lv',
    'bg',
    'lt',
    'ca',
    'mk',
    'zh-CN',
    'ms',
    'zh-TW',
    'mt',
    'hr',
    'no',
    'cs',
    'fa',
    'da',
    'pl',
    'nl',
    'pt',
    'en',
    'ro',
    'eo',
    'ru',
    'et',
    'sr',
    'tl',
    'sk',
    'fi',
    'sl',
    'fr',
    'es',
    'gl',
    'sw',
    'ka',
    'sv',
    'de',
    'ta',
    'el',
    'te',
    'gu',
    'th',
    'ht',
    'tr',
    'iw',
    'uk',
    'hi',
    'ur',
    'hu',
    'vi',
    'is',
    'cy',
    'id',
    'yi',
  ],
} as const;

export const INJECTED_JAVASCRIPTS: Record<
  TranslatorType,
  {
    url: (from: string, to: string, value: string) => string;
    userAgent: string | undefined;
    component: string;
    hook: string;
  }
> = {
  papago: {
    url: (from, to, value) =>
      `https://papago.naver.com/?sk=${from}&tk=${to}&hn=0&st=${value}`,
    userAgent:
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0',
    component: `setInterval(() => {
      var doc = document.querySelector('#txtTarget > span')
      window.ReactNativeWebView.postMessage(doc.innerHTML)
    }, 200)`,
    hook: `setInterval(() => {
      var doc = document.querySelector('#txtTarget > span')
      if(doc) window.ReactNativeWebView.postMessage(doc.innerHTML)
      else window.ReactNativeWebView.postMessage('${LOADING_MESSSAGE}')
    }, 200)`,
  },
  kakao: {
    url: (from, to, value) =>
      `https://translate.kakao.com/?lang=${from}${to}&q=${value}`,
    userAgent:
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0',
    component: `setInterval(() => {
      var doc = document.querySelector('#result')
      var kakao = ''
      $('#result').each(function (i, elem) {
          kakao += $(elem).text()
      })
      window.ReactNativeWebView.postMessage(kakao)
  }, 200)`,
    hook: `setInterval(() => {
  var doc = document.querySelector('#result')
  if(doc){
      var kakao = ''
      $('#result').each(function (i, elem) {
          kakao += $(elem).text()
      })
      window.ReactNativeWebView.postMessage(kakao)
  }
  else window.ReactNativeWebView.postMessage('${LOADING_MESSSAGE}')
}, 200)`,
  },
  google: {
    url: (from, to, value) =>
      `https://translate.google.com/?sl=${from}&tl=${to}&text=${value}`,
    userAgent: undefined,
    component: `
    setTimeout(() => {
      // ---- for EU cache policy ---- //
      // https://github.com/KoreanThinker/react-native-translator/issues/3#issuecomment-1077408850
      document.querySelector("body > c-wiz > div > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > form > div > div > button").click()
    }, 500)
    setInterval(() => {
      var selector = 'body > c-wiz > div > div:nth-child(2) > c-wiz > div:nth-child(2) > c-wiz > div > div:nth-child(2) > div:nth-child(3) > c-wiz:nth-child(2) > div:nth-child(7) > div > div > span > span > span'
      var doc = document.querySelector(selector)
      window.ReactNativeWebView.postMessage(doc.innerText)
    }, 200)
    `,
    hook: `
    setTimeout(() => {
      // ---- for EU cache policy ---- //
      document.querySelector("body > c-wiz > div > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > form > div > div > button").click()
    }, 500)
    setInterval(() => {
      var selector = 'body > c-wiz > div > div:nth-child(2) > c-wiz > div:nth-child(2) > c-wiz > div > div:nth-child(2) > div:nth-child(3) > c-wiz:nth-child(2) > div:nth-child(7) > div > div > span > span > span'
      var doc = document.querySelector(selector)
      if(doc) window.ReactNativeWebView.postMessage(doc.innerText)
      else window.ReactNativeWebView.postMessage('${LOADING_MESSSAGE}')
    }, 200)
  `,
  },
};

type ValueOf<T> = T[keyof T];
export type LanguageCode<T extends TranslatorType> = ValueOf<
  Pick<typeof LANGUAGE_CODES, T>
>[number];

// Translator type
export type TranslatorType = keyof typeof LANGUAGE_CODES;
export const TRANSLATOR_TYPES = Object.keys(LANGUAGE_CODES) as TranslatorType[];
