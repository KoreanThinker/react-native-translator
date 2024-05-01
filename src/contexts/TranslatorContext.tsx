import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {View} from 'react-native';
import Translator, {LanguageCode, SourceLanguageCode, TranslatorType} from '..';

type Translate = <T extends TranslatorType = 'google'>(
  from: SourceLanguageCode<T>,
  to: LanguageCode<T>,
  value: string,
  option?: {
    type?: T;
    timeout?: number;
  },
) => Promise<string>;
type TranslatorContextType = {
  translate: Translate;
};

const TranslatorContext = createContext<TranslatorContextType>({} as any);

export const useTranslator = () => {
  const {translate} = useContext(TranslatorContext);
  return {translate};
};

export const TranslatorProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [type, setType] = useState<TranslatorType>('google');
  const [from, setFrom] = useState<SourceLanguageCode<typeof type>>();
  const [to, setTo] = useState<LanguageCode<typeof type>>();
  const [value, setValue] = useState('');
  const callback = useRef<(result: string) => void>(null);

  const translate: Translate = useCallback(
    async (_from, _to, _value, option) => {
      const {type: _type = 'google', timeout = 5000} = option ?? {};
      setFrom(_from);
      setTo(_to);
      setValue(_value);
      setType(_type);

      return new Promise((_res, reject) => {
        // @ts-ignore
        callback.current = _res;
        setTimeout(() => {
          console.log('translate timeout');
          setFrom(undefined);
          setTo(undefined);
          setValue('');
          setType('google');
          reject('translate timeout');
        }, timeout);
      });
    },
    [],
  );

  const contextValue = useMemo<TranslatorContextType>(
    () => ({translate}),
    [translate],
  );

  const onTranslated = useCallback((result: string) => {
    callback.current?.(result);
  }, []);

  return (
    <TranslatorContext.Provider value={contextValue}>
      <View style={{width: 0, height: 0}}>
        {!!from && !!to && !!value && (
          <Translator
            from={from}
            to={to}
            value={value}
            type={type}
            onTranslated={onTranslated}
          />
        )}
      </View>
      {children}
    </TranslatorContext.Provider>
  );
};
