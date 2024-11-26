import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {ArrowLeft} from 'lucide-react-native';
import ReviewCard from './Util/ReviewCard';

const ReviewList = ({navigation, route}) => {
  console.log('ReviewList.js: ReviewList: route.params: ', route.params);
  const reviews = route.params.data;
  console.log('ReviewList.js: ReviewList: reviews: ', reviews);

  const ReviewList = () => {
    return reviews.map((review, index) => (
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
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={styles.placeholderWidth} />
      </View>
      <View
        style={{
          paddingHorizontal: 15,
        }}>
        <ReviewList />
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

export default ReviewList;
