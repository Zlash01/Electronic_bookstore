import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft, Search, Clock, ArrowUpRight} from 'lucide-react-native';
import {searchBooks} from '../../api/apiController';
import {searchBooksByTag} from '../../api/apiController';
const {width} = Dimensions.get('window');

const BookCard = ({book, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: 'row',
      backgroundColor: '#001B24',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    }}>
    <Image
      source={
        book.coverImage
          ? {uri: book.coverImage}
          : require('../../assets/picture/universal/R.png')
      }
      style={{
        width: 80,
        height: 120,
        borderRadius: 4,
      }}
    />
    <View style={{flex: 1, marginLeft: 12}}>
      <Text
        style={{
          fontSize: 16,
          color: '#f8f8f8',
          fontFamily: 'Poppins-Medium',
          marginBottom: 4,
        }}
        numberOfLines={2}>
        {book.title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#989898',
          fontFamily: 'Poppins-Regular',
          marginBottom: 8,
        }}>
        {book.authorName}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#989898',
          fontFamily: 'Poppins-Regular',
          marginBottom: 8,
        }}
        numberOfLines={2}>
        {book.plot}
      </Text>
      <View style={{flexDirection: 'row', gap: 8}}>
        {book.tags &&
          book.tags.slice(0, 2).map((tag, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#002633',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: '#989898',
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                }}>
                {tag}
              </Text>
            </View>
          ))}
      </View>
    </View>
  </TouchableOpacity>
);

const SearchResultsScreen = ({route}) => {
  const navigation = useNavigation();
  const [query, setQuery] = useState(route.params.query);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await searchBooks(query, '', page, 10);
        if (response.status === 200) {
          setSearchResults(response.data.allBooks);
          setTotalPages(response.data.totalPages);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  return (
    <View style={{flex: 1, backgroundColor: '#00171F'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#323232',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#f8f8f8" size={24} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#001B24',
            borderRadius: 8,
            paddingHorizontal: 12,
          }}>
          <TextInput
            style={{
              flex: 1,
              color: '#f8f8f8',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
            }}
            placeholder="Search Books"
            placeholderTextColor="#989898"
            value={query}
            editable={false}
          />
          <Search color="#989898" size={20} style={{marginLeft: 8}} />
        </View>
      </View>

      {loading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#f8f8f8" />
        </View>
      )}

      {error && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#f8f8f8', fontSize: 16}}>{error}</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={searchResults}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <BookCard
              book={item}
              onPress={() => navigation.navigate('Detail', {idBooks: item._id})}
            />
          )}
          contentContainerStyle={{padding: 16}}
          ListEmptyComponent={() => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#f8f8f8', fontSize: 16}}>
                No results found
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const CategoryScreen = ({route}) => {
  const navigation = useNavigation();
  const {category} = route.params;

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        // Using searchBooks API with empty query and category as tag
        const response = await searchBooksByTag(category, page, 10);
        if (response.status === 200) {
          setSearchResults(response.data.allBooks);
          setTotalPages(response.data.totalPages);
        }
      } catch (err) {
        console.error('Category fetch error:', err);
        setError('Failed to fetch category books');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [category, page]);

  return (
    <View style={{flex: 1, backgroundColor: '#00171F'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#323232',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#f8f8f8" size={24} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            color: '#f8f8f8',
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
          }}>
          {category}
        </Text>
        <View style={{width: 24}} />
      </View>

      {loading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#f8f8f8" />
        </View>
      )}

      {error && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#f8f8f8', fontSize: 16}}>{error}</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={searchResults}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <BookCard
              book={item}
              onPress={() => navigation.navigate('Detail', {idBooks: item._id})}
            />
          )}
          contentContainerStyle={{padding: 16}}
          ListEmptyComponent={() => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#f8f8f8', fontSize: 16}}>
                No books found in this category
              </Text>
            </View>
          )}
        />
      )}
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
    alignItems: 'center',
    backgroundColor: '#001B24',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: '#f8f8f8',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 20,
    color: '#f8f8f8',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  headerSpace: {
    width: 24,
  },
  resultsList: {
    padding: 16,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#001B24',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 16,
    color: '#f8f8f8',
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  authorName: {
    fontSize: 14,
    color: '#989898',
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  plotText: {
    fontSize: 14,
    color: '#989898',
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#002633',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: '#989898',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export {SearchResultsScreen, CategoryScreen};
