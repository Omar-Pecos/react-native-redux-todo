import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import MainStackNavigator from './src/navigation/AppNavigator'

import { StyleSheet, Text, View } from 'react-native';
import ToDoList from './src/components/ToDoList';
import { fetchToDos } from './src/redux/actions';

//call to API - fetchToDos
store.dispatch(fetchToDos());

export default function App() {
  return (
    <Provider store={store}>
      <MainStackNavigator />
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
