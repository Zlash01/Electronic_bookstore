import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const IndividualChapter = props => {
  const navigation = useNavigation();

  const handleChapterPress = () => {
    navigation.navigate('Read', {
      idChapter: props.chapterId,
      booktitle: props.chapterTitle,
      chapterNumber: props.chapterNumber,
      bookId: props.bookId,
      chapterList: props.chapterList,
    });
  };
  return (
    <TouchableOpacity
      onPress={handleChapterPress}
      style={{
        backgroundColor: 'transparent',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#626262',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 8,
        paddingTop: 14,
        gap: 5,
      }}>
      <Text
        numberOfLines={2}
        style={{
          paddingStart: 5,
          fontFamily: 'Poppins-Medium',
          fontSize: 14,
          color: '#BABABA',
          flex: 8,
        }}>
        Chapter {props.chapterNumber}: {props.chapterTitle}
      </Text>
      <Text
        style={{
          paddingEnd: 22,
          color: '#979797',
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
          alignSelf: 'center',
          textAlign: 'right',
          flex: 2,
        }}>
        {props.chapterDate}
      </Text>
    </TouchableOpacity>
  );
};

export default IndividualChapter;
