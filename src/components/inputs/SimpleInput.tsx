import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { useAppConfig } from "../../context";
import { appColors, appFonts } from "../../utils";

const SimpleInput = (props: TextInputProps) => {
  const { theme } = useAppConfig();
  const { t, i18n } = useTranslation();

  return (
    <TextInput
      value={props.value}
      editable={props.editable}
      maxLength={props.maxLength}
      onChangeText={props.onChangeText}
      style={[
        styles.style,
        {
          textAlign: i18n.language === "fa" ? "right" : "left",
          color: theme === "light" ? appColors.blue : appColors.grey,
          fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
          backgroundColor: theme === "light" ? appColors.grey : appColors.blue,
        },
        props.style,
      ]}
      secureTextEntry={props.secureTextEntry}
      placeholder={t(props.placeholder ?? "enterSth")}
      placeholderTextColor={
        props.placeholderTextColor
          ? props.placeholderTextColor
          : theme === "light"
          ? appColors.darkGrey
          : appColors.grey
      }
    />
  );
};

export default SimpleInput;

const styles = StyleSheet.create({
  style: {
    height: 45,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
