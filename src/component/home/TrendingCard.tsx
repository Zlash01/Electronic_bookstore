import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import * as themes from '../../theme/theme';
const {width, height} = Dimensions.get('window');

const ITEM_SIZE = width * 0.25;

const TrendingCard = ({data}: {data: any[]}) => {
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // Handler to detect which item is currently selected
  const handlePress = () => {
    console.log('Selected book:', data[selectedBookIndex]);
  };
  const handleViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      const selectedIndex = viewableItems[0].index;
      setSelectedBookIndex(selectedIndex);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // const renderItem = ({item, index}: {item: any; index: number}) => {
  //   //const isSelected = index === selectedBookIndex;
  //   const inputRange = [
  //     (index - 1) * ITEM_SIZE,
  //     index * ITEM_SIZE,
  //     (index + 1) * ITEM_SIZE,
  //   ];
  //   const translateY = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [0, -50, 0],
  //   });
  //   return (
  //     <Animated.View style={styles.cardContainer}>
  //       <Image source={{uri: item.imageLink}} style={[styles.bookImage]} />
  //     </Animated.View>
  //   );
  // };

  return (
    <View style={styles.container}>
      {/* Horizontal FlatList to show book images */}
      <Animated.FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        onViewableItemsChanged={handleViewableItemsChanged}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
        renderItem={({item, index}: {item: any; index: number}) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -10, 0], // Animate the selected item
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                height: ITEM_SIZE * 1.2,
                padding: 10,
                marginHorizontal: 0,
                transform: [{translateY}],
              }}>
              <Image source={{uri: item.imageLink}} style={styles.bookImage} />
            </Animated.View>
          );
        }}
        ListFooterComponent={() => <View style={{width: width * 0.7}} />}
        style={{paddingTop: 10}}
      />

      {/* Display the name, author, and description of the selected book */}
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{data[selectedBookIndex]?.title}</Text>
        <Text style={styles.bookAuthor}>{data[selectedBookIndex]?.author}</Text>
        <Text style={styles.bookDescription}>
          {data[selectedBookIndex]?.description.length > 150
            ? data[selectedBookIndex]?.description.substring(0, 150) + '...'
            : data[selectedBookIndex]?.description}
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.bookDetailBtn}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cardContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.5,
    //transform: [{translateY}],
    // Move the selected item up
    // padding: 0,
    // marginHorizontal: 5,
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    padding: 0,
    marginHorizontal: 0,
  },
  selectedBookImage: {
    width: 100, // Make the selected image larger
    height: 120,
  },
  bookDetails: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    margin: 0,
  },
  bookTitle: {
    fontSize: themes.FONTSIZES.sm,
    fontFamily: themes.FONTS.bold,
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: themes.FONTSIZES.xsm,
    fontFamily: themes.FONTS.medium,
    marginBottom: 5,
  },
  bookDescription: {
    fontSize: themes.FONTSIZES.xs,
    fontFamily: themes.FONTS.light,
    textAlign: 'left',
  },
  bookDetailBtn: {
    fontSize: themes.FONTSIZES.xsm,
    fontFamily: themes.FONTS.medium,
    textAlign: 'right',
    marginTop: 5,
  },
});

export default TrendingCard;
