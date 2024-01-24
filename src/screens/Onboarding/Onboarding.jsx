import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Image } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet';

import { SLIDES } from './Onboarding.constants';
import { style } from './Onboarding.style';
import { Button, Pagination, ScrollView, Text, View } from '../../__nano-design__';

const OnboardingScreen = ({ navigation: { navigate } }) => {
  const scrollViewRef = useRef(null);
  const { width } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / event.nativeEvent.layoutMeasurement.width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (lastSlide) {
      // ! TODO: Should save the user is onboarded
      navigate('main');
    } else if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * (currentIndex + 1), animated: true });
    }
  };

  const spaceXL = StyleSheet.value('$spaceXL');
  const lastSlide = currentIndex === SLIDES.length - 1;
  const slideSize = width - spaceXL * 2;

  return (
    <SafeAreaView style={style.screen}>
      <ScrollView
        decelerationRate="fast"
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        scrollEventThrottle={10}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        onScroll={handleScroll}
      >
        {SLIDES.map(({ image, message, title }, index) => (
          <View key={index} style={[style.slide, { width }]}>
            <Image
              resizeMode="contain"
              source={image}
              style={[style.image, { height: slideSize * 1.2, width: slideSize }]}
            />
            <Text bold title>
              {title}
            </Text>
            <Text>{message}</Text>
          </View>
        ))}
      </ScrollView>

      <View row style={style.footer}>
        <Pagination currentIndex={currentIndex} length={SLIDES.length} />

        <Button onPress={handleNext} style={style.button}>
          {lastSlide ? 'Start' : 'Next'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

OnboardingScreen.propTypes = {
  navigation: PropTypes.any,
};

export { OnboardingScreen };
