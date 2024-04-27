import {TranslatorType} from '../../constants/translatorTypes';
import languageCodeConverter from '../languageCodeConverter';

const testCases: [
  TranslatorType,
  TranslatorType,
  string,
  string | undefined,
][] = [
  ['google', 'papago', 'it', 'it'],
  ['google', 'kakao', 'zh-CN', 'cn'],
  ['papago', 'kakao', 'ko', 'kr'],
  ['papago', 'google', 'ru', 'ru'],
  ['kakao', 'papago', 'vi', 'vi'],
  ['kakao', 'papago', 'cn', 'zh-CN'],
  ['kakao', 'papago', 'nl', undefined],
  ['google', 'papago', 'la', undefined],
];

test.each(testCases)('convert to ', (from, to, languageCode, expected) => {
  expect(languageCodeConverter(from, to, languageCode)).toBe(expected);
});
