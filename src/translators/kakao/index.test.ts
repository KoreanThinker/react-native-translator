import kakao from '.';

test('to url', () => {
  expect(kakao.toUrl('en', 'ko', 'hello 안녕')).toBe(
    'https://translate.kakao.com/?lang=enko&q=hello%20%EC%95%88%EB%85%95',
  );
});
