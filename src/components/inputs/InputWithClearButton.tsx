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
import { RequiredText } from "../texts";
import SimpleInput from "./SimpleInput";

interface IInputWithClearButton {
  lbl: string;
  visible?: boolean;
  isRequired?: boolean;
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
        <RequiredText
          lbl={props.lbl}
          lblStyle={[props.lblStyle]}
          isRequired={props.isRequired}
        />
      ) : null}

      <View
        style={{
          ...styles.inputContainer,
          flexDirection: i18n.language === "fa" ? "row" : "row-reverse",
        }}
      >
        <SimpleInput
          value={props.value}
          editable={props.editable}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          style={[styles.inputStyle, props.style]}
          placeholderTextColor={props.placeholderTextColor}
        />

        {props.value && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              marginHorizontal: 5,
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
    </View>
  );
};

export default InputWithClearButton;

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: appColors.white,
  },
  inputStyle: {
    flex: 1,
    borderRadius: 0,
  },
});
