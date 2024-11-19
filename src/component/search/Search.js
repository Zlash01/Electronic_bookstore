import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, Search, Clock, ArrowUpRight, X} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const SEARCH_HISTORY_KEY = '@search_history';
const MAX_HISTORY_ITEMS = 10;

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
  const [searchHistory, setSearchHistory] = useState([]);

  const numColumns = 2;
  const spacing = 16;
  const itemWidth = (width - spacing * (numColumns + 1)) / numColumns;

  // Load search history when component mounts
  useEffect(() => {
    loadSearchHistory();
  }, []);

  // Function to load search history from AsyncStorage
  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      if (history !== null) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
      Alert.alert('Error', 'Failed to load search history');
    }
  };

  // Function to save search history to AsyncStorage
  const saveSearchHistory = async newHistory => {
    try {
      await AsyncStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(newHistory),
      );
    } catch (error) {
      console.error('Error saving search history:', error);
      Alert.alert('Error', 'Failed to save search history');
    }
  };

  // Function to add new search term to history
  const addToSearchHistory = async term => {
    if (!term.trim()) return;

    const newHistory = [
      term,
      ...searchHistory.filter(item => item !== term), // Remove duplicates
    ].slice(0, MAX_HISTORY_ITEMS); // Keep only the most recent items

    setSearchHistory(newHistory);
    await saveSearchHistory(newHistory);
  };

  // Function to remove item from search history
  const removeFromHistory = async termToRemove => {
    const newHistory = searchHistory.filter(term => term !== termToRemove);
    setSearchHistory(newHistory);
    await saveSearchHistory(newHistory);
  };

  // Function to clear all search history
  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing search history:', error);
      Alert.alert('Error', 'Failed to clear search history');
    }
  };

  const handleSearch = async query => {
    if (query.trim()) {
      await addToSearchHistory(query);
      console.log('Search for:', query);
      navigation.navigate('SearchResults', {query});
    }
  };

  const handleCategoryPress = category => {
    navigation.navigate('CategoryBooks', {category});
  };

  const handleHistoryPress = async searchTerm => {
    setSearchQuery(searchTerm);
    await addToSearchHistory(searchTerm);
    navigation.navigate('SearchResults', {query: searchTerm});
  };

  return (
    <View style={styles.container}>
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
            onSubmitEditing={() => handleSearch(searchQuery)}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={() => handleSearch(searchQuery)}>
            <Search color="#989898" size={20} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
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

        {searchHistory.length > 0 && (
          <View style={styles.historyHeader}>
            <Text style={styles.historySectionTitle}>Recent Searches</Text>
            <TouchableOpacity onPress={clearSearchHistory}>
              <Text style={styles.clearHistoryText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.historyContainer}>
          {searchHistory.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.historyItem}
              onPress={() => handleHistoryPress(item)}>
              <View style={styles.historyLeft}>
                <Clock color="#989898" size={20} />
                <Text style={styles.historyText}>{item}</Text>
              </View>
              <TouchableOpacity
                onPress={() => removeFromHistory(item)}
                style={styles.removeButton}>
                <X color="#989898" size={20} />
              </TouchableOpacity>
            </TouchableOpacity>
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
    marginLeft: 8,
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
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historySectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#f8f8f8',
  },
  clearHistoryText: {
    color: '#D24E37',
    fontSize: 14,
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
    flex: 1,
  },
  historyText: {
    color: '#989898',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
});

export default SearchScreen;
