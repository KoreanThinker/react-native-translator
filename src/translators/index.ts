import Translator from '../classes/translator';
import {TranslatorType} from '../constants/translatorTypes';
import googleTranslator from './google';
// import kakaoTranslator from './kakao';
import papagoTranslator from './papago';

const translators: Record<TranslatorType, Translator> = {
  google: googleTranslator,
  papago: papagoTranslator,
  // kakao: kakaoTranslator, // kakao is deprecated
};

export default translators;
