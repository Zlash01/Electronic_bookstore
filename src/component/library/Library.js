import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import BookCard from './BookCard';
import {RefreshControl} from 'react-native';

//svg
import Box from '../../assets/svg/library/box.svg';
import {getUserLibrary, getUserReadingList} from '../../api/apiController';

const HomeNavTouchable = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Home')}
      style={{
        marginTop: '6%',
        backgroundColor: '#CA5427',
        width: '70%',
        height: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}>
      <Text
        style={{
          color: '#F8F8F8',
          textAlign: 'center',
          fontSize: 16,
          fontFamily: 'Poppins-Medium',
        }}>
        Go explore new stories
      </Text>
    </TouchableOpacity>
  );
};

const LibraryView = ({books, onRefresh, refreshing}) => {
  if (!books || books.length === 0)
    return (
      <View style={{flex: 1, backgroundColor: '#00171F', alignItems: 'center'}}>
        <Text
          style={{
            color: '#D8D8D8',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            width: '60%',
            marginTop: '10%',
          }}>
          You don't have any story in your library
        </Text>

        <HomeNavTouchable />
      </View>
    );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        flex: 1,
        backgroundColor: '#00171F',
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        {books.map(book => (
          <BookCard
            key={book._id}
            book={book}
            isArchive={false}
            onBookUpdate={onRefresh}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const Archive = ({books, onRefresh, refreshing}) => {
  if (!books || books.length === 0)
    return (
      <View style={{flex: 1, backgroundColor: '#00171F', alignItems: 'center'}}>
        <Box style={{marginTop: '7%'}} />
        <Text
          style={{
            color: '#D8D8D8',
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'Poppins-Medium',
            width: '100%',
            marginTop: '5%',
          }}>
          You don't have any story archived
        </Text>
        <Text
          style={{
            color: '#989898',
            textAlign: 'center',
            fontSize: 13,
            fontFamily: 'Poppins-Medium',
            width: '70%',
          }}>
          Story which have new chapter will be re-added to the library
        </Text>
        <HomeNavTouchable />
      </View>
    );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        flex: 1,
        backgroundColor: '#00171F',
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        {books.map(book => (
          <BookCard
            key={book._id}
            book={book}
            isArchive={true}
            onBookUpdate={onRefresh}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const Library = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataLibrary, setDataLibrary] = useState([]);
  const [dataArchive, setDataArchive] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'library', title: 'Library'},
    {key: 'archive', title: 'Archive'},
  ]);

  const fetchLibrary = async () => {
    setRefreshing(true);
    try {
      const [libraryRes, archiveRes] = await Promise.all([
        getUserLibrary(),
        getUserReadingList(),
      ]);

      if (libraryRes.status === 200) {
        setDataLibrary(libraryRes.data.library);
      }

      if (archiveRes.status === 200) {
        setDataArchive(archiveRes.data.readingList);
      }
    } catch (error) {
      console.error('Error fetching library data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, [index]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'library':
        return (
          <LibraryView
            books={dataLibrary}
            onRefresh={fetchLibrary}
            refreshing={refreshing}
          />
        );
      case 'archive':
        return (
          <Archive
            books={dataArchive}
            onRefresh={fetchLibrary}
            refreshing={refreshing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#EB5E28'}}
          style={{backgroundColor: '#001B24'}}
          activeColor={'#F8F8F8'}
          inactiveColor={'#D8D8D8'}
        />
      )}
    />
  );
};

export default Library;
