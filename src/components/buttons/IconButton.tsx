import { TouchableOpacityProps } from "react-native";

import React from "react";
import { ButtonWrapper } from ".";
import AppIcon from "../others/AppIcon";

interface IIconButton {
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
}

const IconButton = (props: TouchableOpacityProps & IIconButton) => {
  return (
    <ButtonWrapper style={[props.style]} onPress={props.onPress}>
      <AppIcon
        name={props.iconName}
        size={props.iconSize}
        color={props.iconColor}
      />
    </ButtonWrapper>
  );
};

export default IconButton;
