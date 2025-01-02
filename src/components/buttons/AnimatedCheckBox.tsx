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

interface IAnimatedCheckBox {
  lbl?: string;
  isChecked: boolean;
  lblStyle?: StyleProp<TextStyle>;
}

const AnimatedCheckBox = (props: TouchableOpacityProps & IAnimatedCheckBox) => {
  const { theme } = useAppConfig();

  const scaleValue = useRef(new Animated.Value(1)).current; // For scaling animation
  const fadeValue = useRef(new Animated.Value(0)).current; // For fading the checkmark

  useEffect(() => {
    if (props.isChecked) {
      // Scale animation
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Fade-in animation for the checkmark
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade-out animation for the checkmark
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [props.isChecked]);

  return (
    <ButtonWrapper
      onPress={props.onPress}
      style={[styles.rootStyle, props.style]}
    >
      <AppText lbl={props.lbl} style={props.lblStyle} />

      <Animated.View
        style={[
          styles.checkbox,
          {
            borderColor:
              theme === "light"
                ? appColors.btnBgColor.light
                : appColors.btnBgColor.dark,
          },
          props.isChecked && {
            backgroundColor:
              theme === "light"
                ? appColors.btnBgColor.light
                : appColors.btnBgColor.dark,
          },
          { transform: [{ scale: scaleValue }] },
        ]}
      >
        <Animated.Text style={[styles.checkmark, { opacity: fadeValue }]}>
          ✓
        </Animated.Text>
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
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    fontSize: 18,
    fontWeight: "bold",
    color: appColors.bg.light,
  },
});

export default AnimatedCheckBox;
