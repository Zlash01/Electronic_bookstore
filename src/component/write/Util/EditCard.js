import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Modal} from 'react-native';

import Views from '../../../assets/svg/write/visibility.svg';
import Rating from '../../../assets/svg/write/rating.svg';
import Toc from '../../../assets/svg/write/toc.svg';
import More from '../../../assets/svg/write/more_horiz.svg';
import {useNavigation} from '@react-navigation/native';
import {
  publishBook,
  unpublishBook,
  deleteBook,
} from '../../../api/apiController';

const HEIGHT = Dimensions.get('window').height;

viewConversion = view => {
  //convert to k, m, b
  if (view < 1000) return view;
  if (view < 1000000) return (view / 1000).toFixed(1) + 'k';
  if (view < 1000000000) return (view / 1000000).toFixed(1) + 'm';
  return (view / 1000000000).toFixed(1) + 'b';
};

const DropdownMenu = ({id, options, onSelect}) => {
  const [isSelect, setIsSelect] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({top: 0, right: 0});
  const iconRef = useRef(null);

  const measureIconPosition = () => {
    console.log('Measuring icon position...');
    if (iconRef.current) {
      iconRef.current.measure((x, y, width, height, pageX, pageY) => {
        // Calculate position based on icon's location
        const windowHeight = Dimensions.get('window').height;
        const dropdownHeight = options.length * 44; // Approximate height of dropdown

        // Ensure dropdown doesn't go off screen bottom
        const top = pageY + height;
        const adjustedTop =
          top + dropdownHeight > windowHeight ? pageY - dropdownHeight : top;

        setDropdownPosition({
          top: adjustedTop,
          right: Dimensions.get('window').width - (pageX + width),
        });
        console.log('Dropdown position: ', dropdownPosition);
        setIsSelect(true);
      });
    }
  };

  const handleSelect = useCallback(
    label => {
      onSelect(label);
      setIsSelect(false);
    },
    [onSelect],
  );

  const handleClose = useCallback(() => {
    setIsSelect(false);
  }, []);

  return (
    <View
      style={{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
      }}>
      <TouchableOpacity
        ref={iconRef}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={() => {
          console.log('Options of book with id: ' + id);
          setIsSelect(!isSelect);
          measureIconPosition();
        }}>
        <More />
      </TouchableOpacity>

      <Modal
        visible={isSelect}
        transparent={true}
        animationType="none"
        onRequestClose={handleClose}
        style={{}}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
          onPress={handleClose}>
          <View
            style={{
              position: 'absolute',
              top: dropdownPosition.top,
              right: dropdownPosition.right,
              width: 150,
              backgroundColor: '#00171F',
              borderRadius: 4,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option.label)}
                style={{
                  padding: 12,
                  borderBottomWidth: index === options.length - 1 ? 0 : 1,
                  borderColor: '#1F1F1F',
                }}>
                <Text style={{color: 'white'}}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const EditCard = ({data, navigation, onRefresh}) => {
  const title = data?.title ? data.title : 'No Title';
  const coverImageLink = data?.coverImage
    ? {uri: data.coverImage} // Remote image needs to be wrapped in {uri: url}
    : require('../../../assets/picture/universal/R.png'); // Local image can be required directly

  const totalChapter = data?.chapters?.length ? data.chapters.length : 0;
  const rating =
    data?.positiveVotes && data?.totalVotes
      ? data.positiveVotes / data.totalVotes
      : 0;
  const view = viewConversion(data?.views || 0);
  const id = data?._id;
  const published = data?.isPublish;

  const options = [
    {label: 'View as Reader'},
    published ? {label: 'Unpublish'} : {label: 'Publish'},
    {label: 'Delete'},
  ];

  const handlePreview = () => {
    console.log('Preview book with id: ' + id);
  };

  const handleDelete = () => {
    console.log('Delete book with id: ' + id);
    Alert.alert('Delete', 'Are you sure you want to delete this book?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const res = await deleteBook(id);
            if (res.status === 200) {
              console.log('Deleted book with id: ' + id);
              Alert.alert('Success', 'Book deleted successfully', [
                {
                  text: 'OK',
                  onPress: () => {
                    if (typeof onRefresh === 'function') {
                      onRefresh();
                    }
                  },
                },
              ]);
            } else {
              Alert.alert('Error', 'Failed to delete book');
            }
          } catch (error) {
            console.error('Error deleting book:', error);
            Alert.alert('Error', 'An error occurred while deleting the book');
          }
        },
      },
    ]);
  };

  const handlePublish = async () => {
    try {
      const res = await publishBook(id);
      if (res.status === 200) {
        Alert.alert('Success', 'Book published successfully', [
          {
            text: 'OK',
            onPress: () => {
              if (typeof onRefresh === 'function') {
                onRefresh();
              }
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to publish book');
      }
    } catch (error) {
      console.error('Error publishing book:', error);
      Alert.alert('Error', 'An error occurred while publishing the book');
    }
  };

  const handleUnpublish = async () => {
    try {
      const res = await unpublishBook(id);
      if (res.status === 200) {
        Alert.alert('Success', 'Book unpublished successfully', [
          {
            text: 'OK',
            onPress: () => {
              if (typeof onRefresh === 'function') {
                onRefresh();
              }
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to unpublish book');
      }
    } catch (error) {
      console.error('Error unpublishing book:', error);
      Alert.alert('Error', 'An error occurred while unpublishing the book');
    }
  };

  const handleOptionSelect = value => {
    switch (value) {
      case 'View as Reader':
        handlePreview();
        break;
      case 'Unpublish':
        handleUnpublish();
        break;
      case 'Publish':
        handlePublish();
        break;
      case 'Delete':
        handleDelete();
        break;
      default:
        break;
    }
  };

  const handleEditPress = () => {
    //navigate to EditStory screen with props
    // console.log('props data: from EditCard', props.data);
    navigation.navigate('EditStory', {data: data});
  };

  return (
    <TouchableOpacity onPress={() => handleEditPress()}>
      <View
        style={{
          backgroundColor: '#00171F',
          width: '100%',
          height: HEIGHT * 0.17,
          flexDirection: 'row',

          borderBottomWidth: 1,
          borderColor: '#323232',
        }}>
        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={coverImageLink}
            style={{
              width: (3 / 4) * HEIGHT * 0.15,
              height: HEIGHT * 0.15,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flex: 5, marginVertical: 10}}>
          <View>
            <Text
              numberOfLines={1}
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 10,
            }}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                backgroundColor: '#323232',
                borderRadius: 5,
              }}>
              <Text style={{color: '#f8f8f8', fontSize: 14}}>
                {totalChapter} Chapters
              </Text>
            </View>
            {/* <View>
            <Text style={{color: '#989898', fontSize: 14}}>
              {totalChapter - publishedChapter} Drafts
            </Text>
          </View> */}
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                alignItems: 'center',
                gap: 12,
                flex: 7,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                <Views />
                <Text style={{color: '#989898', fontSize: 14}}>{view}</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                <Rating />
                <Text style={{color: '#989898', fontSize: 14}}>{rating}</Text>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                <Toc />
                <Text style={{color: '#989898', fontSize: 14}}>
                  {totalChapter}
                </Text>
              </View>
            </View>
            <DropdownMenu
              id={id}
              options={options}
              onSelect={handleOptionSelect}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EditCard;
