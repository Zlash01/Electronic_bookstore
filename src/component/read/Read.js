import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {ArrowLeft, Type, Palette, Settings, Star} from 'lucide-react-native';
import FontSettingsModal from './Util/FontSetting';
import ThemeSettingsModal from './Util/ThemeSetting';
import ReviewModal from './Util/Review';
import {Menu} from 'lucide-react-native';
import Loading from '../loading/loading';
import {getSingleChapter, hasReviewed} from '../../api/apiController';
import {increaseViewCount} from '../../api/apiController';
import ChapterListModal from './Util/ChapterListModal';

const {width, height} = Dimensions.get('window');

const TopBar = ({title, onBack, currentTheme}) => (
  <View
    style={[styles.topBar, {backgroundColor: currentTheme.backgroundColor}]}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <ArrowLeft color={currentTheme.fontColor} size={24} />
    </TouchableOpacity>
    <Text
      style={[styles.topBarTitle, {color: currentTheme.fontColor}]}
      numberOfLines={1}>
      {title}
    </Text>
    <View style={styles.placeholderWidth} />
  </View>
);

const BottomBar = ({
  scrollPercentage,
  onSeek,
  onFontPress,
  onThemePress,
  onReviewPress,
  onChapterListPress,
  hasReview,
  theme,
}) => (
  <View
    style={[
      styles.bottomBar,
      {backgroundColor: theme.backgroundColor}, // Add this line
    ]}>
    <View style={styles.seekbarContainer}>
      <View style={[styles.seekbarProgress, {width: `${scrollPercentage}%`}]} />
    </View>

    <View style={styles.bottomIcons}>
      <TouchableOpacity
        onPress={onReviewPress}
        style={styles.iconButton}
        disabled={hasReview}>
        {hasReview ? (
          <Star stroke="#EB5E28" fill={'#EB5E28'} size={24} />
        ) : (
          <Star stroke={theme.fontColor} size={24} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onFontPress} style={styles.iconButton}>
        <Type stroke={theme.fontColor} size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onThemePress} style={styles.iconButton}>
        <Palette stroke={theme.fontColor} size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChapterListPress()}
        style={styles.iconButton}>
        <Menu stroke={theme.fontColor} size={24} />
      </TouchableOpacity>
    </View>
  </View>
);

const Read = ({navigation, route}) => {
  useEffect(() => {
    console.log('check data Read.js', route.params);
  }, []);
  const [loading, setLoading] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [themeSettingsVisible, setThemeSettingsVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({
    backgroundColor: '#00171F',
    fontColor: '#E8F1F2',
  });
  const handleThemeChange = theme => {
    setCurrentTheme(theme);
  };
  const [fontSettingsVisible, setFontSettingsVisible] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [currentFontFamily, setCurrentFontFamily] = useState('Poppins-Regular');
  const [data, setData] = useState({
    title: 'Title',
    content: 'Content',
  });
  const [reviewSettingsVisible, setReviewSettingsVisible] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const handleReviewOnClose = () => {
    setReviewSettingsVisible(false);
    setHasReview(true);
  };

  const [chapterListVisible, setChapterListVisible] = useState({});

  useEffect(() => {
    let isMounted = true; // For cleanup/prevent memory leaks

    const fetchData = async () => {
      try {
        setLoading(true);

        // Run both requests concurrently using Promise.all
        const [chapterResponse, reviewResponse] = await Promise.all([
          getSingleChapter(route.params.idChapter),
          hasReviewed(route.params.bookId),
        ]);

        // Only update state if component is still mounted
        if (isMounted) {
          setData({
            title: chapterResponse.data.title,
            content: chapterResponse.data.content,
          });
          setHasReview(reviewResponse.data.hasReviewed);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        // You may want to handle errors more gracefully here
        // e.g. show an error message to user
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, [route.params.idChapter, route.params.bookId]); // Include both dependencies

  const [viewCounted, setViewCounted] = useState(false);
  const readingTimer = useRef(null);
  const startTime = useRef(null);

  // Function to handle effective view
  const handleEffectiveView = async () => {
    if (viewCounted) return; // Prevent multiple view counts

    const currentTime = Date.now();
    const readingDuration = currentTime - startTime.current;

    // Check if reading time is more than 15 seconds
    if (readingDuration >= 15000) {
      try {
        await increaseViewCount(route.params.bookId);
        setViewCounted(true); // Mark view as counted
        if (readingTimer.current) {
          clearInterval(readingTimer.current); // Clear timer after successful view count
        }
        console.log('View count increased successfully');
      } catch (error) {
        console.error('Failed to increase view count:', error);
      }
    }
  };

  useEffect(() => {
    startTime.current = Date.now();
    readingTimer.current = setInterval(handleEffectiveView, 1000); // Check every second

    return () => {
      if (readingTimer.current) {
        clearInterval(readingTimer.current);
      }
    };
  }, []);

  const scrollViewRef = useRef(null);

  const handleScroll = event => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    const percentage =
      (contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100;
    setScrollPercentage(Math.min(Math.max(percentage, 0), 100));
  };
  const handleSeek = event => {
    if (scrollViewRef.current) {
      const touchX = event.nativeEvent.locationX;
      const percentage = (touchX / width) * 100;
      const contentHeight = scrollViewRef.current._contentHeight;
      const containerHeight = scrollViewRef.current._containerHeight;
      const scrollPosition =
        ((contentHeight - containerHeight) * percentage) / 100;

      scrollViewRef.current.scrollTo({
        y: scrollPosition,
        animated: true,
      });
    }
  };

  const handleChapterSelect = async chapter => {
    if (chapter._id === route.params.idChapter) return;

    setChapterListVisible(false);
    setLoading(true);
    try {
      const response = await getSingleChapter(chapter._id);
      setData({
        title: response.data.title,
        content: response.data.content,
      });
      // Update the route params to reflect the new chapter
      route.params.idChapter = chapter._id;
    } catch (err) {
      console.error('Error fetching chapter:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: currentTheme.backgroundColor},
      ]}>
      <TopBar
        title={route.params.bookTitle}
        onBack={() => navigation.goBack()}
        currentTheme={currentTheme}
      />

      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1, backgroundColor: currentTheme.backgroundColor}}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={styles.contentContainer}>
          <Text
            style={[
              styles.chapterTitle,
              {
                color: currentTheme.fontColor,
                fontFamily: currentFontFamily,
              },
            ]}>
            {data.title}
          </Text>
          <View
            style={[styles.divider, {backgroundColor: currentTheme.fontColor}]}
          />
          <Text
            style={[
              styles.content,
              {
                fontSize: fontSize,
                color: currentTheme.fontColor,
                fontFamily: currentFontFamily,
              },
            ]}>
            {data.content}
          </Text>
        </View>
      </ScrollView>

      <BottomBar
        scrollPercentage={scrollPercentage}
        onSeek={handleSeek}
        onFontPress={() => setFontSettingsVisible(true)}
        onThemePress={() => setThemeSettingsVisible(true)}
        onReviewPress={() => setReviewSettingsVisible(true)}
        onChapterListPress={() => setChapterListVisible(true)}
        hasReview={hasReview}
        theme={currentTheme}
      />
      <FontSettingsModal
        visible={fontSettingsVisible}
        onClose={() => setFontSettingsVisible(false)}
        currentFontSize={fontSize}
        onFontSizeChange={setFontSize}
        currentFontFamily={currentFontFamily}
        onFontFamilyChange={setCurrentFontFamily}
      />
      <ThemeSettingsModal
        visible={themeSettingsVisible}
        onClose={() => setThemeSettingsVisible(false)}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
      />
      <ReviewModal
        visible={reviewSettingsVisible}
        onClose={() => handleReviewOnClose()}
        bookId={route.params.bookId}
      />
      <ChapterListModal
        visible={chapterListVisible}
        onClose={() => setChapterListVisible(false)}
        chapters={route.params.chapterList}
        currentChapter={route.params.idChapter}
        onChapterSelect={handleChapterSelect}
        theme={currentTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#323232',
  },
  backButton: {
    padding: 8,
  },
  topBarTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  placeholderWidth: {
    width: 32,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: '#323232',
    paddingBottom: 24,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  seekbarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#323232',
    borderRadius: 2,
    marginBottom: 16,
  },
  seekbarProgress: {
    height: '100%',
    backgroundColor: '#EB5E28',
    borderRadius: 2,
  },
  seekbarHandle: {
    position: 'absolute',
    top: '50%',
    marginTop: -8,
    marginLeft: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EB5E28',
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  contentContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  chapterTitle: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'white',
    marginBottom: 25,
  },
  content: {
    lineHeight: 24,
  },
});

export default Read;
