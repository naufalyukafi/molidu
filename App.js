/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import firebase from '@react-native-firebase/app';
import Router from './src/router'


const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyACsW7cbakZso75a_01tios6IrazyGRTos",
    authDomain: "molidu-learning.firebaseapp.com",
    projectId: "molidu-learning",
    storageBucket: "molidu-learning.appspot.com",
    messagingSenderId: "109794889729",
    appId: "1:109794889729:web:e14530216d38b7e024b000",
    measurementId: "G-T2Z7SHCJNZ"
  };

  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Router />
      </ApplicationProvider>
    </>
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
