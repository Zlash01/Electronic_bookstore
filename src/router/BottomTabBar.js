import React from 'react';
import {Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Home from '../component/home/Home.js';
import Library from '../component/library/Library.js';
import Write from '../component/write/Write.tsx';
import Profile from '../component/profile/Profile.tsx';
import HomeStackNavigator from './Home.js';
import LibraryStackNavigator from './Library.js';

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

function Main() {
  return (
    <Tab.Navigator
      initialRouteName={'HomeStack'}
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: HEIGHT * 0.07,
          backgroundColor: 'black',
        },
        tabBarIcon: ({focused, size = 24, color = '#AAA'}) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = (
              <HomeIcon
                color={focused ? '#EB5E28' : '#AAA'}
                width={size}
                height={size}
              />
            );
          } else if (route.name === 'LibraryStack') {
            iconName = (
              <LibraryIcon
                color={focused ? '#EB5E28' : '#AAA'}
                width={size}
                height={size}
              />
            );
          } else if (route.name === 'WriteStack') {
            iconName = (
              <WriteIcon
                color={focused ? '#EB5E28' : '#AAA'}
                width={size}
                height={size}
              />
            );
          } else if (route.name === 'ProfileStack') {
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
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="LibraryStack"
        component={LibraryStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="WriteStack" component={WriteScreen} />
      <Tab.Screen name="ProfileStack" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default Main;
