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
import { appColors, appFonts, globalUi } from "../../utils";
import { RequiredText } from "../texts";

interface ICreditCardInput {
  visible?: boolean;
  isRequired?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const CreditCardInput = (props: TextInputMaskProps & ICreditCardInput) => {
  const { i18n } = useTranslation();

  return (
    <View style={[props.rootStyle]}>
      {props.visible ? (
        <RequiredText
          lblStyle={[props.lblStyle]}
          isRequired={props.isRequired}
          lbl={"enterCreditCardNumber"}
        />
      ) : null}

      <TextInputMask
        maxLength={19}
        type={"custom"}
        options={{
          mask: "9999-9999-9999-9999",
        }}
        value={props.value}
        keyboardType="numeric"
        onChangeText={props.onChangeText}
        placeholder="0000-0000-0000-0000"
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
    ...globalUi.shadowStyle,
  },
});
