import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import { shadowStyle } from "../../utils/constants";
import { AppText } from "../texts";

export type ToastType = "error" | "success" | "info";

interface IAppToast {
  message: string;
  visible: boolean;
  type?: ToastType;
}

const AppToast = (props: IAppToast) => {
  const { theme } = useAppConfig();
  const { i18n } = useTranslation();

  const { message, visible, type = "error" } = props;
  const [showToast, setShowToast] = useState(visible);

  const opacity = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current; // Start position off-screen (above view)

  useEffect(() => {
    if (visible) {
      setShowToast(true);
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
          ]).start(() => setShowToast(false));
        }, 2000);
      });
    }
  }, [visible]);

  if (!showToast) return null;

  const sideBgcolor = () => {
    if (type === "error") return appColors.toastColor.error;
    if (type === "success") return appColors.toastColor.success;
    return appColors.toastColor.info;
  };

  return (
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
          ...(i18n.language === "fa" ? { right: 0 } : { left: 0 }),
          backgroundColor: sideBgcolor(),
        }}
      />

      <AppText
        lbl={message ?? ""}
        style={[
          styles.lblStyle,
          {
            ...(i18n.language === "fa"
              ? { paddingRight: 13 }
              : { paddingLeft: 13 }),
          },
        ]}
      />
    </Animated.View>
  );
};

export default AppToast;

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
    ...shadowStyle,
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
