import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import Translator, {
  TranslatorProvider,
  useTranslator,
} from 'react-native-translator';

const Component = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  return (
    <View>
      <Text>Component</Text>
      <Translator
        from="en"
        to="ko"
        value={value}
        onTranslated={(t) => setResult(t)}
      />
      <TextInput
        placeholder="value (en)"
        value={value}
        style={{fontSize: 24}}
        onChangeText={(t) => setValue(t)}
      />
      <Text style={{fontSize: 24}}>result (ko) : {result}</Text>
    </View>
  );
};

const Hook = () => {
  const {translate} = useTranslator();

  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const onTranslate = async () => {
    const _result = await translate('en', 'ko', value);
    setResult(_result);
  };

  return (
    <View style={{marginTop: 24}}>
      <Text>Hook</Text>
      <TextInput
        placeholder="value (en)"
        value={value}
        style={{fontSize: 24}}
        onChangeText={(t) => setValue(t)}
      />
      <Text style={{fontSize: 24}}>result (ko) : {result}</Text>
      <Button title="translate" onPress={onTranslate} />
    </View>
  );
};

const App = () => {
  return (
    <TranslatorProvider>
      <View style={{flex: 1, paddingVertical: 100, paddingHorizontal: 20}}>
        <Component />
        <Hook />
      </View>
    </TranslatorProvider>
  );
};

export default App;
