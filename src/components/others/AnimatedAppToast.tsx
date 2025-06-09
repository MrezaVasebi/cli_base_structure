import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { useAppConfig } from "../../context";
import { appColors, globalUi } from "../../utils";
import { AppText } from "../texts";

const AnimatedAppToast = () => {
  const { i18n } = useTranslation();
  const { toast, showToast } = useAppConfig();

  const opacity = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current; // Start position off-screen (above view)

  useEffect(() => {
    if (toast?.msg) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0, // Slide down to its position
          duration: 400,
          easing: Easing.out(Easing.quad), // Smooth easing for the slide-in
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: -100, // Slide back up off-screen
              duration: 400,
              easing: Easing.in(Easing.quad), // Smooth easing for the slide-out
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]).start(() =>
            showToast({
              msg: "",
              type: "error",
              duration: 3000,
            })
          );
        }, toast.duration ?? 2000);
      });
    }
  }, [toast?.msg]);

  const sideBgcolor = () => {
    if (toast?.type === "error") return appColors.toastColor.error;
    if (toast?.type === "success") return appColors.toastColor.success;
    return appColors.toastColor.info;
  };

  return (
    toast?.msg && (
      <Animated.View
        style={[
          styles.rootStyle,
          {
            opacity,
            backgroundColor: appColors.white,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View
          style={{
            ...styles.sideStyle,
            ...(i18n.language === "fa" ? { left: 0 } : { right: 0 }),
            backgroundColor: sideBgcolor(),
          }}
        />

        <AppText
          lbl={toast.msg ?? ""}
          style={[
            styles.lblStyle,
            {
              ...(i18n.language === "fa"
                ? { paddingLeft: 15 }
                : { paddingRight: 15 }),
            },
          ]}
        />
      </Animated.View>
    )
  );
};

export default AnimatedAppToast;

const styles = StyleSheet.create({
  rootStyle: {
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
    height: 50,
    borderRadius: 5,
    overflow: "hidden",
    position: "absolute",
    justifyContent: "center",
    ...globalUi.shadowStyle,
  },
  sideStyle: {
    width: 10,
    height: "100%",
    position: "absolute",
  },
  lblStyle: {
    color: appColors.black,
  },
});
