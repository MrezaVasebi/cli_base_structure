import React, { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

interface IAnimatedListContainerProps {
  index: number;
}

const AnimatedListContainer = (
  props: ViewProps & IAnimatedListContainerProps
) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      delay: props.index * 50, // stagger animation
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };
  return (
    <Animated.View style={[animatedStyle, props.style]}>
      {props.children}
    </Animated.View>
  );
};

export default AnimatedListContainer;
