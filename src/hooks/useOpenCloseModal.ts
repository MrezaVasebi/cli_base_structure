import { useRef } from "react";
import { Animated } from "react-native";

export const useOpenCloseModal = () => {
  const modalAnimation = useRef(new Animated.Value(0)).current; // Slide from top

  const openModal = (fn: () => void) => {
    fn();
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = (fn: (v: boolean) => void) => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => fn(false));
  };

  return {
    modalAnimation,
    openModal,
    closeModal,
  };
};
