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

interface IPriceInput {
  lbl?: string;
  visible?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const PriceInput = (props: TextInputMaskProps & IPriceInput) => {
  const { i18n, t } = useTranslation();

  return (
    <View style={[props.rootStyle]}>
      {props.visible ? (
        <AppText
          lbl={"enterDesiredMoney"}
          style={[styles.lblStyle, props.lblStyle]}
        />
      ) : null}

      <View
        style={{
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          ...(i18n.language === "fa"
            ? { paddingRight: 10 }
            : { paddingLeft: 10 }),
          backgroundColor: appColors.white,
          ...shadowStyle,
        }}
      >
        <AppText
          lbl={"irr"}
          style={{
            color: appColors.black,
            position: "absolute",
            ...(i18n.language === "fa" ? { left: 10 } : { right: 10 }),
          }}
        />

        <TextInputMask
          type={"money"}
          value={props.value}
          keyboardType={"numeric"}
          editable={props.editable}
          maxLength={props.maxLength}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder ? props.placeholder : t("enterAmount")}
          style={[
            styles.inputStyle,
            {
              textAlign: i18n.language === "fa" ? "right" : "left",
              fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
            },
            props.style,
          ]}
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : appColors.darkGrey
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
    </View>
  );
};

export default PriceInput;

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    height: 45,
    fontSize: 13,
    color: appColors.black,
  },
  lblStyle: {
    marginBottom: 5,
  },
});
