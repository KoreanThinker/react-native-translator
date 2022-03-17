# react-native-translator

Free translate component & hook

## Preview

## Getting started

#### First, Install package

```bash
yarn add react-native-translator react-native-webview
```

#### Second, Pod intsall

```bash
cd ios && pod install
```

#### Add provider

```

```

---

## Usage

### Component (Realtime)

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

### Hook

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
      <Button onPress={onTranslate}>translate</Button>
    </View>
  );
};
```

## Typescript

```ts

```
