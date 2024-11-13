import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Import icons from lucide-react-native
import {ArrowLeft, Search, Clock, ArrowUpRight} from 'lucide-react-native';

const {width} = Dimensions.get('window');

const categories = [
  'Adventure',
  'Romance',
  'Slice of Life',
  'Horror',
  'Fantasy',
  'Mystery',
  'Fiction',
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory] = useState([
    'Search history 1',
    'Search history 1',
    'Search history 1',
    'Search history 1',
  ]);

  // Calculate grid layout
  const numColumns = 2;
  const spacing = 16;
  const itemWidth = (width - spacing * (numColumns + 1)) / numColumns;

  const handleCategoryPress = category => {
    // Navigate to category screen
    console.log(`Navigate to ${category} category`);
    // Add your navigation logic here
  };

  const handleHistoryPress = searchTerm => {
    console.log(`Search for ${searchTerm}`);
    // Add your search logic here
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#f8f8f8" size={24} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Books"
            placeholderTextColor="#989898"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Search color="#989898" size={20} style={styles.searchIcon} />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Browse Category</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryCard, {width: itemWidth}]}
              onPress={() => handleCategoryPress(category)}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search History */}
        <View style={styles.historyContainer}>
          {searchHistory.map((item, index) => (
            <Pressable
              key={index}
              style={styles.historyItem}
              onPress={() => handleHistoryPress(item)}>
              <View style={styles.historyLeft}>
                <Clock color="#989898" size={20} />
                <Text style={styles.historyText}>{item}</Text>
              </View>
              <ArrowUpRight color="#989898" size={20} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00171F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#323232',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#001B24',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#f8f8f8',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: '#f8f8f8',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: '#001B24',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: '#f8f8f8',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  historyContainer: {
    gap: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyText: {
    color: '#989898',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default SearchScreen;
