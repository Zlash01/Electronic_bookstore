import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {addToLibrary, addToReadingList} from '../../api/apiController';

const {width} = Dimensions.get('window');

const BookCard = ({book, isArchive, onBookUpdate}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handlePress = () => {
    navigation.navigate('HomeStack', {
      screen: 'Detail',
      params: {idBooks: book._id},
    });
  };

  const handleArchive = async () => {
    try {
      let res;
      if (isArchive) {
        res = await addToLibrary(book._id);
      } else {
        res = await addToReadingList(book._id);
      }

      if (res.status === 200) {
        Alert.alert(
          'Success',
          isArchive ? 'Book moved to Library' : 'Book added to Archive',
        );
        setModalVisible(false);
        // Add small delay to ensure the API update is complete
        setTimeout(() => {
          onBookUpdate();
        }, 500);
      } else {
        Alert.alert(
          'Error',
          isArchive
            ? 'Failed to move book to Library'
            : 'Failed to add book to Archive',
        );
      }
    } catch (error) {
      console.error('Error moving book:', error);
      Alert.alert('Error', 'An error occurred while moving the book');
    }
  };

  const handleRemove = () => {
    // Implement your remove API call here
    console.log(
      'Removing from',
      isArchive ? 'archive' : 'current read',
      book._id,
    );
    // After successful removal:
    onBookUpdate(); // Trigger refresh after successful removal
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={{
          width: width * 0.3,
          marginBottom: 20,
        }}>
        <Image
          source={
            book.coverImage
              ? {uri: book.coverImage}
              : require('../../assets/picture/universal/R.png')
          }
          style={{
            width: '100%',
            height: 180,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
        <Text
          numberOfLines={2}
          style={{
            color: '#F8F8F8',
            fontSize: 14,
            marginTop: 5,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
          }}>
          {book.title}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#001B24',
              padding: 20,
              borderRadius: 8,
              width: width * 0.8,
            }}>
            <TouchableOpacity
              onPress={handleArchive}
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#323232',
              }}>
              <Text style={{color: '#F8F8F8', fontSize: 16}}>
                {isArchive ? 'Move to Library' : 'Move to Archive'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRemove}
              style={{
                paddingVertical: 15,
              }}>
              <Text style={{color: '#D24E37', fontSize: 16}}>
                Remove from {isArchive ? 'Archive' : 'Library'}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default BookCard;
