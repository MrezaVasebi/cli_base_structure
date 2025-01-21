import React from "react";
import { useTranslation } from "react-i18next";
import {
  OpaqueColorValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  type TouchableOpacityProps,
} from "react-native";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import AppIcon from "../others/AppIcon";
import { AppText } from "../texts";
import ButtonWrapper from "./ButtonWrapper";

interface IIconWithLabelButton {
  label: string;
  iconName: string;
  hasBgColor?: boolean;
  iconSize?: number | undefined;
  lblStyle?: StyleProp<TextStyle>;
  iconColor?: string | OpaqueColorValue;
}

const IconWithLabelButton = (
  props: IIconWithLabelButton & TouchableOpacityProps
) => {
  const { theme } = useAppConfig();
  const { i18n } = useTranslation();

  return (
    <ButtonWrapper
      onPress={props.onPress}
      disabled={props.disabled}
      hasBgColor={props.hasBgColor}
      style={[
        styles.rootStyle,
        {
          flexDirection: i18n.language === "fa" ? "row-reverse" : "row",
        },
        props.style,
      ]}
    >
      <AppText
        hasBgColor
        lbl={props.label}
        style={[
          {
            ...(i18n.language === "fa"
              ? { marginLeft: 10 }
              : { marginRight: 10 }),
          },
          props.lblStyle,
        ]}
      />

      <AppIcon
        name={props.iconName}
        size={props.iconSize}
        color={
          props.iconColor ?? theme === "light"
            ? appColors.bg.light
            : appColors.bg.light
        }
      />
    </ButtonWrapper>
  );
};

export default IconWithLabelButton;

const styles = StyleSheet.create({
  rootStyle: {
    height: 45,
    width: "50%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
