import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {updateBook} from '../../api/apiController';
import Add from '../../assets/svg/write/add.svg';
import {useNavigation} from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const InputField = ({label, placeholder, value, setValue}) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        marginHorizontal: WIDTH * 0.03,
        borderBottomColor: '#323232',
      }}>
      <Text
        style={{color: '#f8f8f8', fontSize: 18, fontFamily: 'Poppins-Medium'}}>
        {label}
      </Text>
      <TextInput
        style={{
          backgroundColor: 'transparent',
          fontSize: 16,
          fontFamily: 'Poppins-Medium',
          color: '#989898',
        }}
        keyboardType="default"
        textContentType="none"
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
        onChangeText={text => {
          setValue(text);
        }}
        //allow warping multiple line
        multiline={true}
      />
    </View>
  );
};

const StoryCover = props => {
  const {storyCover} = props;

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorMessage) {
      console.error('Image Picker Error: ', result.errorMessage);
    } else {
      const uri = result.assets[0]?.uri;
      console.log('Image Picker uri: ', uri);
      if (uri) {
        props.setStoryCover(uri);
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: WIDTH * 0.03,
        borderBottomColor: '#323232',
        borderBottomWidth: 1,
        paddingVertical: 25,
        alignItems: 'center',
        gap: 15,
      }}>
      <View>
        <TouchableOpacity
          onPress={() => {
            selectImage();
          }}>
          {storyCover != '' ? (
            <View>
              <Image
                resizeMode="cover"
                source={{uri: storyCover}}
                style={{
                  height: HEIGHT * 0.17,
                  width: (HEIGHT * 0.17 * 3) / 4,
                  borderRadius: 10,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                height: HEIGHT * 0.17,
                width: (HEIGHT * 0.17 * 3) / 4,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#626262',
                borderStyle: 'dashed',
                borderDashOffset: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Add width={30} height={30} />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            color: '#989898',
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
          }}>
          {storyCover != '' ? 'Edit cover photo' : 'Add a cover photo'}
        </Text>
      </View>
    </View>
  );
};

const ProceedButton = ({
  id,
  title = '',
  description = '',
  cover = '',
  tags = [],
}) => {
  const navigation = useNavigation(); // Move this up to the top

  function isLocalImage(uri) {
    return uri.startsWith('file:///');
  }

  const uploadImage = async imageUri => {
    if (!imageUri) {
      console.log('No image URI provided');
      return;
    }

    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const reference = storage().ref(filename);

    try {
      console.log('Uploading image:', imageUri);

      const task = reference.putFile(imageUri);

      // Monitor upload progress
      task.on('state_changed', taskSnapshot => {
        const progress =
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      });

      await task;
      const url = await reference.getDownloadURL();
      console.log('Uploaded image URL:', url);
      return url;
    } catch (error) {
      console.error('Upload Error:', error);
      console.error('Upload Error Message:', error.message);
      Alert.alert(error.message);
    }
  };

  const handleCreation = async () => {
    try {
      // Handle book creation
      console.log('updating story:', id, title, description, cover, tags);
      let bookResponse;
      if (cover && isLocalImage(cover)) {
        const url = await uploadImage(cover);
        bookResponse = await updateBook(id, title, description, url, tags);
      } else {
        bookResponse = await updateBook(id, title, description, cover, tags);
      }

      // Check if book creation was successful
      if (bookResponse.status !== 200) {
        Alert.alert('Error', 'Failed to update story');

        return;
      }

      console.log('Book update successful:', bookResponse.data);
      Alert.alert('Success', 'Story updated successfully');
      return bookResponse;
    } catch (error) {
      console.error('Error creating story:', error);
      Alert.alert('Error', 'Failed to create story: ' + error.message);
    }
  };

  return (
    <TouchableOpacity onPress={handleCreation}>
      <Text style={{color: '#f8f8f8', fontWeight: '500', fontSize: 16}}>
        Update
      </Text>
    </TouchableOpacity>
  );
};

const Tag = ({tags, setTags}) => {
  const navigation = useNavigation();
  const TagNav = () => {
    navigation.navigate('TagSelection', {
      tags, // Pass tags here
      onGoBack: updatedTags => {
        setTags(updatedTags);
      },
    });
  };

  return (
    <TouchableOpacity onPress={TagNav}>
      <View
        style={{
          borderBottomWidth: 1,
          marginHorizontal: WIDTH * 0.03,
          borderBottomColor: '#323232',
        }}>
        <Text
          style={{
            color: '#f8f8f8',
            fontSize: 16,
            fontFamily: 'Poppins-Medium',
          }}>
          Tags
        </Text>
        <View style={{height: 10}} />
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            color: '#989898',
          }}>
          {tags.length > 0
            ? tags.map(tag => {
                return tag + ' ';
              })
            : 'Add tags'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const EditStory = ({navigation, route}) => {
  const {data} = route.params;

  const id = data._id;
  const [title, setTitle] = React.useState(data.title ? data.title : '');
  const [description, setDescription] = React.useState(
    data.plot ? data.plot : '',
  );
  const [storyCover, setStoryCover] = React.useState(
    data.coverImage ? data.coverImage : '',
  );
  const [tags, setTags] = React.useState(data.tags ? data.tags : []);
  useEffect(() => {
    console.log('tags', tags);
  }, [tags]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create Story',
      headerRight: () => {
        return (
          <ProceedButton
            id={id}
            title={title}
            description={description}
            cover={storyCover}
            tags={tags}
          />
        );
      },
    });
  }, [navigation, title, description, storyCover, tags]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00171F'}}>
      <ScrollView>
        <StoryCover storyCover={storyCover} setStoryCover={setStoryCover} />
        <View style={{height: 30}} />
        <View>
          <KeyboardAvoidingView>
            <InputField
              label="Title"
              placeholder="Title"
              value={title}
              setValue={setTitle}
            />
            <View style={{height: 30}} />
            <InputField
              label="Description"
              placeholder="Description"
              value={description}
              setValue={setDescription}
            />
            <View style={{height: 30}} />
            <Tag tags={tags} setTags={setTags} />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditStory;
