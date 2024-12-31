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

interface ICreditCardInput {
  visible?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const CreditCardInput = (props: TextInputMaskProps & ICreditCardInput) => {
  const { i18n } = useTranslation();
  const { theme } = useAppConfig();
  return (
    <View style={[props.rootStyle]}>
      {props.visible ? (
        <AppText
          lbl={"enterCreditCardNumber"}
          style={[styles.lblStyle, props.lblStyle]}
        />
      ) : null}

      <TextInputMask
        maxLength={19}
        value={props.value}
        type={"credit-card"}
        keyboardType="numeric"
        onChangeText={props.onChangeText}
        placeholder="0000 0000 0000 0000"
        placeholderTextColor={
          props.placeholderTextColor
            ? props.placeholderTextColor
            : theme === "light"
            ? appColors.darkGrey
            : appColors.grey
        }
        style={[
          styles.inputStyle,
          {
            textAlign: "center",
            color: theme === "light" ? appColors.blue : appColors.grey,
            fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
            backgroundColor:
              theme === "light" ? appColors.grey : appColors.blue,
          },
          props.style,
        ]}
      />
    </View>
  );
};

export default CreditCardInput;

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    fontSize: 13,
    borderRadius: 5,
    textAlign: "center",
  },
  lblStyle: {
    marginBottom: 5,
  },
});
