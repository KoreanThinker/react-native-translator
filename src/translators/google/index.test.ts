import googleTranslator from '.';

test('to url', () => {
  expect(googleTranslator.toUrl('en', 'ko', 'hello 안녕')).toBe(
    'https://translate.google.com/?sl=en&tl=ko&text=hello%20%EC%95%88%EB%85%95',
  );
});
