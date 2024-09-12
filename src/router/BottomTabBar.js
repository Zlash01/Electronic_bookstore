import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
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
                color={focused ? '#EB5E28' : '#AAA'}
                width={size}
                height={size}
              />
            );
          } else if (route.name === 'Library') {
            iconName = (
              <LibraryIcon
                color={focused ? '#EB5E28' : '#AAA'}
                width={size}
                height={size}
              />
            );
          } else if (route.name === 'Write') {
            iconName = (
              <WriteIcon
                color={focused ? '#EB5E28' : '#AAA'}
                width={size}
                height={size}
              />
            );
          } else if (route.name === 'Profile') {
            iconName = (
              <ProfileIcon
                color={focused ? '#EB5E28' : '#AAA'}
                width={size}
                height={size}
              />
            );
          }
          return iconName;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Write" component={WriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabBar;
