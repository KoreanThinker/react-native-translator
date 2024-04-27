import Translator from '../../classes/translator';
import lanaugeCodes from './languageCode';

// EU cache policy agreement modal pass code
const beforeTranslate = `
  setTimeout(() => {
    try {
      document.querySelectorAll("div[data-is-touch-wrapper] > button")[1].click();
    } catch(e) { }
  }, 500)
`;

const googleTranslator = new Translator(
  {
    lanaugeCodes,
    selector: 'c-wiz[role] > div > div[jsaction] > div > div',
    toUrl: (from, to, value) =>
      `https://translate.google.com/?sl=${from}&tl=${to}&text=${encodeURI(value)}`,
  },
  {beforeTranslate},
);

export default googleTranslator;
