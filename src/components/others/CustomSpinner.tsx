import React from "react";
import { CircleFade, Grid, Wave } from "react-native-animated-spinkit";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";

type AnimationSpinnerType = "wave" | "circleFade" | "grid";

interface IAppSpinner {
  size?: number;
  color?: string;
  hasBgColor?: boolean;

  animationType?: AnimationSpinnerType;
}

const CustomSpinner = (props: IAppSpinner) => {
  let { color, size } = props;
  const { theme } = useAppConfig();

  const Compo =
    props.animationType === "circleFade"
      ? CircleFade
      : props.animationType === "grid"
      ? Grid
      : Wave;

  return (
    <Compo
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
      size={size ?? 25}
    />
  );
};

export default CustomSpinner;
