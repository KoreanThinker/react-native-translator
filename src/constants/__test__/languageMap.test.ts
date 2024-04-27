import LANGUAGE_CODES from '../languageCode';
import LANGUAGE_MAP from '../languageMap';
import TRANSLATOR_TYPES from '../translatorTypes';

test.each(TRANSLATOR_TYPES)(
  'every support langauges in map (%s)',
  translatorType => {
    const supportLanguages = LANGUAGE_CODES[translatorType];

    const convertableLanguages = Object.keys(LANGUAGE_MAP).map(
      key => LANGUAGE_MAP[key][translatorType],
    );
    const uniqueConvertableLanguages = [...new Set(convertableLanguages)];

    const actual = uniqueConvertableLanguages
      .filter(Boolean) // remove undefined
      .sort();
    const expected = supportLanguages.sort();
    expect(actual).toStrictEqual(expected);
  },
);
