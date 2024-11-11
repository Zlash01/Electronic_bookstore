import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState, useCallback} from 'react';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {useFocusEffect} from '@react-navigation/native';
import EditCard from './Util/EditCard';
import {
  getAllUserDraftBooks,
  getAllUserPublishedBooks,
} from '../../api/apiController';

const Write = ({navigation}) => {
  const [publishData, setPublishData] = useState([]);
  const [draftData, setDraftData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    if (isLoading) return; // Prevent multiple simultaneous loads

    setIsLoading(true);
    console.log('Loading data...');

    try {
      const publishRes = await getAllUserPublishedBooks();
      if (publishRes.status === 404) {
        console.log('No published data');
        setPublishData([]);
      } else {
        console.log('published: ', publishRes);
        setPublishData(publishRes.data.userBooks);
      }

      const draftRes = await getAllUserDraftBooks();
      if (draftRes.status === 404) {
        console.log('No draft data');
        setDraftData([]);
      } else {
        console.log('draft: ', draftRes);
        setDraftData(draftRes.data.userBooks);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reload data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const PublishComponent = () => (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#00171F',
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadData}
          tintColor="#F8F8F8"
        />
      }>
      {publishData.map((data, index) => (
        <EditCard
          key={`publish-${data._id}`}
          data={data}
          onRefresh={loadData}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );

  const DraftComponent = () => (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#00171F',
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadData}
          tintColor="#F8F8F8"
        />
      }>
      {draftData.map((data, index) => (
        <EditCard
          key={`draft-${data._id}`}
          data={data}
          onRefresh={loadData}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Write',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('CreateStory')}>
          <Text style={{color: '#f8f8f8', fontWeight: '500', fontSize: 16}}>
            New Story
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'publish', title: 'Publish'},
    {key: 'draft', title: 'Draft'},
  ]);

  const renderScene = SceneMap({
    publish: PublishComponent,
    draft: DraftComponent,
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

export default Write;
