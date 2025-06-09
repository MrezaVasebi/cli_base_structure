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
import { AppText, RequiredText } from "../texts";

interface IPriceInput {
  lbl?: string;
  visible?: boolean;
  isRequired?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
  inputContainer?: StyleProp<ViewStyle>;
}

const PriceInput = (props: TextInputMaskProps & IPriceInput) => {
  const { i18n, t } = useTranslation();
  const language = i18n.language === "fa";

  return (
    <View style={[props.rootStyle]}>
      {props.visible ? (
        <RequiredText
          lblStyle={props.lblStyle}
          isRequired={props.isRequired}
          lbl={props.lbl ?? "enterDesiredMoney"}
        />
      ) : null}

      <View
        style={[
          styles.inputContainer,
          { ...(language ? { paddingLeft: 5 } : { paddingRight: 5 }) },
          props.inputContainer,
        ]}
      >
        <AppText
          lbl={"irr"}
          style={{
            color: appColors.black,
            position: "absolute",
            ...(language ? { right: 10 } : { left: 10 }),
          }}
        />

        <TextInputMask
          type={"money"}
          value={props.value}
          keyboardType={"numeric"}
          editable={props.editable}
          maxLength={props.maxLength}
          onChangeText={props.onChangeText}
          placeholder={
            props.placeholder ? t(props.placeholder) : t("enterAmount")
          }
          style={[
            styles.inputStyle,
            {
              textAlign: language ? "right" : "left",
              fontFamily: language ? appFonts.fa : appFonts.en,
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
  inputContainer: {
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: appColors.white,
    ...globalUi.shadowStyle,
  },
  inputStyle: {
    flex: 1,
    height: 45,
    fontSize: 13,
    color: appColors.black,
  },
});
