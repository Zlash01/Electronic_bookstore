import React from 'react';
import {Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Home from '../component/home/Home.js';
import Library from '../component/library/Library.js';
import Write from '../component/write/Write.js';
import Profile from '../component/profile/Profile.tsx';
import HomeStackNavigator from './Home.js';
import LibraryStackNavigator from './Library.js';
import WriteStackNavigator from './Write.js';

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

// In BottomTabBar.js
function Main() {
  // Define screens where tab bar should be hidden
  const HIDDEN_TAB_SCREENS = ['Read'];

  const shouldShowTabBar = navigation => {
    const state = navigation.getState();

    // Check each stack navigator's current screen
    for (const route of state.routes) {
      if (route.state?.routes) {
        const currentScreen = route.state.routes.slice(-1)[0];
        if (currentScreen && HIDDEN_TAB_SCREENS.includes(currentScreen.name)) {
          return false; // Hide tab bar
        }
      }
    }

    return true; // Show tab bar
  };

  return (
    <Tab.Navigator
      initialRouteName={'HomeStack'}
      screenOptions={({route, navigation}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: HEIGHT * 0.07,
          backgroundColor: 'black',
          display: shouldShowTabBar(navigation) ? 'flex' : 'none',
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
      <Tab.Screen
        name="WriteStack"
        component={WriteStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="ProfileStack" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default Main;
