import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { appColors, appFonts } from "../../utils";
import ButtonWrapper from "./ButtonWrapper.tsx";

interface IButtonOfTab {
  tabName: string;
  mainLbl: string;
  onPress: () => void;
  rightLabel?: string;
  centerLabel?: string;
  tabCounter: "Two" | "Three";
  style?: StyleProp<ViewStyle>;
}

interface ICalcAnimation {
  bgColor: Animated.AnimatedInterpolation<string | number>;
  txtColor: Animated.AnimatedInterpolation<string | number>;
}

const ButtonOfTab = (props: IButtonOfTab) => {
  const { t, i18n } = useTranslation();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (props.tabCounter === "Two") {
      Animated.timing(animatedValue, {
        toValue: props.tabName === props.mainLbl ? 1 : 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue:
          props.tabName === props.mainLbl
            ? 2
            : props.tabName === props.centerLabel
            ? 1
            : 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [props.tabName]);

  const calcAnimation = (): ICalcAnimation => {
    let bgColor, txtColor;

    if (props.tabCounter === "Two") {
      bgColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange:
          props.mainLbl === props.rightLabel
            ? [appColors.blue, appColors.white]
            : [appColors.white, appColors.blue],
      });

      txtColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange:
          props.mainLbl === props.rightLabel
            ? [appColors.white, appColors.blue]
            : [appColors.blue, appColors.white],
      });
    } else {
      bgColor = animatedValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange:
          props.mainLbl === props.rightLabel
            ? [appColors.blue, appColors.white, appColors.white]
            : props.mainLbl === props.centerLabel
            ? [appColors.white, appColors.blue, appColors.white]
            : [appColors.white, appColors.white, appColors.blue],
      });

      txtColor = animatedValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange:
          props.mainLbl === props.rightLabel
            ? [appColors.white, appColors.blue, appColors.blue]
            : props.mainLbl === props.centerLabel
            ? [appColors.blue, appColors.white, appColors.blue]
            : [appColors.blue, appColors.blue, appColors.white],
      });
    }

    return {
      bgColor,
      txtColor,
    };
  };

  return (
    <Animated.View
      style={[
        styles.tabStyle,
        {
          backgroundColor: calcAnimation().bgColor,
          width: props.tabCounter === "Two" ? "49%" : "32.5%",
        },
        props.style,
      ]}
    >
      <ButtonWrapper onPress={props.onPress}>
        <Animated.Text
          style={{
            color: calcAnimation().txtColor,
            fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
          }}
        >
          {t(props.mainLbl)}
        </Animated.Text>
      </ButtonWrapper>
    </Animated.View>
  );
};

export default ButtonOfTab;

const styles = StyleSheet.create({
  tabStyle: {
    height: "100%",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: appColors.black,
  },
});
