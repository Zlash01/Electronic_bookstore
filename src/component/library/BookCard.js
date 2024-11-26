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

const {width} = Dimensions.get('window');

const BookCard = ({book, isArchive}) => {
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

  const handleArchive = () => {
    console.log(
      isArchive ? 'Moving to current read' : 'Adding to archive',
      book._id,
    );
    setModalVisible(false);
  };

  const handleRemove = () => {
    console.log(
      'Removing from',
      isArchive ? 'archive' : 'current read',
      book._id,
    );
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
          source={{uri: book.coverImage}}
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
                {isArchive ? 'Move to Current Read' : 'Add to Archive'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRemove}
              style={{
                paddingVertical: 15,
              }}>
              <Text style={{color: '#D24E37', fontSize: 16}}>
                Remove from {isArchive ? 'Archive' : 'Current Read'}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default BookCard;
