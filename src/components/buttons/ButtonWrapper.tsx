import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import React from "react";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";

interface IButtonWrapper {
  hasBgColor?: boolean;
}

const ButtonWrapper = (props: TouchableOpacityProps & IButtonWrapper) => {
  const { theme } = useAppConfig();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        {
          backgroundColor: !props.hasBgColor
            ? appColors.transparent
            : theme === "light"
            ? appColors.white
            : appColors.blue,
        },
        props.style,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default ButtonWrapper;
