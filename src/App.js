import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, TouchableHighlight } from 'react-native';
import Login from "./components/Login";
import Home from "./components/Home";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './store/reducers/user';
import { Provider, useSelector } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import AppNavigator from './navigation/AppNavigator';
// best bractise to comine more than one reducers, if there is more than one.
const rootReducer = combineReducers({
  user: userReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App = () => {



  return (
    <Provider store={store}>


      <AppNavigator></AppNavigator>


    </Provider>
  );
};

const styles = StyleSheet.create({




});

export default App;
