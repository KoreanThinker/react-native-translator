# React Native Translator

[![CI](https://github.com/KoreanThinker/react-native-translator/actions/workflows/ci.yaml/badge.svg)](https://github.com/KoreanThinker/react-native-translator/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/KoreanThinker/react-native-translator/graph/badge.svg?token=9T36KDBTMQ)](https://codecov.io/gh/KoreanThinker/react-native-translator)
[![npm version](https://badge.fury.io/js/react-native-translator.svg)](https://www.npmjs.com/package/react-native-translator)
[![npm download](https://img.shields.io/npm/dt/react-native-translator)](https://www.npmjs.com/package/react-native-translator)
[![License MIT](https://img.shields.io/github/license/KoreanThinker/react-native-translator?style=plat)](LICENSE)
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
...
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

## API

### `Translator` ( Real-time translate )

```tsx
// Usage
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

| Props        | Type                               | Default value | Required |
| ------------ | ---------------------------------- | ------------- | -------- |
| from         | [LanguageCode](#support-languages) |               | ✅        |
| to           | [LanguageCode](#support-languages) |               | ✅        |
| value        | string                             |               | ✅        |
| type         | [TranslatorType](#translatortype)  | 'google'      |          |
| onTranslated | `(result: string) => void`         |               | ✅        |

### `useTranslator`

```tsx
// Usage
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

#### `translate`

```ts
// const {translate} = useTranslator();
type translate: <T extends TranslatorType>(/* check follow param table */) => Promise<string>;
```

| param  | Type                                                         | Default value                   | Required |
| ------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| from   | [LanguageCode](#support-languages)                           |                                 | ✅        |
| to     | [LanguageCode](#support-languages)                           |                                 | ✅        |
| value  | string                                                       |                                 | ✅        |
| option | {type?: [TranslatorType](#translatortype), timeout?: number} | {type: 'google', timeout: 5000} |          |

### `languageCodeConverter`

> ❗️ If conversion is not possible, return undefined.

```ts
import {languageCodeConverter} from 'react-native-translator';
// google language code convert to kakao language code
languageCodeConverter('google', 'kakao', 'ko'); // kr
```

### `TranslatorType`

```ts
type TranslatorType = 'google' | 'kakao' | 'papago';
```

### `LanguageCode`

```ts
type LanguageCode<T extends TranslatorType> ...
// Usage
type GoogleLanguageCode = LanguageCode<'google'>;
```

### `VALUES`

```tsx
import {LANGUAGE_CODES, TRANSLATOR_TYPES} from 'react-native-translator';
// translator types
TRANSLATOR_TYPES; // ["google", "papago", "kakao", ...]
// language code
LANGUAGE_CODES['google']; // ["af", "ga", "sq", ...]
```

---

## Support languages

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
