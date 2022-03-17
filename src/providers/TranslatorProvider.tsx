/* eslint-disable react-native/no-inline-styles */
import React, {createContext, useCallback, useMemo, useState} from 'react';
import WebView from 'react-native-webview';
import {View} from 'react-native';
import {LanguageCode, USER_AGENT} from '..';

const LOADING_MESSSAGE = '@L@O@A@D@I@N@G@';

const INJECT_JAVASCRIPT = `setInterval(() => {
  var selector = 'body > c-wiz > div > div:nth-child(2) > c-wiz > div:nth-child(2) > c-wiz > div > div:nth-child(2) > div:nth-child(3) > c-wiz:nth-child(2) > div:nth-child(7) > div > div > span > span > span'
  var doc = document.querySelector(selector)
  if(doc) window.ReactNativeWebView.postMessage(doc.innerText)
  else window.ReactNativeWebView.postMessage('${LOADING_MESSSAGE}')
}, 200)`;

export type TranslatorContextType = {
  translate: (
    from: LanguageCode,
    to: LanguageCode,
    value: string,
    timeout?: number | undefined,
  ) => Promise<string>;
};

export const TranslatorContext = createContext<TranslatorContextType>(
  {} as any,
);

let res: any = () => {};

const TranslatorProvider: React.FC = ({children}) => {
  const [from, setFrom] = useState<LanguageCode>();
  const [to, setTo] = useState<LanguageCode>();
  const [value, setValue] = useState('');

  const translate = useCallback(
    async (
      _from: LanguageCode,
      _to: LanguageCode,
      _value: string,
      timeout = 5000,
    ) => {
      setFrom(_from);
      setTo(_to);
      setValue(_value);
      const result: string = await new Promise((_res, reject) => {
        res = _res;
        setTimeout(() => reject('timeout'), timeout);
      });
      return result;
    },
    [],
  );

  const contextValue = useMemo<TranslatorContextType>(
    () => ({
      translate,
    }),
    [translate],
  );

  return (
    <TranslatorContext.Provider value={contextValue}>
      <View style={{width: 0, height: 0}}>
        <WebView
          injectedJavaScript={INJECT_JAVASCRIPT}
          userAgent={USER_AGENT}
          source={{
            uri: `https://translate.google.com/?sl=${from}&tl=${to}&text=${value}`,
          }}
          cacheEnabled={true}
          onMessage={(event) => {
            const result = event.nativeEvent.data;
            if (result === LOADING_MESSSAGE) {
              return;
            }
            res(result);
          }}
        />
      </View>
      {children}
    </TranslatorContext.Provider>
  );
};

export default TranslatorProvider;
