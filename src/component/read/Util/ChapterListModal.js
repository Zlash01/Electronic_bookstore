// ChapterListModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const ChapterListModal = ({
  visible,
  onClose,
  chapters,
  currentChapter,
  onChapterSelect,
  theme,
}) => {
  const slideAnim = React.useRef(new Animated.Value(width)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => onChapterSelect(item)}
      disabled={item._id === currentChapter}
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#323232',
        backgroundColor:
          item._id === currentChapter
            ? 'rgba(235, 94, 40, 0.1)'
            : 'transparent',
      }}>
      <Text
        style={{
          color: item._id === currentChapter ? '#EB5E28' : theme.fontColor,
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            flex: 1,
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <Animated.View
          style={{
            width: width * 0.8,
            backgroundColor: theme.backgroundColor,
            borderLeftWidth: 1,
            borderLeftColor: '#323232',
            transform: [{translateX: slideAnim}],
          }}>
          <FlatList
            data={chapters}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ChapterListModal;
