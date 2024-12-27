import { StyleSheet, TouchableOpacityProps } from "react-native";

import React from "react";
import { ButtonWrapper } from ".";
import AppIcon from "../others/AppIcon";

interface IIconButton {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
}

const IconButton = (props: TouchableOpacityProps & IIconButton) => {
  return (
    <ButtonWrapper
      onPress={props.onPress}
      style={[styles.rootStyle, props.style]}
    >
      <AppIcon
        name={props.iconName}
        size={props.iconSize}
        color={props.iconColor}
      />
    </ButtonWrapper>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  rootStyle: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
