import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import ThumbUp from '../../../assets/svg/home/thumbs-up-outline.svg';
import limit from '../../../util/limitWord';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ReviewCard = (props: {
  Userid: number;
  Username: string;
  UserImage: string;
  Review: string;
  ReviewDate: string;
  ReviewVote: number;
  ReviewVoteUp: number;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#00171F',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#fff',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginBottom: height * 0.02,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#4e4e4e',

          paddingVertical: 10,
        }}>
        {/* user */}
        <View
          style={{
            flex: 5,
            paddingVertical: 5,
            paddingHorizontal: width * 0.02,
          }}>
          <Image
            source={{uri: props.UserImage}}
            height={40}
            width={40}
            style={{borderRadius: 1000, borderWidth: 1}}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
              color: '#F8F8F8',
            }}>
            {props.Username}
          </Text>
        </View>
        {/* recommend bar */}
        <View
          style={{
            flex: 6,
            padding: 10,
            flexDirection: 'row',
            gap: 10,
          }}>
          <ThumbUp width={height * 0.05} height={height * 0.05} />
          <View style={{}}>
            <Text
              style={{
                color: '#F8F8F8',
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
              }}>
              Recommended
            </Text>
            <Text
              style={{
                color: '#D5D5D5',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
              }}>
              Review at: {props.ReviewDate}
            </Text>
          </View>
        </View>
      </View>

      {/* review */}
      <View
        style={{
          paddingBottom: 10,
        }}>
        <Text
          style={{
            paddingHorizontal: width * 0.03,
            paddingTop: 10,
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: '#D5D5D5',
          }}>
          {expanded ? props.Review : limit(props.Review, 300)}
        </Text>
        {props.Review.length > 300 && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text
              style={{
                paddingHorizontal: 10,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 14,
                color: '#D24E37',
                alignSelf: 'flex-end',
              }}>
              {expanded ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* review vote */}
      <View></View>
    </View>
  );
};

export default ReviewCard;
