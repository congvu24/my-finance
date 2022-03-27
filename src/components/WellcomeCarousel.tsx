import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
  SECONDARY_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import Carousel, { Pagination } from 'react-native-snap-carousel';

export default function WellcomeCarousel() {
  const carouselRef = useRef(null);
  const [active, setActive] = useState(1);

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide} key={index}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.slideText}>{item.title}</Text>
      </View>
    );
  };

  const entries = [
    { title: 'Realtime chart', image: require('../images/slide_chart1.png') },
    {
      title: 'Record all activites',
      image: require('../images/slide_chart4.png'),
    },
    {
      title: 'Variety of investment',
      image: require('../images/slide_chart2.png'),
    },
    {
      title: 'Manage wallets by yourself',
      image: require('../images/slide_chart3.png'),
    },
  ];

  const width = useWindowDimensions().width;

  return (
    <View style={styles.wrap}>
      <Carousel
        ref={carouselRef}
        data={entries}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width}
        pagingEnabled
        autoplay={true}
        activeAnimationType="timing"
        loop={true}
        autoplayInterval={3000}
        lockScrollWhileSnapping={true}
        enableMomentum={false}
        onSnapToItem={index => setActive(index)}
      />
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={active}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 20, alignItems: 'center' },
  slide: {
    // backgroundColor: 'blue',
    height: 400,
    padding: 10
  },
  slideText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
    color: WHITE_COLOR,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: THIRD_BG_COLOR,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
