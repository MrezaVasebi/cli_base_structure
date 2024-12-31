import { ActivityIndicator, ColorValue } from "react-native";

import React from "react";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";

interface IAppSpinner {
  color?: ColorValue;
  hasBgColor?: boolean;
  size?: "small" | "large" | number;
}

const AppSpinner = (props: IAppSpinner) => {
  let { color, size } = props;
  const { theme } = useAppConfig();

  return (
    <ActivityIndicator
      animating={true}
      color={
        color
          ? color
          : !props.hasBgColor
          ? theme === "light"
            ? appColors.bg.dark
            : appColors.bg.light
          : theme === "light"
          ? appColors.bg.light
          : appColors.bg.light
      }
      size={size}
    />
  );
};

export default AppSpinner;
