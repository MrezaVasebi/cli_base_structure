import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  BackHandler,
  Modal,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import { IconButton } from "../buttons";
import { AppText } from "../texts";

interface IAnimatedRootModal {
  title?: string;
  visible: boolean;
  closeModal: () => void;
  showCloseBtn?: boolean;
  animation: Animated.Value;
  titleStyle?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
}

const AnimatedRootModal = (props: IAnimatedRootModal & ViewProps) => {
  const { theme } = useAppConfig();
  const { i18n } = useTranslation();
  const appLanguage = i18n.language;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove(); // Clean up listener on component unmount
  }, [props.visible]);

  const handleBackPress = () => {
    if (props.visible) {
      props.closeModal(); // Close the modal
      return true; // Prevent default back action
    }
    return false; // Allow default back action
  };

  const animatedStyle = {
    opacity: props.animation,
    transform: [
      {
        translateY: props.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0], // Slide from below
        }),
      },
    ],
  };

  if (!props.visible) return null;

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={props.visible}
      statusBarTranslucent={true}
      onRequestClose={props.closeModal} // Close modal when hardware back is pressed
    >
      <Animated.View
        style={[
          styles.rootStyle,
          {
            backgroundColor:
              theme === "light"
                ? appColors.modalLightBgColor
                : appColors.modalDarkBgColor,
          },
          animatedStyle,
          props.style,
        ]}
      >
        <View
          style={[
            styles.innerStyle,
            {
              backgroundColor:
                theme === "light" ? appColors.bg.light : appColors.bg.dark,
            },
            props.innerStyle,
          ]}
        >
          <View
            style={{
              ...styles.headerContainer,
              flexDirection: appLanguage === "fa" ? "row" : "row-reverse",
            }}
          >
            {props.showCloseBtn ? (
              <IconButton
                iconSize={25}
                iconName="close"
                onPress={props.closeModal}
              />
            ) : null}

            <AppText
              lbl={props.title ?? ""}
              style={[{ flex: 1 }, props.titleStyle]}
            />
          </View>

          {props.children}
        </View>
      </Animated.View>
    </Modal>
  );
};

export default AnimatedRootModal;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    justifyContent: "flex-end",
  },
  innerStyle: {
    width: "100%",
    height: "80%",
    overflow: "hidden",
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
