import React from 'react';
import WebView from 'react-native-webview';
import {View} from 'react-native';
import {
  INJECTED_JAVASCRIPTS,
  LanguageCode,
  SourceLanguageCode,
  TranslatorType,
} from '..';

export interface TranslatorProps<T extends TranslatorType> {
  from: SourceLanguageCode<T>;
  to: LanguageCode<T>;
  value: string;
  type?: T;
  onTranslated: (t: string) => void;
}

const Translator = <T extends TranslatorType = 'google'>(
  props: TranslatorProps<T>,
) => {
  const {from, to, value, onTranslated, type = 'google'} = props;

  return (
    <View style={{width: 0, height: 0}}>
      <WebView
        injectedJavaScript={INJECTED_JAVASCRIPTS[type].component}
        userAgent={INJECTED_JAVASCRIPTS[type].userAgent}
        source={{
          uri: INJECTED_JAVASCRIPTS[type].url(from, to, value),
        }}
        cacheEnabled={true}
        onMessage={event => {
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
