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
import { appColors, appFonts, shadowStyle } from "../../utils";
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
            : appColors.darkGrey
        }
        style={[
          styles.inputStyle,
          { fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en },
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
    fontSize: 15,
    borderRadius: 5,
    textAlign: "center",
    color: appColors.black,
    backgroundColor: appColors.white,
    ...shadowStyle,
  },
  lblStyle: {
    marginBottom: 5,
  },
});
