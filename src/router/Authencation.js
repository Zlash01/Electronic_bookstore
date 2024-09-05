import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../component/auth/Login';
import Register from '../component/auth/Register';

const LoginScreen = Login;
const RegisterScreen = Register;

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen
      name="Register"
      component={RegisterScreen}
      options={{headerShown: true}}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
