import React from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useFadeAnimation } from "../../hooks";
import { appColors, icons } from "../../utils";
import { IconButton } from "../buttons";
import { AppText } from "../texts";
import SimpleInput from "./SimpleInput";

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
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        placeholderTextColor={props.placeholderTextColor}
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
            iconName={icons.close}
            onPress={props.onPressClear}
            iconColor={appColors.black}
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
    bottom: 7,
    position: "absolute",
  },
});
