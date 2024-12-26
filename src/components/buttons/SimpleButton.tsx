import { StyleSheet, TouchableOpacityProps } from "react-native";

import React from "react";
import { AppText } from "../texts";
import ButtonWrapper from "./ButtonWrapper";

interface ISimpleButton {
  lbl: string;
  lblStyle?: object;
}

const SimpleButton = (props: TouchableOpacityProps & ISimpleButton) => {
  return (
    <ButtonWrapper
      hasBgColor={true}
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.btnStyle, props.style]}
    >
      <AppText
        hasBgColor={true}
        lbl={props.lbl ?? ""}
        style={[props.lblStyle]}
      />
    </ButtonWrapper>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  btnStyle: {
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
