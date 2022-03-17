# React Native Translator

[![npm version](https://badge.fury.io/js/react-native-translator.svg)](https://www.npmjs.com/package/react-native-translator)
[![License MIT](https://img.shields.io/github/license/KoreanThinker/react-native-translator?style=plat)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
![Stars](https://img.shields.io/github/stars/KoreanThinker/react-native-translator?style=social)

Free google translate component & hook

## Preview

<img width="360" src="https://user-images.githubusercontent.com/48207131/158811671-c50b8db5-7926-4a66-b22b-d02e71af5a46.gif" />

## Getting started

#### First, Install package

```bash
yarn add react-native-translator react-native-webview
```

#### Second, Pod intsall

```bash
cd ios && pod install
```

#### Third, Add provider

```tsx
// App.js
import React from 'react';
import {View} from 'react-native';
import {TranslatorProvider} from 'react-native-translator' // here

const App = () => {
  return (
    <TranslatorProvider> // here
        <.../>
    </TranslatorProvider> // here
  );
};
```

---

## Usage

### Use Component (real time)

```tsx
import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import Translator from 'react-native-translator';

const App = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  return (
    <View>
      <Translator
        from="en"
        to="fr"
        value={value}
        onTranslated={(t) => setResult(t)}
      />
      <TextInput value={value} onChangeText={(t) => setValue(t)} />
      <Text>{result}</Text>
    </View>
  );
};
```

### Use Hook (event)

```tsx
import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {useTranslator} from 'react-native-translator';

const App = () => {
  const {translate} = useTranslator();

  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const onTranslate = async () => {
    const _result = await translate('en', 'fr', value);
    setResult(_result);
  };

  return (
    <View>
      <TextInput value={value} onChangeText={(t) => setValue(t)} />
      <Text>{result}</Text>
      <Button title="translate" onPress={onTranslate} />
    </View>
  );
};
```

## Support languages

```tsx
// You can use like that
import {LANGUAGE_CODES, LanguageCode} from 'react-native-translator';
// LanguageCode = "af" | "ga" | "sq" | ...
// LANGUAGE_CODES: LanguageCode[] = ["af", "ga", "sq", ...]
```

| Language Name       | Language Code |
| ------------------- | ------------- |
| Afrikaans           | af            |
| Irish               | ga            |
| Albanian            | sq            |
| Italian             | it            |
| Arabic              | ar            |
| Japanese            | ja            |
| Azerbaijani         | az            |
| Kannada             | kn            |
| Basque              | eu            |
| Korean              | ko            |
| Bengali             | bn            |
| Latin               | la            |
| Belarusian          | be            |
| Latvian             | lv            |
| Bulgarian           | bg            |
| Lithuanian          | lt            |
| Catalan             | ca            |
| Macedonian          | mk            |
| Chinese Simplified  | zh-CN         |
| Malay               | ms            |
| Chinese Traditional | zh-TW         |
| Maltese             | mt            |
| Croatian            | hr            |
| Norwegian           | no            |
| Czech               | cs            |
| Persian             | fa            |
| Danish              | da            |
| Polish              | pl            |
| Dutch               | nl            |
| Portuguese          | pt            |
| English             | en            |
| Romanian            | ro            |
| Esperanto           | eo            |
| Russian             | ru            |
| Estonian            | et            |
| Serbian             | sr            |
| Filipino            | tl            |
| Slovak              | sk            |
| Finnish             | fi            |
| Slovenian           | sl            |
| French              | fr            |
| Spanish             | es            |
| Galician            | gl            |
| Swahili             | sw            |
| Georgian            | ka            |
| Swedish             | sv            |
| German              | de            |
| Tamil               | ta            |
| Greek               | el            |
| Telugu              | te            |
| Gujarati            | gu            |
| Thai                | th            |
| Haitian Creole      | ht            |
| Turkish             | tr            |
| Hebrew              | iw            |
| Ukrainian           | uk            |
| Hindi               | hi            |
| Urdu                | ur            |
| Hungarian           | hu            |
| Vietnamese          | vi            |
| Icelandic           | is            |
| Welsh               | cy            |
| Indonesian          | id            |
| Yiddish             | yi            |
