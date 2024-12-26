import React from "react";
import {
  OpaqueColorValue,
  StyleSheet,
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
  lblStyle?: object;
  iconStyle?: object;
  iconSize?: number | undefined;
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
      style={[
        styles.rootStyle,
        {
          backgroundColor: theme === "light" ? appColors.white : appColors.blue,
        },
        props.style,
      ]}
    >
      <AppText
        lbl={props.label}
        style={{
          ...styles.lblStyle,
          color: theme === "light" ? appColors.blue : appColors.white,
          ...props.lblStyle,
        }}
      />

      <AppIcon
        name={props.iconName}
        size={props.iconSize}
        color={
          props.iconColor ?? theme === "light"
            ? appColors.blue
            : appColors.white
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
    backgroundColor: appColors.blue,
  },
  lblStyle: {
    marginLeft: 10,
  },
});
