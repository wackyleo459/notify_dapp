/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { backend_backend } from './backend/src/backend_backend';
import { notify_backend_backend } from './notify_backend_backend';
import * as TextEncoder from 'text-encoding';
import Fetch from 'react-native-fetch-api/src/Fetch';
import base64 from 'react-native-base64';
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');

  const greetName = async input => {
    // Interact with foo actor, calling the greet method
    try {
      // const fetch = new Fetch();
      // const greeting = await backend_backend.greet(input);
      notify_backend_backend.greet(input);
      setTimeout(async () => {
        const name = await notify_backend_backend.get();
        setResult(name);
      }, 1000);
      
      
      // console.log('input went through, here is greeting', name);
      // const greeting = await fetch(
      //   'http://localhost:8000/?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai',
      //   {
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: input,
      //   },
      // );
      // console.log(greeting._base64);
      // console.log(base64.decode(greeting._base64));
      // setResult(JSON.stringify(greeting));
    } catch (error) {
      console.error('this is error', error);
    }
    
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={styles.container}>
      <Text> Greet Form </Text>
      <View>
        <TextInput placeholder="Enter Your Name" onChangeText={(text) => setValue(text)} />
      </View>
      <Button
        onPress={(e) => {
          e.preventDefault();
          greetName(value)
        }}
          title="Submit"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
/>
      <StatusBar style="auto" />
      <View>
        <Text>{result}</Text>
      </View>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
