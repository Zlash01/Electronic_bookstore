import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import limit from '../../../util/limitWord';
import {useNavigation} from '@react-navigation/native';

const BigStoryCard = props => {
  const navigation = useNavigation();

  //extract props
  const {title, description, imageLink, authorId} = props;
  // console.log('BigStoryCard:', props);

  //limit number of words in title and description and replace the rest with '...'
  // console.log('Title', title);
  // console.log('Description', description);
  const limitedTitle = title ? limit(title, 35) : '';
  const limitedDescription = description ? limit(description, 150) : '';

  const bookNavigation = () => {
    //navigate to book page
    console.log('Book Navigation ID', props.idBooks);
    navigation.navigate('Detail', {
      idBooks: props.idBooks,
    });
  };

  return (
    <View
      style={{
        width: 350,
        height: 220,

        position: 'relative',
      }}>
      <TouchableOpacity
        onPress={bookNavigation}
        style={{
          backgroundColor: '#30302F',
          borderRadius: 10,
          width: 350,
          height: 200,
          position: 'absolute',
          bottom: 0,
        }}>
        <View
          style={{
            position: 'absolute',
            width: 190,
            height: 200,
            bottom: 0,
            right: 0,
          }}>
          <View
            style={{
              padding: 10,
              paddingBottom: 5,
            }}>
            <Text
              style={{
                color: '#f8f8f8',
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold',
              }}>
              {limitedTitle}
            </Text>
            <Text
              style={{
                color: '#D2CEDC',
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
              }}>
              {limitedDescription}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#d7d7d7',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
              }}>
              Author: User@{authorId}
            </Text>
          </View>
        </View>
        <Image
          source={
            imageLink
              ? {uri: imageLink}
              : require('../../../assets/picture/universal/R.png')
          }
          style={{
            width: 145,
            height: 200,
            resizeMode: 'contain',
            position: 'absolute',
            top: -20,
            left: 15,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BigStoryCard;
