# React Native Translator

[![npm version](https://badge.fury.io/js/react-native-translator.svg)](https://www.npmjs.com/package/react-native-translator)
[![License MIT](https://img.shields.io/github/license/KoreanThinker/react-native-translator?style=plat)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Example](https://img.shields.io/badge/example-here!-blue)](https://github.com/krtk-dev/translators)
![Stars](https://img.shields.io/github/stars/KoreanThinker/react-native-translator?style=social)

## Preview

## <img width="360" src="https://user-images.githubusercontent.com/48207131/158834248-05331dd0-d294-4041-9d7b-cb72b5e75737.gif" />

---

## Introduce

Free translate component & hook

> Never need api key, This library is Unlimited free

---

## Support translators

- [Google](https://translate.google.com/)
- [Papago](https://papago.naver.com/)
- [Kakao](https://translate.kakao.com/)

---

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

---

## API

```ts
// Component
interface TranslatorProps<T extends TranslatorType = 'google'> {
  from: LanguageCode<T>;
  to: LanguageCode<T>;
  value: string;
  type?: T; // default 'google'
  onTranslated: (t: string) => void;
}
// Hook
type translate: <T extends TranslatorType = 'google'>(
  from: LanguageCode<T>,
  to: LanguageCode<T>,
  value: string,
  option?: {
    type?: T; // default 'google'
    timeout?: number; // default 5000
  },
) => Promise<string>;
// etc
type TranslatorType = 'google' | 'kakao' | 'papago' | ...
type LanguageCode<T extends TranslatorType> = 'af' | 'ga' | 'sq' | ...
```

--

## Support languages

```tsx
// You can use like that
import {
  LANGUAGE_CODES,
  TRANSLATOR_TYPES,
  languageCodeConverter,
} from 'react-native-translator';
// translator types
TRANSLATOR_TYPES = ["google", "papago", "kakao", ...]
// language code
const googleLanguageCodes = LANGUAGE_CODES['google']; // ["af", "ga", "sq", ...]
// convert code
const convertedCode = languageCodeConverter('google', 'papago', 'ko');
// code -> 'kr' // if can not convertable return undifined
```

| Language            | Google | Papago | Kakao |
| ------------------- | ------ | ------ | ----- |
| Afrikaans           | af     |        |       |
| Irish               | ga     |        |       |
| Albanian            | sq     |        |       |
| Italian             | it     | it     | it    |
| Arabic              | ar     |        | ar    |
| Japanese            | ja     | ja     | jp    |
| Azerbaijani         | az     |        |       |
| Kannada             | kn     |        |       |
| Basque              | eu     |        |       |
| Korean              | ko     | ko     | kr    |
| Bengali             | bn     |        | bn    |
| Latin               | la     |        |       |
| Belarusian          | be     |        |       |
| Latvian             | lv     |        |       |
| Bulgarian           | bg     |        |       |
| Lithuanian          | lt     |        |       |
| Catalan             | ca     |        |       |
| Macedonian          | mk     |        |       |
| Chinese Simplified  | zh-CN  | zh-CN  | cn    |
| Malay               | ms     |        |       |
| Chinese Traditional | zh-TW  | zh-TW  | cn    |
| Maltese             | mt     |        |       |
| Croatian            | hr     |        |       |
| Norwegian           | no     |        |       |
| Czech               | cs     |        |       |
| Persian             | fa     |        |       |
| Danish              | da     |        |       |
| Polish              | pl     |        |       |
| Dutch               | nl     |        | nl    |
| Portuguese          | pt     |        | pt    |
| English             | en     | en     | en    |
| Romanian            | ro     |        |       |
| Esperanto           | eo     |        |       |
| Russian             | ru     | ru     | ru    |
| Estonian            | et     |        |       |
| Serbian             | sr     |        |       |
| Filipino            | tl     |        |       |
| Slovak              | sk     |        |       |
| Finnish             | fi     |        |       |
| Slovenian           | sl     |        |       |
| French              | fr     | fr     | fr    |
| Spanish             | es     | es     | es    |
| Galician            | gl     |        |       |
| Swahili             | sw     |        |       |
| Georgian            | ka     |        |       |
| Swedish             | sv     |        |       |
| German              | de     | de     | de    |
| Tamil               | ta     |        |       |
| Greek               | el     |        |       |
| Telugu              | te     |        |       |
| Gujarati            | gu     |        |       |
| Thai                | th     | th     | th    |
| Haitian Creole      | ht     |        |       |
| Turkish             | tr     |        | tr    |
| Hebrew              | iw     |        |       |
| Ukrainian           | uk     |        |       |
| Hindi               | hi     |        | hi    |
| Urdu                | ur     |        |       |
| Hungarian           | hu     |        |       |
| Vietnamese          | vi     | vi     | vi    |
| Icelandic           | is     |        |       |
| Welsh               | cy     |        |       |
| Indonesian          | id     | id     | id    |
| Yiddish             | yi     |        |       |
