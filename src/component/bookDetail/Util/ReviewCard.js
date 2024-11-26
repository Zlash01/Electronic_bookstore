import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  User,
} from 'lucide-react-native';

const ReviewCard = ({Username, Review, ReviewDate, isRecommended}) => {
  const [expanded, setExpanded] = useState(false);

  // Calculate if review needs expansion (more than 200 characters)
  const needsExpansion = Review.length > 200;

  const limitText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  return (
    <View
      style={{
        backgroundColor: '#011D27',
        borderRadius: 12,
        marginVertical: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#1A2F38',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}>
        {/* User Info */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              backgroundColor: '#1A2F38',
              borderRadius: 20,
              padding: 8,
              marginRight: 8,
            }}>
            <User size={28} color="#D2CEDC" />
          </View>
          <View>
            <Text
              style={{
                color: '#F8F8F8',
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
              }}>
              {Username}
            </Text>
            <Text
              style={{
                color: '#989898',
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
              }}>
              {new Date(ReviewDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Recommendation Badge */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isRecommended ? '#2C4A33' : '#4A2C2C',
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 16,
          }}>
          {isRecommended ? (
            <ThumbsUp size={16} color="#4CAF50" style={{marginRight: 4}} />
          ) : (
            <ThumbsDown size={16} color="#CF6679" style={{marginRight: 4}} />
          )}
          <Text
            style={{
              color: isRecommended ? '#4CAF50' : '#CF6679',
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
            }}>
            {isRecommended ? 'Recommended' : 'Not Recommended'}
          </Text>
        </View>
      </View>

      {/* Review Content */}
      <Text
        style={{
          color: '#D2CEDC',
          fontSize: 14,
          fontFamily: 'Poppins-Regular',
          lineHeight: 20,
        }}>
        {expanded ? Review : limitText(Review, 200)}
      </Text>

      {/* Expand/Collapse Button */}
      {needsExpansion && (
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-end',
            marginTop: 8,
            padding: 4,
          }}>
          <Text
            style={{
              color: '#D24E37',
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
              marginRight: 4,
            }}>
            {expanded ? 'Show Less' : 'Show More'}
          </Text>
          {expanded ? (
            <ChevronUp size={16} color="#D24E37" />
          ) : (
            <ChevronDown size={16} color="#D24E37" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReviewCard;
