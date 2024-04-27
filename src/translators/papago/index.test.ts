import googleTranslator from '.';

test('to url', () => {
  expect(googleTranslator.toUrl('en', 'ko', 'hello 안녕')).toBe(
    'https://papago.naver.com/?sk=en&tk=ko&hn=0&st=hello%20%EC%95%88%EB%85%95',
  );
});
