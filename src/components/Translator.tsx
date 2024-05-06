import React, {useCallback, useEffect, useMemo, useState} from 'react';
import _ from 'lodash';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
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
  const {from, to, value: _value, onTranslated, type = 'google'} = props;
  const [value, setValue] = useState('');
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
    if (!result || result === LOADING_MESSSAGE || result === 'Enter a URL') {
      return;
    }
    onTranslated(result);
  }, []);

  // set value throttled
  const throttledSetValue = useMemo(() => _.debounce(setValue, 100), []);
  useEffect(() => {
    if (_value === '') {
      // clear value when input value is empty
      setValue('');
      onTranslated('');
      return;
    }
    throttledSetValue(_value);
  }, [_value]);

  return (
    <WebView
      style={{width: 0, height: 0}}
      injectedJavaScript={injectedJavascript}
      userAgent={userAgent}
      source={{uri}}
      onMessage={onMessage}
      cacheEnabled
    />
  );
}

export default Translator;
