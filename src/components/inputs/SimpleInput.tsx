import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { appColors, appFonts, shadowStyle } from "../../utils";

const SimpleInput = (props: TextInputProps) => {
  const { t, i18n } = useTranslation();

  return (
    <TextInput
      value={props.value}
      editable={props.editable}
      maxLength={props.maxLength}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      style={[
        styles.style,
        {
          textAlign: i18n.language === "fa" ? "right" : "left",
          fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
        },
        props.style,
      ]}
      secureTextEntry={props.secureTextEntry}
      placeholder={t(props.placeholder ?? "enterSth")}
      placeholderTextColor={
        props.placeholderTextColor
          ? props.placeholderTextColor
          : appColors.darkGrey
      }
    />
  );
};

export default SimpleInput;

const styles = StyleSheet.create({
  style: {
    height: 45,
    fontSize: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: appColors.black,
    backgroundColor: appColors.white,
    ...shadowStyle,
  },
});
