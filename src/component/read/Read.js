import React, {useRef} from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window'); // Get screen width

const SeekBarScreen = () => {
  // Animated value for the thumb's position
  const translateX = useRef(new Animated.Value(0)).current;

  // PanResponder to handle dragging the thumb
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.max(0, Math.min(width * 0.9 - 30, gestureState.dx));
        translateX.setValue(newX); // Update the position within the seek bar bounds
      },
      onPanResponderRelease: (_, gestureState) => {
        const finalX = Math.max(0, Math.min(width * 0.9 - 30, gestureState.dx));
        Animated.spring(translateX, {
          toValue: finalX,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {/* Progress fill view */}
        <Animated.View
          style={[
            styles.progress,
            {
              width: translateX, // Bind the width of the progress fill to the thumb's position
            },
          ]}
        />

        {/* Draggable thumb */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.thumb,
            {
              transform: [{translateX}],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30, // Position the seek bar near the bottom
    backgroundColor: '#fff',
  },
  track: {
    width: '90%',
    height: 10,
    backgroundColor: '#ddd', // Background of the seek bar
    borderRadius: 5,
    justifyContent: 'center',
    position: 'relative',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007bff', // Color of the filled progress
    borderRadius: 5,
    position: 'absolute',
    left: 0,
  },
  thumb: {
    width: 30,
    height: 30,
    backgroundColor: '#007bff',
    borderRadius: 15,
    position: 'absolute',
  },
});

export default SeekBarScreen;
