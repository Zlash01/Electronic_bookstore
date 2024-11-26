import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {ArrowLeft, Languages, LogOut} from 'lucide-react-native'; // Using Lucide icons like other components
import {useAuthStore} from '../../store/Store'; // Assuming this is where logout is handled
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({navigation}) => {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const {logout} = useAuthStore();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('refreshToken');
    logout();
    // Assuming navigation to Login screen after logout
    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#00171F'}}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#323232',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#f8f8f8" size={24} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#f8f8f8',
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            marginLeft: 16,
          }}>
          Settings
        </Text>
      </View>

      {/* Settings Options */}
      <ScrollView>
        {/* Language Option */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#323232',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Languages color="#f8f8f8" size={24} />
            <Text
              style={{
                color: '#f8f8f8',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                marginLeft: 16,
              }}>
              Language
            </Text>
          </View>
          <Text
            style={{
              color: '#EB5E28',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
            }}>
            {currentLanguage}
          </Text>
        </TouchableOpacity>

        {/* Logout Option */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#323232',
          }}>
          <LogOut color="#f8f8f8" size={24} />
          <Text
            style={{
              color: '#f8f8f8',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              marginLeft: 16,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Setting;
