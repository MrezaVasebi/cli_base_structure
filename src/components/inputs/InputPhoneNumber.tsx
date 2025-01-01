import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import {
  TextInputMask,
  type TextInputMaskProps,
} from "react-native-masked-text";
import { appColors, appFonts, shadowStyle } from "../../utils";
import { AppText } from "../texts";

interface IInputPhoneNumber {
  visible?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const InputPhoneNumber = (props: TextInputMaskProps & IInputPhoneNumber) => {
  const { i18n } = useTranslation();

  return (
    <View style={[props.rootStyle]}>
      {props.visible ? (
        <AppText
          lbl={"enterPhoneNumber"}
          style={[styles.lblStyle, props.lblStyle]}
        />
      ) : null}

      <TextInputMask
        maxLength={13}
        type={"custom"}
        value={props.value}
        options={{
          mask: "9999 999 9999",
        }}
        keyboardType="numeric"
        placeholder="0000 000 0000"
        onChangeText={props.onChangeText}
        placeholderTextColor={
          props.placeholderTextColor
            ? props.placeholderTextColor
            : appColors.darkGrey
        }
        style={[
          styles.inputStyle,
          {
            textAlign: i18n.language === "fa" ? "right" : "left",
            fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
          },
          props.style,
        ]}
      />
    </View>
  );
};

export default InputPhoneNumber;

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    fontSize: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: appColors.black,
    backgroundColor: appColors.white,
    ...shadowStyle,
  },
  lblStyle: {
    marginBottom: 5,
  },
});
