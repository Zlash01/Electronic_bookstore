import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';

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
  const [isData, setIsData] = useState(false);

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
