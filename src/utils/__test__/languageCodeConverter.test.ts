import {LANGUAGE_TABLE} from '../languageCodeConverter';

it('should have the correct language codes for each language', () => {
  expect(LANGUAGE_TABLE.Afrikaans).toEqual({google: 'afa'});
  expect(LANGUAGE_TABLE.Irish).toEqual({google: 'ga'});
  expect(LANGUAGE_TABLE.Albanian).toEqual({google: 'sq'});
});
