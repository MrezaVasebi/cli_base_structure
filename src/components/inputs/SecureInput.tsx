import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
} from "react-native";
import { useAppConfig } from "../../context";
import { appColors, iconsName } from "../../utils";
import { IconButton } from "../buttons";
import SimpleInput from "./SimpleInput";
import { AppText } from "../texts";
import { useFadeAnimation } from "../../hooks";

interface ISecureInput {
  lbl?: string;
  visible?: boolean;
  onPressEye: () => void;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewProps>;
}

const SecureInput = (props: ISecureInput & TextInputProps) => {
  const { theme } = useAppConfig();
  const { i18n } = useTranslation();
  const { fadeAnim } = useFadeAnimation(props.value);

  return (
    <View
      style={[
        {
          ...styles.rootStyle,
          backgroundColor: theme === "light" ? appColors.grey : appColors.dark,
        },
        props.rootStyle,
      ]}
    >
      {props.visible ? (
        <AppText lbl={props.lbl} style={[styles.lblStyle, props.lblStyle]} />
      ) : null}

      <SimpleInput
        value={props.value}
        style={props.style}
        editable={props.editable}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
      />

      {props.value && (
        <Animated.View
          style={{
            ...styles.iconStyle,
            ...(i18n.language === "fa" ? { left: 5 } : { right: 5 }),
            opacity: fadeAnim,
          }}
        >
          <IconButton
            onPress={props.onPressEye}
            iconColor={theme === "light" ? appColors.blue : appColors.grey}
            iconName={
              !props.secureTextEntry
                ? iconsName.eye
                : iconsName["eye-with-line"]
            }
          />
        </Animated.View>
      )}
    </View>
  );
};

export default SecureInput;

const styles = StyleSheet.create({
  rootStyle: {
    height: 45,
    borderRadius: 5,
  },
  iconStyle: {
    top: 7,
    position: "absolute",
  },
  lblStyle: {
    marginBottom: 5,
  },
});
