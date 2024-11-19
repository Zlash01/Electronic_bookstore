import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../component/home/Home.js';
import BookDetail from '../component/bookDetail/BookDetail';
import Chapters from '../component/bookDetail/Chapters.js';
import UserReviews from '../component/bookDetail/UserReviews.js';
import Read from '../component/read/Read.js';
import SearchScreen from '../component/search/Search.js';
import {SearchResultsScreen} from '../component/search/SearchResults.js';
import {CategoryScreen} from '../component/search/SearchResults.js';

const HomeScreen = Home;
const DetailScreen = BookDetail;
const ChaptersScreen = Chapters;
const UserReviewsScreen = UserReviews;
const ReadScreen = Read;

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
      <HomeStack.Screen
        name="Read"
        component={ReadScreen}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="SearchResults" component={SearchResultsScreen} />
      <HomeStack.Screen name="CategoryBooks" component={CategoryScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
