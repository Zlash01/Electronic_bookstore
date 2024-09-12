import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';

const BigStoryCard = (props: {
  title: any;
  idBooks: any;
  description: any;
  imageLink: any;
  author: any;
}) => {
  //extract props
  const {title, description, imageLink, author} = props;

  //limit number of words in title and description and replace the rest with '...'
  function limit(text: string, limit: number): string {
    const truncateAtWordBoundary = (text: string, limit: number): string => {
      if (text.length <= limit) return text;

      const truncated = text.substring(0, limit);
      const lastSpaceIndex = truncated.lastIndexOf(' ');

      let result;
      // If there is a space within the truncated string, cut there
      if (lastSpaceIndex > 0) {
        result = truncated.substring(0, lastSpaceIndex);
      } else {
        result = truncated;
      }

      // Remove punctuation marks if they appear at the end
      result = result.replace(/[.,!?]$/, '');

      return result + '...';
    };

    const limitedText = truncateAtWordBoundary(text, limit);
    return limitedText;
  }

    const limitedText = truncateAtWordBoundary(text, limit);
    return limitedText;
  }

  const limitedTitle = limit(title, 35);
  const limitedDescription = limit(description, 150);

  const bookNavigation = () => {
    //navigate to book page
    console.log('Book Navigation');
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
              style={{
                color: '#d7d7d7',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
              }}>
              Author: {author}
            </Text>
          </View>
        </View>
        <Image
          source={{uri: imageLink}}
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

