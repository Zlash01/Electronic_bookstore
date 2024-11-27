import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Modal, // Add this
  Pressable, // Add this
  Dimensions, // Add this for width
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import MoreVert from './../../assets/svg/universal/more_vert.svg';
import {updateChapter} from '../../api/apiController';
import ArrowBack from './../../assets/svg/universal/arrow_back.svg';
import {deleteChapter} from '../../api/apiController';

const CreateChapter = ({navigation, route}) => {
  const [chapterTitle, setChapterTitle] = useState('This is a title');
  const [chapterContent, setChapterContent] = useState('This is a content');
  const [savedTitle, setSavedTitle] = useState('This is a title');
  const [savedContent, setSavedContent] = useState('This is a content');
  const [hasChanges, setHasChanges] = useState(false);
  const [inputHeight, setInputHeight] = useState(50);
  const [modalVisible, setModalVisible] = useState(false);

  const chapterId = route.params.response._id;

  useEffect(() => {
    const isChanged =
      chapterTitle !== savedTitle || chapterContent !== savedContent;
    setHasChanges(isChanged);
  }, [chapterTitle, chapterContent, savedTitle, savedContent]);

  useEffect(() => {
    // Check if we have received chapter data
    const response = route.params?.response;
    if (response) {
      // Set the initial content and title from the response
      const initialContent = response.content || '';
      const initialTitle = response.title || '';

      setChapterContent(initialContent);
      setSavedContent(initialContent);
      setChapterTitle(initialTitle);
      setSavedTitle(initialTitle);

      console.log('Loaded chapter data:', {
        title: initialTitle,
        content: initialContent,
      });
    }
  }, [route.params?.response]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create',
      // Add custom back button behavior
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Write')}
          style={{marginLeft: 10, marginRight: 15}}>
          <ArrowBack height={24} width={24} />
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleSave()}
              disabled={!hasChanges}
              style={{
                opacity: hasChanges ? 1 : 0.5,
              }}>
              <Text
                style={{
                  color: '#E8F1F2',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 18,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  paddingTop: 3,
                }}>
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MoreVert height={30} width={30} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, hasChanges, chapterTitle, chapterContent]);

  const handleSave = () => {
    console.log('Saving Chapter...');
    console.log('Chapter ID: ', chapterId);
    console.log('Chapter Title: ', chapterTitle);
    console.log('Chapter Content: ', chapterContent);
    try {
      updateChapter(chapterId, chapterTitle, chapterContent).then(response => {
        console.log('Response: ', response);
        Alert.alert('Chapter saved successfully');
        setSavedTitle(chapterTitle);
        setSavedContent(chapterContent);
        setHasChanges(false);
      });
    } catch (error) {
      console.error('Error: ', error);
      Alert.alert('Error saving chapter');
    }
  };

  const handleDelete = () => {
    deleteChapter(chapterId).then(res => {
      if (res.status === 200) {
        Alert.alert('Success', 'Chapter deleted successfully');
        navigation.navigate('Write');
      } else {
        Alert.alert('Error', 'Failed to delete chapter');
      }
    });
    setModalVisible(false);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#00171F',
        flex: 1,
        padding: 20,
      }}>
      <View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#323232',
            marginTop: 20,
          }}>
          <TextInput
            multiline={true}
            placeholder="TITLE YOUR STORY PART"
            placeholderTextColor={'#696969'}
            scrollEnabled={false}
            value={chapterTitle}
            onChangeText={setChapterTitle}
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              color: '#E8F1F2',
              lineHeight: 24,
              minHeight: inputHeight,
              paddingVertical: 10,
              textAlignVertical: 'center',
            }}
            onContentSizeChange={event => {
              setInputHeight(
                Math.max(50, event.nativeEvent.contentSize.height),
              );
            }}
          />
        </View>
        <TextInput
          multiline={true}
          value={chapterContent}
          onChangeText={setChapterContent}
          placeholder="Tap here to write your story part"
          style={{
            backgroundColor: '#00171F',
            fontSize: 16,
            padding: 10,
            marginTop: 20,
            color: '#E8F1F2',
          }}
          placeholderTextColor={'#696969'}
        />
      </View>
      <View style={{height: 100}} />
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
              width: Dimensions.get('window').width * 0.8,
            }}>
            <TouchableOpacity
              onPress={handleDelete}
              style={{
                paddingVertical: 15,
              }}>
              <Text style={{color: '#D24E37', fontSize: 16}}>
                Delete Chapter
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default CreateChapter;
