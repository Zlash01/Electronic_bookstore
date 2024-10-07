import {View, Text, Button, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from '../../store/Store';

const Profile = () => {
  const {logout} = useAuthStore();

  const logoutOperation = () => {
    AsyncStorage.removeItem('refreshToken');
    logout();
  };
  return (
    <View>
      <TouchableOpacity onPress={() => logoutOperation()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
