import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

import LogoLight from '../../assets/svg/home/logoLight.svg';
import SearchIcon from '../../assets/svg/home/search.svg';
import Tune from '../../assets/svg/home/tune.svg';
import AccountDefault from '../../assets/svg/home/account_circle.svg';
import {getTrendingBooks} from '../../api/apiController';
import BigStoryCard from './Util/BigStoryCard';
import ContinueCard from './Util/ContinueCard';

const Header = () => {
  return (
    <View
      style={{
        height: HEIGHT * 0.07,
        width: '100%',
        flexDirection: 'row',

        backgroundColor: '#00171F',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <LogoLight width={WIDTH * 0.13} height={HEIGHT * 0.07} />
      </View>
      <TouchableOpacity
        style={{
          flex: 3,
          backgroundColor: '#002B3A',
          flexDirection: 'row',
          marginVertical: HEIGHT * 0.01,
          marginHorizontal: WIDTH * 0.01,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'green',
            paddingStart: WIDTH * 0.025,
          }}>
          <SearchIcon width={WIDTH * 0.08} height={HEIGHT * 0.05} />
        </View>
        <View style={{flex: 3, alignSelf: 'center'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
              color: '#949494',
            }}>
            Search Books
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Tune width={WIDTH * 0.1} height={HEIGHT * 0.07} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <AccountDefault width={WIDTH * 0.12} height={HEIGHT * 0.07} />
      </View>
    </View>
  );
};

const BigStoryCardList = ({headerCard, subHeader}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getTrendingBooks(1, 10);
        // console.log('checklog:', res);
        setBooks(res.data.trendingBooks);
      } catch (err) {
        console.log('error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const renderItem = ({item}) => {
    // console.log('Rendering Item:', item); // Log the data for each item

    return (
      <BigStoryCard
        title={item.title}
        author={item.author}
        idBooks={item._id}
        imageLink={item.coverImage}
        description={item.plot}
      />
    );
  };

  return (
    <View style={{}}>
      <View>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: '#F8F8F8',
          }}>
          {headerCard}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: '#F8F8F8',
          }}>
          {subHeader}
        </Text>
      </View>
      <View
        style={{
          marginTop: HEIGHT * 0.015,
        }}>
        {loading ? (
          <ActivityIndicator size="large" color="#EB5E28" />
        ) : (
          <FlatList
            data={books}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 16}} />} // Gap between items
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={WIDTH * 0.82} // Adjust to item width + separator width
            pagingEnabled={true} // Optional: Snap behavior for iOS
          />
        )}
      </View>
    </View>
  );
};

const ContinueCardList = ({headerCard, subHeader}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getTrendingBooks(1, 10);
        // console.log('checklog:', res);
        setBooks(res.data.trendingBooks);
      } catch (err) {
        console.log('error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const renderItem = ({item}) => {
    console.log('Rendering Item:', item); // Log the data for each item

    return (
      <ContinueCard
        title={item.title}
        author={item.author}
        idBooks={item._id}
        imageLink={item.coverImage}
        description={item.plot}
      />
    );
  };

  return (
    <View style={{}}>
      <View>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: '#F8F8F8',
          }}>
          {headerCard}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: '#F8F8F8',
          }}>
          {subHeader}
        </Text>
      </View>
      <View
        style={{
          marginTop: HEIGHT * 0.015,
        }}>
        {loading ? (
          <ActivityIndicator size="large" color="#EB5E28" />
        ) : (
          <FlatList
            data={books}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 16}} />} // Gap between items
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={WIDTH * 0.82} // Adjust to item width + separator width
            pagingEnabled={true} // Optional: Snap behavior for iOS
          />
        )}
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#00171F',
      }}>
      <Header />
      <View
        style={{
          paddingStart: WIDTH * 0.02,
          paddingTop: HEIGHT * 0.03,
          paddingBottom: HEIGHT * 0.02,
        }}>
        <BigStoryCardList
          headerCard={'Completed Stories'}
          subHeader={'Binge from start to finish'}
        />
        <ContinueCardList
          headerCard={'Continue Reading'}
          subHeader={'Pick up where you left off'}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
