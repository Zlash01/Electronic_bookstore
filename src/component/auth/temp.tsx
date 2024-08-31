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
    Dimensions,
    TextInput,
    TouchableOpacity,
    Switch,
  } from 'react-native';
  import CheckBox from '@react-native-community/checkbox';
  import React, {useCallback, useState, useMemo} from 'react';
  import Loading from '../loading/loading';
  import Logo from '../../assets/svg/auth/LogoOnlyNoBackgroundDark.svg';
  import Email from '../../assets/svg/auth/email.svg';
  import Password from '../../assets/svg/auth/password.svg';
  import Facebook from '../../assets/svg/auth/Facebook.svg';
  import Google from '../../assets/svg/auth/google.svg';
  import Visability from '../../assets/svg/auth/visibility.svg';
  import VisabilityOff from '../../assets/svg/auth/visibility_off.svg';
  
  const screenSize = Dimensions.get('window');
  
  const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
  
    const AuthMethodSelection = useCallback(
      async (arg0: number) => {
        const newIsLogin = arg0 === 1;
        if (newIsLogin !== isLogin) {
          setIsLoading(true);
          setIsLogin(newIsLogin);
          await new Promise(resolve => setTimeout(resolve, 1000));
          setIsLoading(false);
        }
      },
      [isLogin],
    );
  
    // Login section
    const LoginSection = () => {
      const [isChecked, setIsChecked] = useState(false);
  
      const [username, setUsername] = useState('');
      const [isPasswordVisible, setIsPasswordVisible] = useState(false);
      const handlePasswordChange = useCallback((text: string) => {
        setPassword(text);
      }, []);
  
      const togglePasswordVisibility = useCallback(() => {
        setIsPasswordVisible(prevState => !prevState);
      }, []);
  
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
  
          {/* Input fields */}
          <View style={styles.inputContainer}>
            <Email style={styles.inputIcon} />
            <TextInput
              placeholder="Email or Username"
              placeholderTextColor={'#918B76'}
              value={username}
              style={styles.textInput}></TextInput>
          </View>
  
          <View style={styles.inputContainer}>
            <Password style={styles.inputIcon} />
            <TextInput
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={handlePasswordChange}
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor={'#918B76'}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 40, top: 14}}
              onPress={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <Visability style={{height: 24, width: 24}} />
              ) : (
                <VisabilityOff style={{height: 24, width: 24}} />
              )}
            </TouchableOpacity>
          </View>
  
          {/* Remember password and forgot password */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 25,
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                value={isChecked}
                onValueChange={setIsChecked}
                tintColors={{true: '#f8f8f8', false: '#f8f8f8'}}
              />
              <Text
                style={{
                  color: '#FAFFFD',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                }}>
                Remember Password
              </Text>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center', alignContent: 'center'}}>
              <Text
                style={{
                  color: '#0197F6',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
  
          {/* Sign in button */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#EB5E28',
                width: screenSize.width - 60,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#FAFFFD',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
  
          {/* "Or login with" text */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text
              style={{
                color: '#9E9E9E',
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
              }}>
              Or login with
            </Text>
          </View>
  
          {/* Facebook and Google login */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#D9D9D9',
                width: screenSize.width - 60,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <Facebook style={{height: 24, width: 24, marginRight: 10}} />
              <Text
                style={{
                  color: '#0866FF',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                }}>
                Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#D9D9D9',
                width: screenSize.width - 60,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <Google style={{height: 24, width: 24, marginRight: 10}} />
              <Text
                style={{
                  color: '#00171F',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                }}>
                Google
              </Text>
            </TouchableOpacity>
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
          {/* {isLogin ? <LoginSection /> : <RegisterSection />} */}
          <LoginSection />
        </KeyboardAvoidingView>
  
        {isLoading && <Loading />}
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
      marginTop: 100,
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
      marginTop: 32,
      marginBottom: 8,
      marginHorizontal: 80,
    },
    authText: {
      fontSize: 20,
      fontFamily: 'Poppins-Medium',
    },
    authSelected: {
      color: '#EB5E28',
      fontFamily: 'Poppins-Bold',
    },
    authNotSelected: {
      color: '#F8F8F8',
    },
    inputContainer: {
      marginTop: 18,
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
    inputIcon: {
      position: 'absolute',
      height: 24,
      width: 24,
      top: 14,
      left: 40,
      color: '#918B76',
      zIndex: 1,
    },
  });
  