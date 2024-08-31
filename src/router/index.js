import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../component/auth/Login';
import Register from '../component/auth/Register';

const LoginScreen = Login;
const RegisterScreen = Register;

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

// const MainStackScreen = () => (
//   <MainStack.Navigator initialRouteName="Home">
//     <MainStack.Screen name="Home" component={HomeScreen} />
//     <MainStack.Screen name="Profile" component={ProfileScreen} />
//   </MainStack.Navigator>
// );

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <MainStackScreen /> : <AuthStackScreen />} */}
      <AuthStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
