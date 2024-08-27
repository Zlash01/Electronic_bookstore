import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  ColorValue,
  StyleProp,
  TextStyle,
  Pressable,
  GestureResponderEvent,
  ActivityIndicator,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../assets/svg/auth/LogoOnlyNoBackgroundDark.svg';
import Email from '../../assets/svg/auth/email.svg';

const screenSize = Dimensions.get('window');

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function AuthMethodSelection(arg0: number): Promise<void> {
    const newIsLogin = arg0 === 1;
    if (newIsLogin !== isLogin) {
      setIsLoading(true);
      setIsLogin(newIsLogin);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    }
  }

  const LoginSection = () => {
    return (
      <View>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo as StyleProp<TextStyle>} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Electronic</Text>
            <Text style={styles.title}>Bookstore</Text>
          </View>
        </View>

        <View style={styles.authSelectionContainer}>
          <Pressable onPress={() => AuthMethodSelection(1)}>
            <Text
              style={[
                styles.authText,
                isLogin ? styles.authSelected : styles.authNotSelected,
              ]}>
              Login
            </Text>
          </Pressable>
          <Pressable onPress={() => AuthMethodSelection(2)}>
            <Text
              style={[
                styles.authText,
                !isLogin ? styles.authSelected : styles.authNotSelected,
              ]}>
              Register
            </Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Email style={styles.emailIcon} />
          <TextInput
            placeholder="Email or Username"
            placeholderTextColor={'#918B76'}
            style={styles.textInput}></TextInput>
        </View>
      </View>
    );
  };

  const RegisterSection = () => {
    return (
      <View>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo as StyleProp<TextStyle>} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Electronic</Text>
            <Text style={styles.title}>Bookstore</Text>
          </View>
        </View>

        <View style={styles.authSelectionContainer}>
          <Pressable onPress={() => AuthMethodSelection(1)}>
            <Text
              style={[
                styles.authText,
                isLogin ? styles.authSelected : styles.authNotSelected,
              ]}>
              Login
            </Text>
          </Pressable>
          <Pressable onPress={() => AuthMethodSelection(2)}>
            <Text
              style={[
                styles.authText,
                !isLogin ? styles.authSelected : styles.authNotSelected,
              ]}>
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        {isLogin ? <LoginSection /> : <RegisterSection />}
      </KeyboardAvoidingView>

      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00171F',
            zIndex: 1,
          }}>
          <ActivityIndicator
            size="large"
            color="#EB5E28"
            style={{
              transform: [{scale: 2}],
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00171F',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 150,
  },
  textContainer: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
    color: '#FAFFFD',
    fontFamily: 'Poppins-SemiBold',
  },
  logo: {
    color: '#FAFFFD' as ColorValue,
  },
  authSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 28,
    marginHorizontal: 80,
  },
  authText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  authSelected: {
    color: '#EB5E28',
  },
  authNotSelected: {
    color: '#F8F8F8',
  },
  inputContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textInput: {
    backgroundColor: '#D9D9D9',
    height: 50,
    width: screenSize.width - 60,
    marginHorizontal: 20,
    paddingHorizontal: 44,
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    textAlignVertical: 'bottom',
  },
  emailIcon: {
    position: 'absolute',
    height: 24,
    width: 24,
    top: 14,
    left: 40,
    color: '#918B76',
    zIndex: 1,
  },
});
