import {View, Text, Touchable, TouchableOpacity, TextInput} from 'react-native';
import React, {useLayoutEffect} from 'react';

const CreateChapter = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create',
      headerRight: () => {
        return (
          <View>
            <TouchableOpacity>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>More</Text>
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <View>
      <TextInput />
    </View>
  );
};

export default CreateChapter;
