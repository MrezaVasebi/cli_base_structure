import React from "react";
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
  iconStyle?: object;
  hasBgColor?: boolean;
  iconSize?: number | undefined;
  lblStyle?: StyleProp<TextStyle>;
  iconColor?: string | OpaqueColorValue;
}

const IconWithLabelButton = (
  props: IIconWithLabelButton & TouchableOpacityProps
) => {
  const { theme } = useAppConfig();

  return (
    <ButtonWrapper
      onPress={props.onPress}
      disabled={props.disabled}
      hasBgColor={props.hasBgColor}
      style={[styles.rootStyle, props.style]}
    >
      <AppText
        hasBgColor
        lbl={props.label}
        style={[styles.lblStyle, props.lblStyle]}
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
    flexDirection: "row-reverse",
  },
  lblStyle: {
    marginLeft: 10,
  },
});
