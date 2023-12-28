import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withDelay,
} from 'react-native-reanimated';

const RandomAnimatedImage = ({ source, duration, repeatCount }) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  const getRandomValue = () => {
    return Math.random() * 100 - 50; // Valor aleatório entre -50 e 50
  };

  useEffect(() => {
    translateY.value = withRepeat(
      withSpring(getRandomValue(), { damping: 2, stiffness: 100 }),
      repeatCount,
      true
    );
    translateX.value = withRepeat(
      withSpring(getRandomValue(), { damping: 2, stiffness: 100 }),
      repeatCount,
      true
    );
  }, [duration, repeatCount]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image source={source} style={styles.image} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
});

export default RandomAnimatedImage;
