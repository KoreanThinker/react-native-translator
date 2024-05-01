import React, {useCallback, useMemo} from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {View} from 'react-native';
import {LanguageCode, SourceLanguageCode, TranslatorType} from '..';
import translators from '../translators';
import {LOADING_MESSSAGE} from '../classes/translator';

export interface TranslatorProps<T extends TranslatorType> {
  from: SourceLanguageCode<T>;
  to: LanguageCode<T>;
  value: string;
  type?: T;
  onTranslated: (result: string) => void;
}

function Translator<T extends TranslatorType = 'google'>(
  props: TranslatorProps<T>,
) {
  const {from, to, value, onTranslated, type = 'google'} = props;
  const translator = useMemo(() => translators[type], [type]);
  const injectedJavascript = useMemo(
    () => translator.getInjectedJavascript(),
    [translator],
  );
  const userAgent = useMemo(() => translator.userAgent, [translator]);
  const uri = useMemo(
    () => (from && to ? translator.toUrl(from, to, value) : ''),
    [translator, from, to, value],
  );

  const onMessage = useCallback((event: WebViewMessageEvent) => {
    const result = event.nativeEvent.data;
    if (!result || result === LOADING_MESSSAGE) {
      return;
    }
    onTranslated(result);
  }, []);

  return (
    <View style={{width: 0, height: 0}}>
      <WebView
        injectedJavaScript={injectedJavascript}
        userAgent={userAgent}
        source={{uri}}
        onMessage={onMessage}
        cacheEnabled={false}
      />
    </View>
  );
}

export default Translator;
