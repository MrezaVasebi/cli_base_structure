import React from "react";
import { useTranslation } from "react-i18next";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";
import { useAppConfig } from "../../context";
import { appColors, appFonts } from "../../utils";
import { AppText } from "../texts";

interface IIbanInput {
  visible?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const IbanInput = (props: TextInputMaskProps & IIbanInput) => {
  const { theme } = useAppConfig();
  const { i18n } = useTranslation();

  return (
    <View style={[styles.rootStyle, props.rootStyle]}>
      {props.visible ? (
        <AppText
          lbl={"enterIbanNumber"}
          style={[styles.lblStyle, props.lblStyle]}
        />
      ) : null}

      <View
        style={[
          styles.ibanContainer,
          {
            backgroundColor:
              theme === "light" ? appColors.grey : appColors.blue,
          },
        ]}
      >
        <AppText
          lbl="IR"
          style={{
            fontSize: 15,
            color: theme === "light" ? appColors.blue : appColors.grey,
          }}
        />

        <TextInputMask
          type={"custom"}
          options={{
            mask: "99 9999 9999 9999 9999 9999 99",
          }}
          maxLength={35}
          value={props.value}
          keyboardType="numeric"
          style={{
            ...styles.ibanStyle,
            ...{
              textAlign: "center",
              color: theme === "light" ? appColors.blue : appColors.grey,
              fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
              backgroundColor: appColors.transparent,
            },
          }}
          onChangeText={props.onChangeText}
          placeholder="00 0000 0000 0000 0000 0000 00"
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : theme === "light"
              ? appColors.darkGrey
              : appColors.grey
          }
        />
      </View>
    </View>
  );
};

export default IbanInput;

const styles = StyleSheet.create({
  rootStyle: {},
  ibanContainer: {
    height: 45,
    borderRadius: 5,
    paddingLeft: 10,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lblStyle: {
    marginBottom: 5,
  },
  ibanStyle: {
    flex: 1,
    fontSize: 13,
    textAlign: "center",
    color: appColors.dark,
    backgroundColor: appColors.white,
  },
});
