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
import { appColors, iconsName } from "../../utils";
import { IconButton } from "../buttons";
import { RequiredText } from "../texts";
import SimpleInput from "./SimpleInput";

interface ISecureInput {
  lbl?: string;
  visible?: boolean;
  isRequired?: boolean;
  onPressEye: () => void;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const SecureInput = (props: ISecureInput & TextInputProps) => {
  const { i18n } = useTranslation();

  return (
    <View style={[props.rootStyle]}>
      {props.visible ? (
        <RequiredText
          lbl={props.lbl}
          lblStyle={props.lblStyle}
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
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          style={[styles.inputStyle, props.style]}
          secureTextEntry={props.secureTextEntry}
        />

        <Animated.View style={{ marginHorizontal: 5 }}>
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
      </View>
    </View>
  );
};

export default SecureInput;

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
