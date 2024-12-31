import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useFadeAnimation = (v: string | undefined) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (v) {
      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [v]);

  return {
    fadeAnim,
  };
};
