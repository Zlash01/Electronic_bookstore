import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
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
import {useNavigation} from '@react-navigation/native';
import {getSingleBookData} from '../../api/apiController';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import Loading from '../loading/loading';

// dummy data from api
const dummyData = {
  imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
  title: 'The Combat Baker And Automation Waitress',
  author: 'SOW',
  authorId: 1,
  authorImage: 'https://i.postimg.cc/jq1v1hhR/image.png',
  description:
    "The former soldier of the Principality of Wiltia moves to a rural town to open a bakery. While he has no problem baking delicious bread, this battle-scarred veteran discovers that his intimidating demeanor is scaring off potential customers. Just when he's ready to give up, Sven walked into his shop to ask for a job of a waitress. Could hiring her save his bakery? Just whoo is this beautiful Just who is this beautiful girl? Is she even human?!",
  totalChapter: 10,
  totalView: 1000,
  totalVote: 50,
  totalVoteRecommended: 30,
  tags: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Romance'],
  parts: [
    {
      idParts: 1,
      title:
        'a silent hill ncipality of Wiltia moves to a rural town to open a bakery. Whil',
      chapter: 1,
    },
    {idParts: 2, title: 'a good night sleep', chapter: 2},
    {idParts: 3, title: 'a soothing voice', chapter: 3},
    {idParts: 4, title: 'a red field', chapter: 4},
    {idParts: 5, title: 'a bakery', chapter: 5},
    {idParts: 6, title: 'a small house', chapter: 6},
  ],
  similarStories: [
    {
      idBooks: 1,
      imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
      title: 'Similar Book 1',
      author: 'Jane Smith',
    },
    {
      idBooks: 2,
      imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
      title: 'Similar Book 2',
      author: 'Bob Johnson',
    },
    {
      idBooks: 3,
      imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
      title: 'Similar Book 3',
      author: 'Alice Johnson',
    },
    {
      idBooks: 4,
      imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
      title: 'Similar Book 4',
      author: 'David Smith',
    },
    {
      idBooks: 5,
      imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
      title: 'Similar Book 5',
      author: 'Emily Davis',
    },
  ],
};

//dummy review data
const reviews = [
  {
    Userid: 1,
    Username: 'John Doe',
    UserImage: 'https://i.postimg.cc/jq1v1hhR/image.png',
    Review:
      'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.',
    ReviewDate: '2023-10-01',
    ReviewVote: 10,
    ReviewVoteUp: 5,
  },
  {
    Userid: 2,
    Username: 'Jane Smith',
    UserImage: 'https://i.postimg.cc/jq1v1hhR/image.png',
    Review:
      'Using random paragraph generators helps ignite ideas for creative writing. Some writers find it hard to come up with a starting point, and these generators serve as prompts. The user can develop the paragraph into an essay or use it in the middle of their storyline.',
    ReviewDate: '2023-10-02',
    ReviewVote: 15,
    ReviewVoteUp: 8,
  },
  {
    Userid: 3,
    Username: 'Emily Johnson',
    UserImage: 'https://i.postimg.cc/jq1v1hhR/image.png',
    Review:
      'A random paragraph generator is a useful tool for overcoming writer’s block. It presents an unexpected prompt that pushes a writer’s creativity to explore new directions.',
    ReviewDate: '2023-09-28',
    ReviewVote: 12,
    ReviewVoteUp: 7,
  },
  {
    Userid: 4,
    Username: 'Michael Brown',
    UserImage: 'https://i.postimg.cc/jq1v1hhR/image.png',
    Review:
      'I’ve used random paragraphs to fuel my brainstorming sessions. It’s interesting how a simple random prompt can kickstart the creation of full-length stories.',
    ReviewDate: '2023-10-03',
    ReviewVote: 20,
    ReviewVoteUp: 11,
  },
  {
    Userid: 5,
    Username: 'Chris Lee',
    UserImage: 'https://i.postimg.cc/jq1v1hhR/image.png',
    Review:
      'This generator gave me the perfect starting point for my latest short story. I struggled for weeks, but with one random paragraph, everything just clicked into place.',
    ReviewDate: '2023-09-29',
    ReviewVote: 18,
    ReviewVoteUp: 9,
  },
];

const similarStories = [
  {
    idBooks: 1,
    imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
    title: 'Similar Book 1',
  },
  {
    idBooks: 2,
    imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
    title: 'Similar Book 2 long text bla bla bla',
  },
  {
    idBooks: 3,
    imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
    title: 'Similar Book 3',
  },
  {
    idBooks: 4,
    imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
    title: 'Similar Book 4',
  },
  {
    idBooks: 5,
    imageLink: 'https://i.postimg.cc/8ckPPDky/image-1.png',
    title: 'Similar Book 5',
  },
];

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const BookDetail = ({navigation, route}) => {
  console.log('Book Detail Params:', route.params);
  const {idBooks} = route.params;
  const [bookData, setBookData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookData = async () => {
      try {
        setLoading(true); // Start loading

        const res = await getSingleBookData(idBooks);
        if (res.status === 200) {
          setBookData(res.data);
        } else {
          console.log('Error:', res);
          Alert.alert('Error', 'Failed to get book data', res.data);
        }
      } catch (error) {
        console.log('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred');
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getBookData();
  }, [idBooks]);

  // get book detail from api
  const bookDetail = dummyData;

  //functions
  const rcmPercentage = (totalVoteRecommended, totalVote) => {
    return totalVote > 0 ? (totalVoteRecommended / totalVote) * 100 : 0;
  };

  const [added, setAdded] = React.useState(false);
  const [libLoading, setLibLoading] = React.useState(false);
  useEffect(() => {
    // check if book is added to library (api call)
    // if added, setAdded to true
  }, []);

  const addToLibrary = () => {
    setLibLoading(true);
    // api call to add book to library
    setAdded(!added);
    setLibLoading(false);
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
          chapterId={part.idParts}
          chapterTitle={part.title}
          chapterDate={part.createdAt}
          chapterNumber={part.chapter}
        />
      ));
  };

  const InfoBlockComponent = props => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!expanded);
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: props.paddingTop,
          paddingBottom: props.paddingBottom,
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
          {props.title}
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

        {props.text.length && props.text.length > 200 && (
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
        Userid={review.Userid}
        Username={review.Username}
        UserImage={review.UserImage}
        Review={review.Review}
        ReviewDate={review.ReviewDate}
        ReviewVote={review.ReviewVote}
        ReviewVoteUp={review.ReviewVoteUp}
      />
    ));
  };

  const SimilarStories = () => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: width * 0.03}}
        data={similarStories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.imageLink}}
              style={{
                height: height * 0.15,
                width: width * 0.24,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: '#D2CEDC',
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                width: width * 0.24,
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
            source={{uri: bookData.coverImage}}
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
          {/* <Image
            source={{uri: bookDetail.authorImage}}
            style={{height: 32, width: 32, borderRadius: 1000}}
          /> */}
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
              bookData.positiveVote,
              bookData.totalVote,
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
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              height: 40,
              marginTop: 15,
              flex: 9,
              // backgroundColor: 'red',
              borderWidth: 2,
              borderColor: '#F8F8F8',
              borderRadius: 90,
            }}>
            <LibAdd style={{height: 24, width: 24}} />
            <Text
              style={{
                color: '#D2CEDC',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                textAlign: 'center',
              }}>
              Library
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
            <TouchableOpacity style={{alignSelf: 'center'}}>
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
              CUSTOMER REVIEWS FOR {bookDetail.title.toUpperCase()}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: '#BABABA'}}>
                {bookDetail.totalVoteRecommended} recommended out of{' '}
                {bookDetail.totalVote} reviews (
                {(bookDetail.totalVoteRecommended / bookDetail.totalVote) * 100}
                %)
              </Text>
              <TouchableOpacity>
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

          <SimilarStories />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookDetail;
