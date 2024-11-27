import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import IndividualChapter from './Util/IndividualChapter';

//svg icons
import Vis from '../../assets/svg/bookDetail/visibility.svg';
import Star from '../../assets/svg/bookDetail/star.svg';
import TOC from '../../assets/svg/bookDetail/toc.svg';
import Lib from '../../assets/svg/bookDetail/library.svg';
import LibAdd from '../../assets/svg/bookDetail/library_add.svg';
import limit from '../../util/limitWord';
import ReviewCard from './Util/ReviewCard';
import ArrowBack from '../../assets/svg/universal/arrow_back.svg';
import {
  addToLibrary,
  getBookReviews,
  getRandomBooks,
  getSingleBookData,
} from '../../api/apiController';
import {Check, Library} from 'lucide-react-native';
import Loading from '../loading/loading';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const BookDetail = ({navigation, route}) => {
  // console.log('Book Detail Params:', route.params);
  const {idBooks} = route.params;
  const [bookData, setBookData] = useState({});
  const [bookRecommendation, setBookRecommendation] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [isArchive, setIsArchive] = useState(false);

  useEffect(() => {
    setIsInLibrary(bookData.inLibrary);
    setIsArchive(bookData.inReadingList);
  }, [bookData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both data simultaneously using Promise.all
        const [bookResponse, reviewsResponse, bookRecommendationResponse] =
          await Promise.all([
            getSingleBookData(idBooks),
            getBookReviews(idBooks),
            getRandomBooks(1, 10),
          ]);

        // Handle book data
        if (bookResponse.status === 200) {
          // console.log('Book:', bookResponse.data);
          setBookData(bookResponse.data);
        } else {
          console.log('Error:', bookResponse);
          Alert.alert('Error', 'Failed to get book data', bookResponse.data);
        }

        // Handle reviews data
        if (reviewsResponse.status === 200) {
          const formattedReviews = reviewsResponse.data.allReviewsOfBook.map(
            review => ({
              id: review._id,
              positive: review.positive,
              Username: review.userId.name,
              Review: review.review,
              ReviewDate: review.createdAt,
            }),
          );
          setReviews(formattedReviews);
        } else {
          console.log('Error:', reviewsResponse);
          Alert.alert('Error', 'Failed to get reviews', reviewsResponse.data);
        }

        if (bookRecommendationResponse.status === 200) {
          setBookRecommendation(bookRecommendationResponse.data);
          // console.log('Book Recommendation:', bookRecommendationResponse.data);
        } else {
          console.log('Error:', bookRecommendationResponse);
          Alert.alert(
            'Error',
            'Failed to get book recommendation',
            bookRecommendationResponse.data,
          );
        }
      } catch (error) {
        console.log('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idBooks]);

  //functions
  const rcmPercentage = (totalVoteRecommended, totalVote) => {
    return totalVote > 0 ? (totalVoteRecommended / totalVote) * 100 : 0;
  };

  const [libLoading, setLibLoading] = React.useState(false);

  const addToLibraryFunc = async () => {
    setLibLoading(true);
    console.log('Adding book to library:', idBooks);
    try {
      const res = await addToLibrary(idBooks);
      if (res.status === 200) {
        console.log('Success:', res);
        // Update both states
        setIsInLibrary(true);
        setBookData(prevData => ({
          ...prevData,
          inLibrary: true,
        }));
      } else {
        console.log('Error:', res);
        Alert.alert('Error', 'Failed to add book to library', res.data);
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLibLoading(false);
    }
  };

  const tagsParser = tags => {
    return tags ? tags.join(', ') : '';
  };

  //small components
  const RenderParts = () => {
    return bookData.chapters
      .slice(0, 3)
      .map((part, index) => (
        <IndividualChapter
          key={index}
          chapterId={part._id}
          chapterTitle={part.title}
          bookId={part.book}
          chapterDate={new Date(part.createdAt).toLocaleDateString()}
          chapterNumber={part.chapterNumber}
          chapterList={bookData.chapters}
        />
      ));
  };

  const InfoBlockComponent = props => {
    // Return null if text prop is empty or undefined
    if (!props.text || props.text.trim() === '') {
      return null;
    }

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: props.paddingTop || 0, // Default to 0 if paddingTop is not provided
          paddingBottom: props.paddingBottom || 0, // Default to 0 if paddingBottom is not provided
        }}>
        <Text
          style={{
            flex: 1,
            alignSelf: 'auto',
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: '#f8f8f8',
          }}>
          {props.title || ''}{' '}
          {/* Default to empty string if title is not provided */}
        </Text>

        <Text
          style={{
            flex: 4,
            alignSelf: 'center',
            paddingStart: 10,
            paddingEnd: 20,
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: '#D8D8D8',
          }}>
          {expanded ? props.text : limit(props.text, 200)}
        </Text>

        {props.text.length > 200 && (
          <TouchableOpacity
            onPress={toggleExpand}
            style={{
              position: 'absolute',
              bottom: 2,
              right: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 12,
                color: '#D24E37',
                textShadowColor: 'rgba(0, 0, 0, 0.2)',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 2,
                elevation: 1,
              }}>
              {expanded ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const StatisticComponent = props => {
    const Icon = props.icon;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          //   alignItems: 'flex-end',
          gap: 5,
          //   backgroundColor: 'red',
        }}>
        <Icon style={{height: 24, width: 24}} />
        <Text
          style={{
            fontSize: 13,
            fontFamily: 'Poppins-Regular',
            color: '#D2CEDC',
            // backgroundColor: 'blue',
            textAlign: 'auto',
            textAlignVertical: 'bottom',
          }}>
          {props.text}
        </Text>
      </View>
    );
  };

  const ReviewList = () => {
    const displayReviews = reviews.slice(0, 3);
    return displayReviews.map((review, index) => (
      <ReviewCard
        key={index}
        id={review.id}
        Username={review.Username}
        Review={review.Review}
        ReviewDate={review.ReviewDate}
        isRecommended={review.positive}
      />
    ));
  };

  const SimilarStories = ({data}) => {
    // Extract the randomBooks array from the API response
    // console.log('Similar Stories:', data);
    const similarStories = data.randomBooks.map(book => ({
      imageLink: book.coverImage,
      title: book.title,
      _id: book._id,
    }));

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: width * 0.03}}
        ItemSeparatorComponent={() => <View style={{width: width * 0.01}} />}
        data={similarStories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', {idBooks: item._id})}
            style={{
              // alignItems: 'center',
              width: width * 0.24,
            }}>
            <Image
              source={
                item.imageLink
                  ? {uri: item.imageLink}
                  : require('../../assets/picture/universal/R.png')
              }
              style={{
                height: height * 0.15,
                width: width * 0.24,
              }}
              resizeMode="contain"
            />
            <Text
              numberOfLines={2}
              style={{
                color: '#D2CEDC',
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
                // width: width * 0.24,
                marginTop: 3,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#00171F'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* book picture */}
        <TouchableOpacity
          style={{position: 'absolute', top: 10, left: 10, zIndex: 1}}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <ArrowBack
            style={{
              height: 30,
              width: 30,
              margin: 10,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            //   backgroundColor: 'red',
            marginTop: 30,
          }}>
          <Image
            source={
              bookData.coverImage
                ? {uri: bookData.coverImage}
                : require('../../assets/picture/universal/R.png')
            }
            style={{height: 200, width: 150}}
            resizeMode="contain"
          />
        </View>
        {/* book title */}
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              color: '#f8f8f8',
              fontSize: 24,
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'center',
            }}>
            {bookData.title}
          </Text>
        </View>
        {/* book author */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text
            style={{
              color: '#D2CEDC',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
            }}>
            Author: {bookData.authorName}
          </Text>
        </View>
        {/* book statistic */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginTop: 15,
          }}>
          <StatisticComponent icon={Vis} text={`${bookData.views}`} />
          <StatisticComponent
            icon={Star}
            text={`${rcmPercentage(
              bookData.positiveVotes,
              bookData.totalVotes,
            )}%`}
          />
          <StatisticComponent
            icon={TOC}
            text={`${
              bookData.chapters?.length
                ? bookData.chapters?.length
                : bookData.totalChapter
            } Chapters`}
          />
        </View>
        {/* book CTA */}
        <View
          style={{
            width: width * 0.9,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Read', {
                idChapter: bookData.chapters[0]._id,
                bookTitle: bookData.title,
                chapterNumber: 1,
                bookId: idBooks,
                chapterList: bookData.chapters,
              })
            }
            style={{
              flex: 11,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              gap: 15,
              marginTop: 15,
              backgroundColor: '#943525',
              borderRadius: 90,
            }}>
            <Lib
              style={{
                height: 24,
                width: 24,
              }}
            />
            <Text
              style={{
                color: '#D2CEDC',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}>
              Read
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={!isInLibrary && !isArchive ? addToLibraryFunc : null}
            disabled={isInLibrary || isArchive || libLoading}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              height: 40,
              marginTop: 15,
              flex: 9,
              borderWidth: 2,
              borderColor: isInLibrary || isArchive ? '#606060' : '#F8F8F8',
              borderRadius: 90,
              opacity: isInLibrary || isArchive ? 0.7 : 1,
            }}>
            {libLoading ? (
              <ActivityIndicator size="small" color="#D2CEDC" />
            ) : isInLibrary || isArchive ? (
              <Check style={{height: 24, width: 24, color: '#606060'}} />
            ) : (
              <LibAdd style={{height: 24, width: 24}} />
            )}
            <Text
              style={{
                color: isInLibrary ? '#606060' : '#D2CEDC',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}>
              {isInLibrary
                ? 'In Library'
                : isArchive
                ? 'In Archive'
                : 'Library'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: '#011D27',
            marginTop: 28,
            paddingBottom: 5,
          }}>
          {/* book tags*/}
          <InfoBlockComponent
            title="Tags:"
            text={tagsParser(bookData.tags)}
            paddingTop={15}
            paddingBottom={0}
          />
          {/* book description */}
          <InfoBlockComponent
            title="Plot:"
            text={bookData.plot}
            paddingBottom={25}
            paddingTop={10}
          />
        </View>
        {/* book parts */}
        <View
          style={{
            paddingHorizontal: 17,
            paddingTop: 10,
            // backgroundColor: 'red',
            paddingBottom: 30,
          }}>
          <View
            style={{
              // backgroundColor: 'red',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <TOC
                style={{
                  height: 33,
                  width: 33,
                  alignSelf: 'center',
                  // backgroundColor: 'white',
                }}
              />
              <Text
                style={{
                  color: '#D2CEDC',
                  fontSize: 20,
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'left',
                  alignSelf: 'center',
                  paddingTop: 2,
                  // backgroundColor: 'green',
                }}>
                {bookData.chapters?.length ? bookData.chapters?.length : 0}{' '}
                Parts
              </Text>
            </View>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() =>
                navigation.navigate('ChapterList', {data: bookData.chapters})
              }>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'right',
                  alignSelf: 'center',
                  paddingTop: 2,
                  color: '#D24E37',
                  paddingRight: 7,
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <RenderParts />
        </View>
        {/* book reviews */}
        {reviews.length > 0 && (
          <View
            style={{
              backgroundColor: '#011D27',
              paddingHorizontal: width * 0.02,
              paddingVertical: height * 0.02,
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  color: '#D2CEDC',
                }}>
                CUSTOMER REVIEWS FOR {bookData.title.toUpperCase()}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{color: '#BABABA'}}>
                  {bookData.positiveVotes} recommended out of{' '}
                  {bookData.totalVotes} reviews (
                  {(bookData.positiveVotes / bookData.totalVotes) * 100}
                  %)
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ReviewList', {data: reviews})
                  }>
                  <Text
                    style={{
                      color: '#D24E37',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 14,
                      paddingRight: width * 0.02,
                    }}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                paddingVertical: height * 0.02,
                paddingHorizontal: width * 0.02,
              }}>
              <ReviewList />
            </View>
          </View>
        )}
        {/* similar stories */}
        <View
          style={{
            backgroundColor: '#00171F',
            paddingHorizontal: width * 0.02,
            paddingVertical: height * 0.02,
          }}>
          <View
            style={{
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                color: '#D2CEDC',
              }}>
              SIMILAR STORIES
            </Text>
          </View>

          <SimilarStories data={bookRecommendation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetail;
