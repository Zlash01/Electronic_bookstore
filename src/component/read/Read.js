import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {ArrowLeft, Type, Palette, Settings, Star} from 'lucide-react-native';
import FontSettingsModal from './Util/FontSetting';
import ThemeSettingsModal from './Util/ThemeSetting';
import ReviewModal from './Util/Review';
import Loading from '../loading/loading';
import {getSingleChapter} from '../../api/apiController';

const {width, height} = Dimensions.get('window');

const TopBar = ({title, onBack}) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <ArrowLeft color="#f8f8f8" size={24} />
    </TouchableOpacity>
    <Text style={styles.topBarTitle} numberOfLines={1}>
      {title}
    </Text>
    <View style={styles.placeholderWidth} />
  </View>
);

const BottomBar = ({scrollPercentage, onSeek, onFontPress, onThemePress}) => (
  <View style={styles.bottomBar}>
    {/* Seekbar */}
    <View style={styles.seekbarContainer}>
      <View style={[styles.seekbarProgress, {width: `${scrollPercentage}%`}]} />
      {/* <TouchableOpacity
        style={[styles.seekbarHandle, {left: `${scrollPercentage}%`}]}
        onPress={onSeek}
      /> */}
    </View>

    {/* Bottom icons */}
    <View style={styles.bottomIcons}>
      <TouchableOpacity
        onPress={() => console.log('Review')}
        style={styles.iconButton}>
        <Star stroke="#f8f8f8" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onFontPress} style={styles.iconButton}>
        <Type stroke="#f8f8f8" size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onThemePress} style={styles.iconButton}>
        <Palette stroke="#f8f8f8" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('Settings')}
        style={styles.iconButton}>
        <Settings stroke="#f8f8f8" size={24} />
      </TouchableOpacity>
    </View>
  </View>
);

const Read = ({navigation, route}) => {
  useEffect(() => {
    console.log('check data from route', route.params);
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

  useEffect(() => {
    setLoading(true);
    getSingleChapter(route.params.idChapter)
      .then(res => {
        // console.log('check data from getSingleChapter', res);
        setData({
          title: res.data.title,
          content: res.data.content,
        });
      })
      .finally(() => {
        setLoading(false);
      })
      .catch(err => {
        console.log('error getSingleChapter', err);
      });
  }, [route.params.idChapter]);
  // useEffect(() => {
  //   console.log('check data from data', data);
  // }, [data]);

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
    backgroundColor: '#001219',
    borderBottomWidth: 1,
    borderBottomColor: '#323232',
  },
  backButton: {
    padding: 8,
  },
  topBarTitle: {
    flex: 1,
    fontSize: 18,
    color: '#f8f8f8',
    fontFamily: 'Poppins-Medium',
  },
  placeholderWidth: {
    width: 32,
  },
  bottomBar: {
    backgroundColor: '#001219',
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
