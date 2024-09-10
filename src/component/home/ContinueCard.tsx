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
import * as themes from '../../theme/theme';
import * as Progress from 'react-native-progress';
const {width, height} = Dimensions.get('window');

const ITEM_SIZE = width * 0.32;

const ContinueCard = ({data}: {data: any}) => {
  const {title, description, imageLink, author} = data;

  const progressValue = 0.3;
  // Remove unused variables: title, description, author
  const handlePress = () => {
    console.log('Selected book:', title);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={{
          marginBottom: 5,
        }}>
        <Image source={{uri: imageLink}} style={styles.bookImage} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: themes.FONTSIZES.xxs,
          fontFamily: themes.FONTS.medium,
          textAlign: 'right',
          marginBottom: 5,
        }}>
        Continue Reading
      </Text>
      <Progress.Bar progress={progressValue} width={null} color="#EB5E28" />
      <Text
        style={{
          fontSize: themes.FONTSIZES.xxs,
          fontFamily: themes.FONTS.medium,
          textAlign: 'right',
          marginBottom: 5,
        }}>
        {Math.round(progressValue * 100)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.5,
    //transform: [{translateY}],
    // Move the selected item up
    // padding: 0,
    // marginHorizontal: 5,
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    padding: 0,
    marginHorizontal: 0,
  },
  selectedBookImage: {
    width: 100, // Make the selected image larger
    height: 120,
  },
  bookDetails: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    margin: 0,
  },
  bookTitle: {
    fontSize: themes.FONTSIZES.sm,
    fontFamily: themes.FONTS.bold,
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: themes.FONTSIZES.xsm,
    fontFamily: themes.FONTS.medium,
    marginBottom: 5,
  },
  bookDescription: {
    fontSize: themes.FONTSIZES.xs,
    fontFamily: themes.FONTS.light,
    textAlign: 'left',
  },
  bookDetailBtn: {
    fontSize: themes.FONTSIZES.xsm,
    fontFamily: themes.FONTS.medium,
    textAlign: 'right',
    marginTop: 5,
  },
});

export default ContinueCard;
