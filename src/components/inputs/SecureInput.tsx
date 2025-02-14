import React from "react";
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
import { useFadeAnimation } from "../../hooks";
import { appColors, iconsName } from "../../utils";
import { IconButton } from "../buttons";
import { AppText } from "../texts";
import SimpleInput from "./SimpleInput";

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
    <View style={[props.rootStyle]}>
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
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
      />

      {props.value && (
        <Animated.View
          style={{
            ...styles.iconStyle,
            ...(i18n.language === "fa" ? { right: 5 } : { left: 5 }),
            opacity: fadeAnim,
          }}
        >
          <IconButton
            onPress={props.onPressEye}
            iconColor={appColors.black}
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
  iconStyle: {
    top: 7,
    position: "absolute",
  },
  lblStyle: {
    marginBottom: 5,
  },
});
