import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabBar from './BottomTabBar.js';
import AuthStackScreen from './Authencation.js';

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <MainStackScreen /> : <AuthStackScreen />} */}
      {/* <AuthStackScreen /> */}
      <BottomTabBar />
    </NavigationContainer>
  );
};

export default Navigation;
