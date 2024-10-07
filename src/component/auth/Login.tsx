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
import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import Loading from '../loading/loading';
import {loginRequest} from '../../api/apiController';
import {useAuthStore} from '../../store/Store';

// SVG imports
import Logo from '../../assets/svg/auth/LogoOnlyNoBackgroundDark.svg';
import Email from '../../assets/svg/auth/email.svg';
import Password from '../../assets/svg/auth/password.svg';
import Facebook from '../../assets/svg/auth/Facebook.svg';
import Google from '../../assets/svg/auth/google.svg';
import Visability from '../../assets/svg/auth/visibility.svg';
import VisabilityOff from '../../assets/svg/auth/visibility_off.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenSize = Dimensions.get('window');

const Login = ({navigation}: {navigation: NavigationProp<any>}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [failedLogin, setFailedLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {login} = useAuthStore.getState() as {
    login: (userData: any, accessToken: string, refreshToken: string) => void;
  };

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);

  useEffect(() => {
    // Check if username and password are saved in local storage
    AsyncStorage.getItem('username').then(value => {
      if (value) {
        setUsername(value);
      }
    });

    AsyncStorage.getItem('password').then(value => {
      if (value) {
        setPassword(value);
        setIsChecked(true);
      }
    });
  }, []);

  const handleLogin = () => {
    console.log('Login');
    console.log('Username: ', username);
    console.log('Password: ', password);
    console.log('Remember Password: ', isChecked);

    // Check if username and password are empty
    if (username === '' || password === '') {
      setFailedLogin('Username and Password cannot be empty');
      return;
    }

    setIsLoading(true);
    loginRequest(username, password)
      .then(response => {
        console.log('Response: ', response);
        console.log('Response status: ', response?.status);
        if (response && response.status === 201) {
          console.log('Login successful');
          setFailedLogin('');

          //save remember password and username to local storage
          console.log('Save username to local storage');
          AsyncStorage.setItem('username', username);
          console.log('Save refresh token to local storage');
          AsyncStorage.setItem('refreshToken', response.data.refresh_token);
          if (isChecked) {
            console.log('Save password to local storage');
            AsyncStorage.setItem('password', password);
          } else {
            console.log('Remove password from local storage');
            AsyncStorage.removeItem('password');
          }

          //save user data to store
          login(
            response.data.userProfile,
            response.data.access_token,
            response.data.refresh_token,
          );
        }
      })
      .catch(error => {
        if (error && error.response && error.response.status === 404) {
          setFailedLogin('Invalid username or password');
        } else {
          setFailedLogin('Unexpected error occurred');
        }
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false in both success and failure cases
      });
  };

  const handleGoogleLogin = () => {
    console.log('Google Login');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook Login');
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const DisplayFailedLogin = ({text}: {text: string}) => {
    const displayText = text ? text : 'Unexpected error occurred';
    return (
      <View
        style={{
          marginTop: 10,
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Poppins-LightItalic',
            color: 'red',
          }}>
          {displayText}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View>
          <View style={styles.logoContainer}>
            <Logo style={styles.logo as StyleProp<TextStyle>} />
            <View style={styles.textContainer}>
              <Text style={[styles.title, {}]}>Electronic</Text>
              <Text style={styles.title}>Bookstore</Text>
            </View>
          </View>

          {/* Input fields */}
          <View style={styles.inputContainer}>
            <Email style={styles.inputIcon} />
            <TextInput
              placeholder="Email or Username"
              placeholderTextColor={'#918B76'}
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.textInput}></TextInput>
          </View>

          <View style={styles.inputContainer}>
            <Password style={styles.inputIcon} />
            <TextInput
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor={'#918B76'}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 40, top: 14}}
              onPress={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <VisabilityOff
                  style={styles.vis as StyleProp<TextStyle>} // Set background colors
                />
              ) : (
                <Visability
                  style={styles.vis as StyleProp<TextStyle>} // Set background colors
                />
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
              onPress={handleForgotPassword}
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
              onPress={handleLogin}
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

          {/* Failed login */}
          {failedLogin && <DisplayFailedLogin text={failedLogin} />}

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
              onPress={handleFacebookLogin}
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
              onPress={handleGoogleLogin}
              style={{
                backgroundColor: '#D9D9D9',
                width: screenSize.width - 60,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                marginTop: 15,
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

          {/* Register */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              gap: 5,
              marginTop: 24,
            }}>
            <Text
              style={{
                color: '#9E9E9E',
                fontFamily: 'Poppins-Light',
                fontSize: 13,
              }}>
              Don't have an Account?
            </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text
                style={{
                  color: '#0197F6',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 13,
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

export default Login;

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
    marginBottom: 18,
  },
  textContainer: {
    marginLeft: 10,
    flexDirection: 'column',

    alignContent: 'flex-end',
  },
  title: {
    fontSize: 28,
    color: '#FAFFFD',
    fontFamily: 'Poppins-Bold',
  },
  logo: {
    color: '#FAFFFD' as ColorValue,
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
    color: '#00171F',
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
  vis: {
    width: 24,
    height: 24,
    zIndex: 1,
    color: '#918B76',
  },
});
