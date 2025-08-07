import {TranslatorProvider, useTranslator} from '../TranslatorContext';
import {act, renderHook, screen} from '@testing-library/react-native';

jest.useFakeTimers();

test('translate once', async () => {
  const hook = renderHook(useTranslator, {
    wrapper: TranslatorProvider,
  });

  const {translate} = hook.result.current;

  let promise: Promise<string>;
  act(() => {
    promise = translate('en', 'ko', 'hello', {type: 'google'});
  });
  // throttle 100ms
  const expectedUri = 'https://translate.google.com/?sl=en&tl=ko&text=hello';
  expect(screen.getByText(expectedUri)).toBeOnTheScreen();

  // mock webview always response after 1000ms. refer to jest-setup.tsx
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // @ts-ignore - Variable 'promise' is used before being assigned.ts(2454)
  await expect(promise).resolves.toBe('안녕');
});

test('translate multiple', async () => {
  const hook = renderHook(useTranslator, {
    wrapper: TranslatorProvider,
  });

  const {translate} = hook.result.current;

  let promise1: Promise<string>;
  let promise2: Promise<string>;
  act(() => {
    promise1 = translate('en', 'ko', 'hello', {type: 'google'});
    promise2 = translate('en', 'ko', 'hello', {type: 'papago'});
  });

  const expectedUri1 = /translate.google.com/;
  expect(screen.getByText(expectedUri1)).toBeOnTheScreen();
  const expectedUri2 = /papago.naver.com/;
  expect(screen.getByText(expectedUri2)).toBeOnTheScreen();

  // mock webview always response after 1000ms. refer to jest-setup.tsx
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // @ts-ignore - Variable 'promise' is used before being assigned.ts(2454)
  await expect(promise1).resolves.toBe('안녕');
  // @ts-ignore - Variable 'promise' is used before being assigned.ts(2454)
  await expect(promise2).resolves.toBe('안녕');

  // inactive after translated
  expect(screen.queryByText(expectedUri1)).not.toBeOnTheScreen();
  expect(screen.queryByText(expectedUri2)).not.toBeOnTheScreen();

  // translate again
  let promise3: Promise<string>;
  act(() => {
    promise3 = translate('en', 'ko', 'hello', {type: 'google'});
  });

  const expectedUri3 = /translate.google.com/;
  expect(screen.getByText(expectedUri3)).toBeOnTheScreen();

  // mock webview always response after 1000ms. refer to jest-setup.tsx
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // @ts-ignore - Variable 'promise' is used before being assigned.ts(2454)
  await expect(promise3).resolves.toBe('안녕');
  // inactive after translated
  expect(screen.queryByText(expectedUri3)).not.toBeOnTheScreen();
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

test('translate timeout', async () => {
  const hook = renderHook(useTranslator, {
    wrapper: TranslatorProvider,
  });

  const {translate} = hook.result.current;

  let promise: Promise<string>;
  act(() => {
    // mock webview always response after 1000ms. refer to jest-setup.tsx
    // so when timeout less than 1000ms, it will be rejected
    // @ts-ignore - Variable 'promise' is used before being assigned.ts(2454)
    promise = translate('en', 'ko', 'hello', {timeout: 500});
  });
  act(() => {
    jest.advanceTimersByTime(500);
  });
  // @ts-ignore - Variable 'promise' is used before being assigned.ts(2454)
  await expect(promise).rejects.toBe('translate timeout');
});

test('translate nothing when empty value', async () => {
  const hook = renderHook(useTranslator, {
    wrapper: TranslatorProvider,
  });

  const {translate} = hook.result.current;

  await expect(translate('en', 'ko', '')).resolves.toBe('');

  expect(screen.queryByText(/http/)).not.toBeOnTheScreen();
});
