/* eslint-disable react-native/no-inline-styles */
import React, {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import WebView from 'react-native-webview';
import {View} from 'react-native';
import {LanguageCode, TranslatorType, USER_AGENT} from '..';

const LOADING_MESSSAGE = '@L@O@A@D@I@N@G@';

const INJECT_JAVASCRIPT = `setInterval(() => {
  var selector = 'body > c-wiz > div > div:nth-child(2) > c-wiz > div:nth-child(2) > c-wiz > div > div:nth-child(2) > div:nth-child(3) > c-wiz:nth-child(2) > div:nth-child(7) > div > div > span > span > span'
  var doc = document.querySelector(selector)
  if(doc) window.ReactNativeWebView.postMessage(doc.innerText)
  else window.ReactNativeWebView.postMessage('${LOADING_MESSSAGE}')
}, 200)`;

export type TranslatorContextType = {
  translate: <T extends TranslatorType = 'google'>(
    from: LanguageCode<T>,
    to: LanguageCode<T>,
    value: string,
    option?: {
      type?: T;
      timeout?: number;
    },
  ) => Promise<string>;
};

export const TranslatorContext = createContext<TranslatorContextType>(
  {} as any,
);

const TranslatorProvider: React.FC = ({children}) => {
  const [type, setType] = useState<TranslatorType>('google');
  const [from, setFrom] = useState<LanguageCode<typeof type>>();
  const [to, setTo] = useState<LanguageCode<typeof type>>();
  const [value, setValue] = useState('');
  const res = useRef<(result: string) => void>(null);

  const translate = useCallback(
    async <T extends TranslatorType = 'google'>(
      _from: LanguageCode<T>,
      _to: LanguageCode<T>,
      _value: string,
      {
        //@ts-ignore
        type: _type = 'google',
        timeout = 5000,
      }: {
        type?: T;
        timeout?: number;
      },
    ): Promise<string> => {
      try {
        setFrom(_from);
        setTo(_to);
        setValue(_value);
        setType(_type);
        const result: string = await new Promise((_res, reject) => {
          //@ts-ignore
          res.current = _res;
          setTimeout(() => reject('timeout'), timeout);
        });
        return result;
      } catch (error) {
        setFrom(undefined);
        setTo(undefined);
        setValue('');
        setType('google');
        throw error;
      }
    },
    [],
  );

  const contextValue = useMemo<TranslatorContextType>(
    () => ({
      //@ts-ignore
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
            res.current && res.current(result);
          }}
        />
      </View>
      {children}
    </TranslatorContext.Provider>
  );
};

export default TranslatorProvider;
