import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshRequest} from '../api/apiController.js';
import AuthStackScreen from './Authencation.js';
import {useAuthStore} from '../store/Store.js';
import Main from './BottomTabBar.js';

const Navigation = () => {
  const {isLogin} = useAuthStore();
  const {login} = useAuthStore.getState();

  useEffect(() => {
    // check if user is authenticated
    AsyncStorage.getItem('refreshToken').then(token => {
      if (token) {
        refreshRequest(token).then(response => {
          if (response.status === 201) {
            console.log('Token refreshed');
            AsyncStorage.setItem('refreshToken', response.data.refreshToken);
            AsyncStorage.setItem('accessToken', response.data.accessToken);
            login(
              response.data,
              response.data.accessToken,
              response.data.refreshToken,
            );
          } else {
            console.log('error', response);
          }
        });
      } else {
        console.log('refreshToken is null');
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {!isLogin ? <Main /> : <AuthStackScreen />}
      {/* <Main /> */}
    </NavigationContainer>
  );
};

export default Navigation;
