import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import Translator from 'react-native-translator';

const App = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  return (
    <View style={{flex: 1, paddingVertical: 100, paddingHorizontal: 20}}>
      <Translator
        from="en"
        to="ko"
        value={value}
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

export default App;
