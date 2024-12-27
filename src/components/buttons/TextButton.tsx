import React from "react";
import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";
import { AppText } from "../texts";
import ButtonWrapper from "./ButtonWrapper";

interface ITextButton {
  lbl: string;
  lblStyle?: StyleProp<TextStyle>;
}

const TextButton = (props: ITextButton & TouchableOpacityProps) => {
  return (
    <ButtonWrapper {...props}>
      <AppText lbl={props.lbl} style={props.lblStyle} />
    </ButtonWrapper>
  );
};

export default TextButton;
