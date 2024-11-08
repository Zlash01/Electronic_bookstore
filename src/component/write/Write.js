import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import EditCard from './Util/EditCard';

import {
  getAllUserDraftBooks,
  getAllUserPublishedBooks,
} from '../../api/apiController';

const Publish = props => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#00171F',
      }}>
      {/* <EditCard /> */}
    </ScrollView>
  );
};

const Draft = props => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#00171F',
      }}>
      {props.data.map((data, index) => (
        <EditCard key={index} data={data} />
      ))}
    </ScrollView>
  );
};

const Write = ({navigation}) => {
  const [publishData, setPublishData] = useState([]);
  const [draftData, setDraftData] = useState([]);

  useEffect(() => {
    onMount();
  }, []);

  const onMount = async () => {
    console.log('Write Mounted');
    console.log('getting publish data');
    await getAllUserPublishedBooks().then(res => {
      if (res.status === 404) {
        console.log('No published data');
      } else {
        console.log('published: ', res);
        setPublishData(res.data.userBooks);
      }
    });

    console.log('getting draft data');
    await getAllUserDraftBooks().then(res => {
      if (res.status === 404) {
        console.log('No draft data');
      } else {
        console.log('draft: ', res);
        setDraftData(res.data.userBooks);
      }
    });
  };

  useEffect(() => {
    console.log('Publish Data: ', publishData);
    console.log('Draft Data: ', draftData);
  }, [publishData, draftData]);

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

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'publish':
        return <Publish data={publishData} />;
      case 'draft':
        return <Draft data={draftData} />;
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

export default Write;
