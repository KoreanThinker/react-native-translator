/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Translator, {TranslatorProvider, useTranslator} from './dist';

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
        type="papago"
        onTranslated={t => setResult(t)}
      />
      <TextInput
        placeholder="value (en)"
        value={value}
        style={{fontSize: 24}}
        onChangeText={t => setValue(t)}
      />
      <Text style={{fontSize: 24}}>result (ko) : {result}</Text>
    </View>
  );
};

const Hook = () => {
  const {translate} = useTranslator();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const onTranslate = async () => {
    try {
      setLoading(true);
      const _result = await translate('en', 'kr', value, {
        type: 'kakao',
        timeout: 10000,
      });
      setResult(_result);
    } catch (error) {
      Alert.alert('Translate error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{marginTop: 24}}>
      <Text>Hook</Text>
      <TextInput
        placeholder="value (en)"
        value={value}
        style={{fontSize: 24}}
        onChangeText={t => setValue(t)}
      />
      <Text style={{fontSize: 24}}>result (ko) : {result}</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="translate" onPress={onTranslate} />
      )}
    </View>
  );
};

const App = () => {
  return (
    <TranslatorProvider>
      <View
        style={{
          flex: 1,
          paddingVertical: 100,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
        }}>
        <Component />
        <Hook />
      </View>
    </TranslatorProvider>
  );
};

export default App;
