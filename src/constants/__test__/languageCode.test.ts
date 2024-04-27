import LANGUAGE_CODES from '../languageCode';

test('snapshot', () => {
  expect(LANGUAGE_CODES).toMatchSnapshot();
});
