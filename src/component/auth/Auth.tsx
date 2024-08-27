import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../asset/svg/auth/LogoOnlyNoBackgroundDark.svg';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View
          style={{
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 150,
          }}>
          <Logo />
          <View style={{marginLeft: 10}}>
            <Text>Electronic</Text>
            <Text>Bookstore</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({});
