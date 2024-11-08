import React, {useRef, useState} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

const HEADER_HEIGHT = 60;
const BOTTOM_TAB_HEIGHT = 50;
const HIDE_TIMEOUT = 3000; // Bars will auto-hide after 3 seconds

const RetractableNavigation = ({children, header, bottomTab}) => {
  const [barsVisible, setBarsVisible] = useState(false);
  const headerTranslateY = useRef(new Animated.Value(-HEADER_HEIGHT)).current;
  const bottomTabTranslateY = useRef(
    new Animated.Value(BOTTOM_TAB_HEIGHT),
  ).current;
  const hideTimeout = useRef(null);

  const showBars = () => {
    // Clear any existing hide timeout
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }

    // Show the bars
    setBarsVisible(true);
    Animated.parallel([
      Animated.spring(headerTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }),
      Animated.spring(bottomTabTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }),
    ]).start();

    // Set timeout to hide bars after HIDE_TIMEOUT
    hideTimeout.current = setTimeout(hideBars, HIDE_TIMEOUT);
  };

  const hideBars = () => {
    setBarsVisible(false);
    Animated.parallel([
      Animated.spring(headerTranslateY, {
        toValue: -HEADER_HEIGHT,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }),
      Animated.spring(bottomTabTranslateY, {
        toValue: BOTTOM_TAB_HEIGHT,
        useNativeDriver: true,
        tension: 40,
        friction: 8,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (barsVisible) {
      hideBars();
    } else {
      showBars();
    }
  };

  // Handle scroll events to hide bars
  const handleScroll = () => {
    if (barsVisible) {
      hideBars();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{translateY: headerTranslateY}],
            },
          ]}>
          {header}
        </Animated.View>

        {/* Content */}
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.content}>
          {children}
        </ScrollView>

        {/* Bottom Tab Bar */}
        <Animated.View
          style={[
            styles.bottomTab,
            {
              transform: [{translateY: bottomTabTranslateY}],
            },
          ]}>
          {bottomTab}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: '#aaa',
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flex: 1,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_TAB_HEIGHT,
    backgroundColor: '#aaa',
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default RetractableNavigation;
