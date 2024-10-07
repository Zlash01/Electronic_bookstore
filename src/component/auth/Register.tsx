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
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';

// SVG imports
import Loading from '../loading/loading';
import Logo from '../../assets/svg/auth/LogoOnlyNoBackgroundDark.svg';
import Email from '../../assets/svg/auth/email.svg';
import Password from '../../assets/svg/auth/password.svg';
import Facebook from '../../assets/svg/auth/Facebook.svg';
import Google from '../../assets/svg/auth/google.svg';
import Visability from '../../assets/svg/auth/visibility.svg';
import VisabilityOff from '../../assets/svg/auth/visibility_off.svg';
import {registerRequest} from '../../api/apiController';

const screenSize = Dimensions.get('window');

const Register = ({navigation}: {navigation: NavigationProp<any>}) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Register',
      headerStyle: {
        backgroundColor: '#00171F',
      },
      headerTintColor: '#FAFFFD',
      headerTitleStyle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
      },
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [failedRegister, setFailedRegister] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);

  const handleRegister = () => {
    console.log('Username: ', username);
    console.log('Email: ', email);
    console.log('Password: ', password);
    console.log('Confirm Password: ', confirmPassword);
    //check if any field is empty
    if (!username || !email || !password || !confirmPassword) {
      setFailedRegister('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      setFailedRegister('Passwords do not match');
      return;
    }
    //check if email is valid
    if (!email.includes('@') || !email.includes('.')) {
      setFailedRegister('Invalid email');
      return;
    }

    setIsLoading(true);
    //call register api
    registerRequest(email, username, password)
      .then(response => {
        if (response.status === 201) {
          Alert.alert('Registration successful', 'Please login to continue', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ]);
        }
      })
      .catch(error => {
        if (error.response) {
          setFailedRegister(error.response.data.message);
        } else {
          setFailedRegister('Unexpected error occurred');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleRegister = () => {
    console.log('Google Login');
  };

  const handleFacebookRegister = () => {
    console.log('Facebook Login');
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };

  const DisplayFailedRegister = ({text}: {text: string}) => {
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

  const displayFailedLogin = () => {
    console.log('Login failed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View>
          <View style={styles.logoContainer}>
            <Logo style={styles.logo as StyleProp<TextStyle>} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Electronic</Text>
              <Text style={styles.title}>Bookstore</Text>
            </View>
          </View>

          {/* Input fields */}
          <View style={styles.inputContainer}>
            <Email style={styles.inputIcon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor={'#918B76'}
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.textInput}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Email style={styles.inputIcon} />
            <TextInput
              placeholder="Username"
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
                  style={{
                    height: 24,
                    width: 24,
                    zIndex: 1,
                  }} // Set background color
                  fill={'#918B76'} // Set icon color
                />
              ) : (
                <Visability
                  style={{
                    height: 24,
                    width: 24,
                    zIndex: 1,
                    backgroundColor: '#D9D9D9',
                  }}
                  fill={'#918B76'}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Password style={styles.inputIcon} />
            <TextInput
              secureTextEntry={!isPasswordVisible}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              style={styles.textInput}
              placeholder="Confirm Password"
              placeholderTextColor={'#918B76'}
            />
          </View>

          {/* Sign in button */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={handleRegister}
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
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* failed register */}
          {failedRegister && DisplayFailedRegister({text: failedRegister})}

          {/* "Or register with" text */}
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
              Or register with
            </Text>
          </View>

          {/* Facebook and Google register */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={handleFacebookRegister}
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
              onPress={handleGoogleRegister}
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
        </View>
      </KeyboardAvoidingView>

      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00171F',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 70,
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
});
