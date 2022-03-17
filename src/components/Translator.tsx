/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import WebView from 'react-native-webview';
import {View} from 'react-native';
import {LanguageCode, USER_AGENT} from '..';

const INJECT_JAVASCRIPT = `setInterval(() => {
  var selector = 'body > c-wiz > div > div:nth-child(2) > c-wiz > div:nth-child(2) > c-wiz > div > div:nth-child(2) > div:nth-child(3) > c-wiz:nth-child(2) > div:nth-child(7) > div > div > span > span > span'
  var doc = document.querySelector(selector)
  window.ReactNativeWebView.postMessage(doc.innerText)
}, 200)`;

export interface TranslatorProps {
  from: LanguageCode;
  to: LanguageCode;
  value: string;
  onTranslated: (t: string) => void;
}

const Translator: React.FC<TranslatorProps> = (props) => {
  const {from, to, value, onTranslated} = props;

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

export default Translator;
