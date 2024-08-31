import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
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
  );
};

export default Loading;
