import React from 'react';
import '@testing-library/react-native/extend-expect';
import {jest} from '@jest/globals';
import _ from 'lodash';

// Mocking native module (react-native-webview)
// native module not supported in @testing-library/react-native
jest.mock('react-native-webview', () => {
  const {useEffect} = require('react');
  const {Text, View} = require('react-native');
  const {LOADING_MESSSAGE} = require('./src/classes/translator');

  function TestWebView({injectedJavaScript, userAgent, source, onMessage}) {
    useEffect(() => {
      // fake loading
      onMessage({nativeEvent: {data: LOADING_MESSSAGE}});
      setTimeout(() => {
        onMessage({nativeEvent: {data: '안녕'}});
      }, 1000);
    }, []);

    return (
      <View>
        <Text>{injectedJavaScript}</Text>
        <Text>{userAgent}</Text>
        <Text>{source.uri}</Text>
      </View>
    );
  }

  return {
    __esModule: true,
    default: TestWebView,
  };
});

// ignore debounce on tests
// @ts-ignore
jest.spyOn(_, 'debounce').mockImplementation(fn => fn);
