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
import { appColors, appFonts, globalUi } from "../../utils";
import { AppText, RequiredText } from "../texts";

interface IIbanInput {
  visible?: boolean;
  isRequired?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const IbanInput = (props: TextInputMaskProps & IIbanInput) => {
  const { theme } = useAppConfig();
  const { i18n } = useTranslation();

  return (
    <View style={[styles.rootStyle, props.rootStyle]}>
      {props.visible ? (
        <RequiredText
          lbl={"enterIbanNumber"}
          lblStyle={[props.lblStyle]}
          isRequired={props.isRequired}
        />
      ) : null}

      <View style={[styles.ibanContainer]}>
        <AppText
          lbl="IR"
          style={{ ...styles.unitStyle, position: "absolute", right: 5 }}
        />

        <TextInputMask
          type={"custom"}
          options={{
            mask: "99-9999-9999-9999-9999-9999-99",
          }}
          maxLength={35}
          value={props.value}
          keyboardType="numeric"
          style={{
            ...styles.ibanStyle,
            ...{
              fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
            },
          }}
          onChangeText={props.onChangeText}
          placeholder="00-0000-0000-0000-0000-0000-00"
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : appColors.darkGrey
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
    backgroundColor: appColors.white,
    ...globalUi.shadowStyle,
  },
  unitStyle: {
    fontSize: 15,
    color: appColors.black,
  },
  ibanStyle: {
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    color: appColors.black,
  },
});
