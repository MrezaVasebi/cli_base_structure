import React from "react";
import {
  ColorValue,
  StyleSheet,
  type TouchableOpacityProps,
} from "react-native";
import { AppSpinner } from "../others";
import { AppText } from "../texts";
import ButtonWrapper from "./ButtonWrapper";

interface IAppLoadingButton {
  label: string;
  loading: boolean;
  lblStyle?: object;
  spinnerColor?: ColorValue;
  spinnerSize?: number | "small" | "large";
}

const AppLoadingButton = (props: IAppLoadingButton & TouchableOpacityProps) => {
  return (
    <ButtonWrapper
      hasBgColor
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.btnStyle, props.style]}
    >
      {props.loading ? (
        <AppSpinner
          hasBgColor={true}
          color={props.spinnerColor}
          size={props.spinnerSize}
        />
      ) : (
        <AppText
          hasBgColor
          lbl={props.label}
          style={{ ...styles.lblStyle, ...props.lblStyle }}
        />
      )}
    </ButtonWrapper>
  );
};

export default AppLoadingButton;

const styles = StyleSheet.create({
  btnStyle: {
    height: 45,
    width: "50%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  lblStyle: {},
});
