import React, {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import WebView from 'react-native-webview';
import {View} from 'react-native';
import {
  INJECTED_JAVASCRIPTS,
  LanguageCode,
  LOADING_MESSSAGE,
  SourceLanguageCode,
  TranslatorType,
} from '..';

export type TranslatorContextType = {
  translate: <T extends TranslatorType = 'google'>(
    from: SourceLanguageCode<T>,
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

const TranslatorProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [type, setType] = useState<TranslatorType>('google');
  console.log(type);
  const [from, setFrom] = useState<SourceLanguageCode<typeof type>>();
  const [to, setTo] = useState<LanguageCode<typeof type>>();
  const [value, setValue] = useState('');
  const res = useRef<(result: string) => void>(null);

  const translate = useCallback(
    async <T extends TranslatorType = 'google'>(
      _from: SourceLanguageCode<T>,
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
        {!!from && !!to && !!value && (
          <WebView
            injectedJavaScript={INJECTED_JAVASCRIPTS[type].hook}
            userAgent={INJECTED_JAVASCRIPTS[type].userAgent}
            source={{
              uri: INJECTED_JAVASCRIPTS[type].url(from, to, value),
            }}
            cacheEnabled={true}
            onMessage={event => {
              const result = event.nativeEvent.data;
              if (result === LOADING_MESSSAGE) {
                return;
              }
              res.current && res.current(result);
            }}
          />
        )}
      </View>
      {children}
    </TranslatorContext.Provider>
  );
};

export default TranslatorProvider;
