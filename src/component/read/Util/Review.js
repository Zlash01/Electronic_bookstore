import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {ThumbsUp, ThumbsDown} from 'lucide-react-native';

const ReviewModal = ({visible, onClose, bookId}) => {
  const [isRecommended, setIsRecommended] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isRecommended === null) {
      Alert.alert('Error', 'Please select whether you recommend this book');
      return;
    }

    setIsLoading(true);
    try {
      // Dummy API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // await userReview(bookId, isRecommended, reviewText);

      Alert.alert('Success', 'Thank you for your review!', [
        {
          text: 'OK',
          onPress: () => {
            setReviewText('');
            setIsRecommended(null);
            onClose();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Write a Review</Text>

          <View style={styles.recommendationContainer}>
            <TouchableOpacity
              style={[
                styles.recommendButton,
                isRecommended === true && styles.selectedButton,
              ]}
              onPress={() => setIsRecommended(true)}>
              <ThumbsUp
                size={24}
                color={isRecommended === true ? '#FFF' : '#989898'}
              />
              <Text
                style={[
                  styles.recommendText,
                  isRecommended === true && styles.selectedText,
                ]}>
                Recommend
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.recommendButton,
                isRecommended === false && styles.selectedButton,
              ]}
              onPress={() => setIsRecommended(false)}>
              <ThumbsDown
                size={24}
                color={isRecommended === false ? '#FFF' : '#989898'}
              />
              <Text
                style={[
                  styles.recommendText,
                  isRecommended === false && styles.selectedText,
                ]}>
                Not Recommend
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review here..."
            placeholderTextColor="#989898"
            multiline
            numberOfLines={4}
            value={reviewText}
            onChangeText={setReviewText}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              disabled={isLoading}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#001219',
    borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#F8F8F8',
    fontFamily: 'Poppins-Medium',
    marginBottom: 20,
    textAlign: 'center',
  },
  recommendationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  recommendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#323232',
    gap: 8,
  },
  selectedButton: {
    backgroundColor: '#EB5E28',
    borderColor: '#EB5E28',
  },
  recommendText: {
    color: '#989898',
    fontFamily: 'Poppins-Medium',
  },
  selectedText: {
    color: '#FFF',
  },
  reviewInput: {
    backgroundColor: '#00171F',
    borderRadius: 8,
    padding: 12,
    color: '#F8F8F8',
    fontFamily: 'Poppins-Regular',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#323232',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F8F8F8',
    fontFamily: 'Poppins-Medium',
  },
  submitButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#EB5E28',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
  },
});

export default ReviewModal;
