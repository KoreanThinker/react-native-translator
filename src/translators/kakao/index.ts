import Translator from '../../classes/translator';
import lanaugeCodes from './languageCode';

const kakaoTranslator = new Translator(
  {
    lanaugeCodes,
    selector: '#result',
    toUrl: (from, to, value) =>
      `https://translate.kakao.com/?lang=${from}${to}&q=${encodeURI(value)}`,
  },
  {
    userAgent:
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0',
  },
);

export default kakaoTranslator;
