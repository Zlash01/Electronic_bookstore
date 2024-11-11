import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import ArrowBack from '../../assets/svg/universal/arrow_back.svg';

const options = [
  'Adventure',
  'Romance',
  'Slice of Life',
  'Horror',
  'Fantasy',
  'Mystery',
  'Fiction',
];

const TagSelection = ({navigation, route}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    route.params?.tags ? route.params.tags : [],
  );

  const toggleSelection = option => {
    setSelectedOptions(prevSelectedOptions => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter(
          selectedOption => selectedOption !== option,
        );
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  useLayoutEffect(() => {
    //set the title of the header
    navigation.setOptions({
      title: 'Select Tags',
    });
  }, [navigation]);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => handleGoBack()}>
          <ArrowBack width={24} height={24} style={{marginRight: 10}} />
        </Pressable>
      ),
    });
  }, [navigation, selectedOptions]);

  const handleGoBack = () => {
    if (route.params && route.params.onGoBack) {
      route.params.onGoBack(selectedOptions); // Pass data back
    }
    navigation.goBack(); // Go back to EditStory
  };

  const renderItem = ({item}) => {
    const isSelected = selectedOptions.includes(item);
    return (
      <TouchableOpacity
        style={[styles.option, isSelected && styles.selectedOption]}
        onPress={() => toggleSelection(item)}>
        <Text
          style={[styles.optionText, isSelected && styles.selectedOptionText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        keyExtractor={item => item}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#00171F',
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#4caf50',
  },
  optionText: {
    fontSize: 16,
    color: '#a8a8a8',
  },
  selectedOptionText: {
    color: '#fff',
  },
});

export default TagSelection;
