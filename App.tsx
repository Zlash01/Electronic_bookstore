import {View, Text} from 'react-native';
import React from 'react';
import Auth from './src/component/auth/Login';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackScreen from './src/router/index.js';

const App = () => {
  return <AuthStackScreen />;
};

export default App;
