import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../component/home/Home.tsx';
import Library from '../component/library/Library.tsx';
import Write from '../component/write/Write.tsx';
import Profile from '../component/profile/Profile.tsx';

import HomeIcon from '../assets/svg/bottomTabBar/home.svg';
import LibraryIcon from '../assets/svg/bottomTabBar/library.svg';
import WriteIcon from '../assets/svg/bottomTabBar/write.svg';
import ProfileIcon from '../assets/svg/bottomTabBar/profile.svg';

const HomeScreen = Home;
const LibraryScreen = Library;
const WriteScreen = Write;
const ProfileScreen = Profile;

const Tab = createBottomTabNavigator();

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function BottomTabBar() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: HEIGHT * 0.07,
          backgroundColor: 'black',
        },
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = (
              <HomeIcon
                color={focused ? 'white' : 'red'}
                width={size}
                height={size}
              />
            );
          } else if (route.name === 'Library') {
            iconName = (
              <LibraryIcon style={{color: focused ? 'white' : 'red'}} />
            );
          } else if (route.name === 'Write') {
            iconName = <WriteIcon style={IconStyle.icon} />;
          } else if (route.name === 'Profile') {
            iconName = <ProfileIcon style={IconStyle.icon} />;
          }
          return iconName;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Write" component={WriteScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabBar;

const IconStyle = StyleSheet.create({
  icon: {},
});
