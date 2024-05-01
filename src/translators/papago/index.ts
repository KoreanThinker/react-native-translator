import Translator from '../../classes/translator';
import lanaugeCodes from './languageCode';

const papagoTranslator = new Translator(
  {
    lanaugeCodes,
    selector: '#txtTarget',
    toUrl: (from, to, value) =>
      `https://papago.naver.com/?sk=${from}&tk=${to}&hn=0&st=${encodeURI(
        value,
      )}`,
  },
  {
    userAgent:
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0',
  },
);

export default papagoTranslator;
