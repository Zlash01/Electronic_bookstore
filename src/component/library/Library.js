import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import BookCard from './BookCard';

//svg
import Box from '../../assets/svg/library/box.svg';

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

const CurrentRead = () => {
  const [isData, setIsData] = useState(true);
  const [books, setBooks] = useState([
    {
      _id: '67370392216174d2c7044f14',
      title: 'Người Tìm Xác',
      authorId: '671a968176a6330dab784377',
      authorName: 'Zlash01',
      tags: ['Fiction', 'Fantasy', 'Slice of Life', 'Mystery'],
      plot: 'plot',
      coverImage:
        'https://firebasestorage.googleapis.com/v0/b/imageuploadcovereb.appspot.com/o/rn_image_picker_lib_temp_1fd753fd-291a-4d96-bf63-39007fe4999b.jpg?alt=media&token=02b6bc71-f53e-420b-9f48-83e7c22fff40',
      views: 0,
      totalVotes: 0,
      positiveVotes: 0,
      chapters: ['67370392216174d2c7044f17'],
      isPublish: true,
      createdAt: '2024-11-15T08:17:22.229Z',
      updatedAt: '2024-11-15T08:18:51.905Z',
    },
    // Add more dummy data as needed
  ]);

  if (!isData)
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#00171F',
        padding: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {books.map(book => (
          <BookCard key={book._id} book={book} isArchive={false} />
        ))}
      </View>
    </View>
  );
};

const Archive = () => {
  const [isData, setIsData] = useState(false);

  if (!isData)
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
};

const Library = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'currentRead', title: 'Current Read'},
    {key: 'archive', title: 'Archive'},
  ]);

  const renderScene = SceneMap({
    currentRead: CurrentRead,
    archive: Archive,
  });

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
