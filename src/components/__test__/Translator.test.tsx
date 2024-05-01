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

  expect(
    screen.getByText('https://translate.kakao.com/?lang=enko&q=hello'),
  ).toBeOnTheScreen();
  expect(
    screen.getByText(
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0',
    ),
  ).toBeOnTheScreen();
  // #result is kakao translate result view query selector
  expect(screen.getByText(/#result/)).toBeOnTheScreen();
  jest.advanceTimersByTime(100);
  expect(onTranslated).toHaveBeenLastCalledWith('안녕');
});

test('Render with default type', () => {
  render(
    <Translator from="en" to="ko" value="hello" onTranslated={() => {}} />,
  );

  expect(
    screen.getByText('https://translate.google.com/?sl=en&tl=ko&text=hello'),
  ).toBeOnTheScreen();
});

test('Render with empty from and to', () => {
  render(<Translator from="" to="" value="hello" onTranslated={() => {}} />);

  expect(screen.queryByText(/http/)).not.toBeOnTheScreen();
});
