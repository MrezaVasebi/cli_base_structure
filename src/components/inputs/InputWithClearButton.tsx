import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import SimpleInput from "./SimpleInput";
import { AppText } from "../texts";
import { IconButton } from "../buttons";
import { appColors, iconsName } from "../../utils";
import { useTranslation } from "react-i18next";
import { useAppConfig } from "../../context";
import { useFadeAnimation } from "../../hooks";

interface IInputWithClearButton {
  lbl: string;
  visible?: boolean;
  onPressClear: () => void;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const InputWithClearButton = (
  props: IInputWithClearButton & TextInputProps
) => {
  const { i18n } = useTranslation();
  const { theme } = useAppConfig();
  const { fadeAnim } = useFadeAnimation(props.value);

  return (
    <View style={props.rootStyle}>
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
        placeholderTextColor={props.placeholderTextColor}
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
            iconName={iconsName.close}
            onPress={props.onPressClear}
            iconColor={theme === "light" ? appColors.blue : appColors.grey}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default InputWithClearButton;

const styles = StyleSheet.create({
  lblStyle: {
    marginBottom: 5,
  },
  iconStyle: {
    top: 7,
    position: "absolute",
  },
});
