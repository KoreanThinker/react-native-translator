import {render, screen} from '@testing-library/react-native';
import React from 'react';
import Translator from '../Translator';
import 'react-native-webview';

jest.useFakeTimers();

test('Render', () => {
  const onTranslated = jest.fn();
  render(
    <Translator
      type="kakao"
      from="en"
      to="ko"
      value="hello"
      onTranslated={onTranslated}
    />,
  );

  const expectedUri = 'https://translate.kakao.com/?lang=enko&q=hello';
  expect(screen.getByText(expectedUri)).toBeOnTheScreen();
  const expectedUserAgent = /Mozilla/;
  expect(screen.getByText(expectedUserAgent)).toBeOnTheScreen();
  // #result is kakao translate result view query selector
  expect(screen.getByText(/#result/)).toBeOnTheScreen();
  // mock webview always response after 1000ms. refer to jest-setup.tsx
  jest.advanceTimersByTime(1000);
  expect(onTranslated).toHaveBeenLastCalledWith('안녕');
});

test('Render with default type', () => {
  render(
    <Translator from="en" to="ko" value="hello" onTranslated={() => {}} />,
  );
  const expctedUri = 'https://translate.google.com/?sl=en&tl=ko&text=hello';
  expect(screen.getByText(expctedUri)).toBeOnTheScreen();
});

test('Render with empty from and to', () => {
  render(<Translator from="" to="" value="hello" onTranslated={() => {}} />);

  expect(screen.queryByText(/http/)).not.toBeOnTheScreen();
});

test('Render value change to empty', () => {
  const onTranslated = jest.fn();
  const {rerender} = render(
    <Translator from="en" to="ko" value="hello" onTranslated={() => {}} />,
  );
  rerender(
    <Translator from="en" to="ko" value="" onTranslated={onTranslated} />,
  );

  expect(onTranslated).toHaveBeenCalledWith('');
});
