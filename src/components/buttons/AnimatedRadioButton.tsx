import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";

import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import { AppText } from "../texts";
import ButtonWrapper from "./ButtonWrapper";

interface IAnimatedRadioButton {
  lbl?: string;
  isSelected: boolean;
  lblStyle?: StyleProp<TextStyle>;
}

const AnimatedRadioButton = (
  props: TouchableOpacityProps & IAnimatedRadioButton
) => {
  const { theme } = useAppConfig();

  const outerScale = useRef(new Animated.Value(1)).current; // Outer circle bounce
  const innerScale = useRef(
    new Animated.Value(props.isSelected ? 1 : 0)
  ).current; // Inner circle scale

  // Effect to handle selection
  useEffect(() => {
    if (props.isSelected) {
      // Bounce outer circle and scale inner circle up
      Animated.sequence([
        Animated.timing(outerScale, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(outerScale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(innerScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      // Scale inner circle down
      Animated.timing(innerScale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [props.isSelected]);

  return (
    <ButtonWrapper
      onPress={props.onPress}
      style={[styles.rootStyle, props.style]}
    >
      <AppText lbl={props.lbl} style={props.lblStyle} />

      <Animated.View
        style={[
          styles.radioOuterCircle,
          {
            transform: [{ scale: outerScale }],
            borderColor:
              theme === "light"
                ? appColors.btnBgColor.light
                : appColors.btnBgColor.dark,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.radioInnerCircle,
            {
              transform: [{ scale: innerScale }],
              backgroundColor:
                theme === "light"
                  ? appColors.btnBgColor.light
                  : appColors.btnBgColor.dark,
            },
          ]}
        />
      </Animated.View>
    </ButtonWrapper>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
  },
  radioOuterCircle: {
    width: 28,
    height: 28,
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInnerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});

export default AnimatedRadioButton;
