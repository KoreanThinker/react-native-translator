import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
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

test('Handle "Enter a URL" response for Google translation', async () => {
  const onTranslated = jest.fn();

  // Render the Translator component with the "google" type
  render(
    <Translator
      type="google"
      from="en"
      to="ko"
      value="hello"
      onTranslated={onTranslated}
    />,
  );

  // Check for the URL directly in the WebView source
  const expectedUri = 'https://translate.google.com/?sl=en&tl=ko&text=hello';
  await waitFor(() => {
    expect(screen.getByText(expectedUri)).toBeOnTheScreen(); // Match the URL text
  });

  // Simulate the WebView message event with 'Enter a URL' as result
  fireEvent(screen.getByText(expectedUri), 'message', {
    nativeEvent: {data: 'Enter a URL'},
  });

  // Ensure the `onTranslated` callback was NOT called, as 'Enter a URL' is an error message
  expect(onTranslated).not.toHaveBeenCalled();
});
