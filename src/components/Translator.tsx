/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import WebView from 'react-native-webview';
import {View} from 'react-native';
import {LanguageCode, TranslatorType, USER_AGENT} from '..';

const INJECT_JAVASCRIPT = `setInterval(() => {
  var selector = 'body > c-wiz > div > div:nth-child(2) > c-wiz > div:nth-child(2) > c-wiz > div > div:nth-child(2) > div:nth-child(3) > c-wiz:nth-child(2) > div:nth-child(7) > div > div > span > span > span'
  var doc = document.querySelector(selector)
  window.ReactNativeWebView.postMessage(doc.innerText)
}, 200)`;

export interface TranslatorProps<T extends TranslatorType> {
  from: LanguageCode<T>;
  to: LanguageCode<T>;
  value: string;
  type?: T;
  onTranslated: (t: string) => void;
}

const Translator = <T extends TranslatorType = 'google'>(
  props: TranslatorProps<T>,
) => {
  const {from, to, value, onTranslated, type} = props;
  console.log(type);

  return (
    <View style={{width: 0, height: 0}}>
      <WebView
        injectedJavaScript={INJECT_JAVASCRIPT}
        userAgent={USER_AGENT}
        source={{
          uri: `https://translate.google.com/?sl=${from}&tl=${to}&text=${value}`,
        }}
        cacheEnabled={true}
        onMessage={(event) => {
          onTranslated(event.nativeEvent.data || '');
        }}
      />
    </View>
  );
};

Translator.defaultProps = {
  type: 'google',
};

export default Translator;
