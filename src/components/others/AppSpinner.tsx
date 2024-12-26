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
            ? appColors.white
            : appColors.blue
          : theme === "light"
          ? appColors.blue
          : appColors.white
      }
      size={size}
    />
  );
};

export default AppSpinner;
