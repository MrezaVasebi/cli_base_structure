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
import { useAppConfig } from "../../context";
import { appColors, appFonts } from "../../utils";
import { AppText } from "../texts";

interface IPriceInput {
  lbl?: string;
  visible?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const PriceInput = (props: TextInputMaskProps & IPriceInput) => {
  const { theme } = useAppConfig();
  const { i18n, t } = useTranslation();

  return (
    <View style={[props.rootStyle]}>
      {props.visible ? (
        <AppText
          lbl={"enterDesiredMoney"}
          style={[styles.lblStyle, props.lblStyle]}
        />
      ) : null}

      <TextInputMask
        type={"money"}
        value={props.value}
        keyboardType={"numeric"}
        editable={props.editable}
        maxLength={props.maxLength}
        autoFocus={props.autoFocus}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder ? props.placeholder : t("enterAmount")}
        style={[
          styles.inputStyle,
          {
            textAlign: i18n.language === "fa" ? "right" : "left",
            color: theme === "light" ? appColors.blue : appColors.grey,
            fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
            backgroundColor:
              theme === "light" ? appColors.grey : appColors.blue,
          },
          props.style,
        ]}
        placeholderTextColor={
          props.placeholderTextColor
            ? props.placeholderTextColor
            : theme === "light"
            ? appColors.darkGrey
            : appColors.grey
        }
        options={{
          unit: "",
          precision: 0,
          separator: ",",
          delimiter: ",",
          suffixUnit: "",
        }}
      />
    </View>
  );
};

export default PriceInput;

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    fontSize: 13,
    borderRadius: 5,
  },
  lblStyle: {
    marginBottom: 5,
  },
});
