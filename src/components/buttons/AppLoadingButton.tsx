import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  type TouchableOpacityProps,
} from "react-native";
import { CustomSpinner } from "../others";
import { AppText } from "../texts";
import ButtonWrapper from "./ButtonWrapper";

interface IAppLoadingButton {
  label: string;
  loading: boolean;
  spinnerSize?: number;
  spinnerColor?: string;
  lblStyle?: StyleProp<TextStyle>;
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
        <CustomSpinner
          hasBgColor={true}
          size={props.spinnerSize}
          animationType="circleFade"
          color={props.spinnerColor}
        />
      ) : (
        <AppText
          hasBgColor
          lbl={props.label}
          style={[styles.lblStyle, props.lblStyle]}
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
