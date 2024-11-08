import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import EditCard from './Util/EditCard';

import {getAllUserBooks} from '../../api/apiController';

const Publish = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#00171F',
      }}>
      <EditCard />
    </ScrollView>
  );
};

const Draft = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#00171F',
      }}>
      <Text>Draft</Text>
    </ScrollView>
  );
};

const onMount = async () => {
  console.log('Getting all user books');
  await getAllUserBooks().then(res => {
    console.log(res);
  });
};

const Write = ({navigation}) => {
  useEffect(() => {
    onMount();
  }, []);

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
  }, []);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'publish', title: 'Publish'},
    {key: 'draft', title: 'Draft'},
  ]);

  const renderScene = SceneMap({
    publish: Publish,
    draft: Draft,
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
