import {TranslatorProvider, useTranslator} from '../TranslatorContext';
import {act, renderHook, screen} from '@testing-library/react-native';

jest.useFakeTimers();

test('translate', async () => {
  const hook = renderHook(useTranslator, {
    wrapper: TranslatorProvider,
  });

  const {translate} = hook.result.current;

  let promise: Promise<string>;
  act(() => {
    promise = translate('en', 'ko', 'hello', {type: 'kakao'});
  });

  const expectedUri = 'https://translate.kakao.com/?lang=enko&q=hello';
  expect(screen.getByText(expectedUri)).toBeOnTheScreen();
  const expectedUserAgent = /Mozilla/;
  expect(screen.getByText(expectedUserAgent)).toBeOnTheScreen();
  // #result is kakao translate result view query selector
  expect(screen.getByText(/#result/)).toBeOnTheScreen();

  // mock webview always response after 1000ms. refer to jest-setup.tsx
  jest.advanceTimersByTime(1000);
  // @ts-ignore - Variable 'promise' is used before being assigned.ts(2454)
  await expect(promise).resolves.toBe('안녕');
});

test('translate default translator type', () => {
  const hook = renderHook(useTranslator, {
    wrapper: TranslatorProvider,
  });

  const {translate} = hook.result.current;

  act(() => {
    translate('en', 'ko', 'hello');
  });

  const exptectedUri = 'https://translate.google.com/?sl=en&tl=ko&text=hello';
  expect(screen.getByText(exptectedUri)).toBeOnTheScreen();
});

// eslint-disable-next-line jest/no-disabled-tests
test.skip('translate timeout', async () => {
  // jest.clearAllTimers();
  const hook = renderHook(useTranslator, {
    wrapper: TranslatorProvider,
  });

  const {translate} = hook.result.current;

  await act(async () => {
    // mock webview always response after 1000ms. refer to jest-setup.tsx
    // so when timeout less than 1000ms, it will be rejected
    // @ts-ignore - Variable 'promise' is used before being assigned.ts(2454)
    await expect(translate('en', 'ko', 'hello', {timeout: 10})).rejects.toThrow(
      'translate timeout',
    );
  });
});
