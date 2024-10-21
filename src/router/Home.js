import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../component/home/Home.js';
import BookDetail from '../component/bookDetail/BookDetail';

const HomeScreen = Home;
const DetailScreen = BookDetail;

const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
