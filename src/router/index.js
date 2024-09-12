import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabBar from './BottomTabBar.js';
import AuthStackScreen from './Authencation.js';
import BookDetail from '../component/bookDetail/BookDetail.tsx';

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <MainStackScreen /> : <AuthStackScreen />} */}
      {/* <AuthStackScreen /> */}
      {/* <BottomTabBar /> */}
      <BookDetail />
    </NavigationContainer>
  );
};

export default Navigation;
