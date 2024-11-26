import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import IndividualChapter from './Util/IndividualChapter';
import {ArrowLeft} from 'lucide-react-native';

const ChapterList = ({navigation, route}) => {
  // console.log('ChapterList.js: ChapterList: route.params: ', route.params);

  const RenderParts = () => {
    return (
      route.params.data &&
      route.params.data.map((part, index) => (
        <IndividualChapter
          key={index}
          chapterId={part._id}
          chapterTitle={part.title}
          bookId={part.book}
          chapterDate={new Date(part.createdAt).toLocaleDateString()}
          chapterNumber={part.chapterNumber}
        />
      ))
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#00171F',

        paddingVertical: 10,
      }}>
      {/* header bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft color="#f8f8f8" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chapter List</Text>
        <View style={styles.placeholderWidth} />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
        }}>
        <RenderParts />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    color: '#f8f8f8',
    fontFamily: 'Poppins-Medium',
  },
  placeholderWidth: {
    width: 32,
  },
});

export default ChapterList;
