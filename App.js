import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Provider, useSelector} from 'react-redux';
import store from './src/redux/store';
import MainStackNavigator from './src/navigation/AppNavigator'

import { StyleSheet, Text, View } from 'react-native';
import { getToDos } from './src/redux/actions';

//call to API - fetchToDos
store.dispatch(getToDos());


export default function App() {
 
  return (
      <Provider store={store}>
        <MainStackNavigator />
        <StatusBar />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcf5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
});
