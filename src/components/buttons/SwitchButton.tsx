import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacityProps } from "react-native";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import ButtonWrapper from "./ButtonWrapper";

export interface ISwitchButton {
  isSelected: boolean;
}

const SwitchButton = (props: ISwitchButton & TouchableOpacityProps) => {
  const { theme } = useAppConfig();

  const translateX = useRef(
    new Animated.Value(props.isSelected ? 33 : 5)
  ).current;

  const backgroundColor = useRef(
    new Animated.Value(props.isSelected ? 1 : 0)
  ).current;

  useEffect(() => {
    // Animate the circle's position
    Animated.timing(translateX, {
      toValue: props.isSelected ? 33 : 5,
      duration: 150,
      useNativeDriver: true,
    }).start();

    // Animate the circle's background color
    Animated.timing(backgroundColor, {
      toValue: props.isSelected ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [props.isSelected]);

  // Interpolate the background color
  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme === "light" ? appColors.bg.light : appColors.bg.light,
      appColors.orange,
    ],
  });

  return (
    <ButtonWrapper
      hasBgColor
      onPress={props.onPress}
      style={[styles.btnStyle, props.style]}
    >
      <Animated.View
        style={[
          styles.circleStyle,
          {
            transform: [{ translateX }],
            backgroundColor: interpolatedColor,
          },
        ]}
      />
    </ButtonWrapper>
  );
};

export default SwitchButton;

const styles = StyleSheet.create({
  btnStyle: {
    width: 60,
    height: 33,
    borderRadius: 50,
  },
  circleStyle: {
    top: 5,
    width: 23,
    height: 23,
    borderRadius: 15,
    position: "absolute",
  },
});
