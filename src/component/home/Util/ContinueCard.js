import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import * as themes from '../../../theme/theme';
import * as Progress from 'react-native-progress';

const {width, height} = Dimensions.get('window');

const ITEM_SIZE = width * 0.32;

const ContinueCard = props => {
  const handlePress = () => {
    console.log('Selected book:', title);
  };

  return (
    <View
      style={{
        width: ITEM_SIZE,
        height: 'auto',
        gap: 10,
        flexDirection: 'column',
      }}>
      <TouchableOpacity style={{height: ITEM_SIZE * 1.5}}>
        <Image
          source={
            props.imageLink
              ? {uri: props.imageLink}
              : require('../../../assets/picture/universal/R.png')
          }
          style={{width: '100%', height: '100%', borderRadius: 8, padding: 0}}
        />
      </TouchableOpacity>
      <Text
        numberOfLines={2}
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 18,
          color: '#f8f8f8',
          textAlign: 'center',
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export default ContinueCard;
