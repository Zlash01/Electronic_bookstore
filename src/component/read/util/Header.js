import React, {useState, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Platform,
  Touchable,
  Text,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

import ArrowBack from '../../../assets/svg/universal/arrow_back.svg';
import Menu from '../../../assets/svg/universal/view_headline.svg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75; // 3/4 of screen width

const HeaderDrawer = ({isVisible, onClose}) => {
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: DRAWER_WIDTH,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {/* Blur Overlay */}
      <Animated.View style={[styles.overlay, {opacity: overlayOpacity}]}>
        <Pressable style={styles.blurContainer} onPress={onClose}>
          {Platform.OS === 'ios' ? (
            <BlurView style={styles.blur} blurType="dark" blurAmount={6} />
          ) : (
            <View style={[styles.blur, styles.androidBlur]} />
          )}
        </Pressable>
      </Animated.View>

      {/* Drawer Content */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{translateX: slideAnim}],
          },
        ]}>
        {/* Your drawer content will go here */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  blurContainer: {
    flex: 1,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  androidBlur: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

// Updated Header component with drawer functionality
const Header = props => {
  //   const navigation = useNavigation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* back button */}
        <Touchable
          onPress={
            () => {}
            // navigation.goBack()
          }>
          <ArrowBack width={24} height={24} />
        </Touchable>
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Hello test
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setIsDrawerVisible(true)}>
            <Menu width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>

      <HeaderDrawer
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      />
    </View>
  );
};

export default Header;
