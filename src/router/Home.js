import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../component/home/Home.js';
import BookDetail from '../component/bookDetail/BookDetail';
import Chapters from '../component/bookDetail/Chapters.js';
import UserReviews from '../component/bookDetail/UserReviews.js';

const HomeScreen = Home;
const DetailScreen = BookDetail;
const ChaptersScreen = Chapters;
const UserReviewsScreen = UserReviews;

const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
      <HomeStack.Screen name="Chapters" component={ChaptersScreen} />
      <HomeStack.Screen name="UserReviews" component={UserReviewsScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
