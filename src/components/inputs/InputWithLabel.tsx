import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { appColors } from "../../utils";
import { AppText } from "../texts";
import SimpleInput from "./SimpleInput";

interface IInputWithLabel {
  lbl: string;
  isRequired?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const InputWithLabel = (props: IInputWithLabel & TextInputProps) => {
  return (
    <View style={props.rootStyle}>
      <AppText lbl={props.lbl} style={[styles.lblStyle,{
        color: props.isRequired? appColors.isRequired:appColors.black
      }, props.lblStyle]} />

      <SimpleInput
        value={props.value}
        style={props.style}
        editable={props.editable}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        placeholderTextColor={props.placeholderTextColor}
      />
    </View>
  );
};

export default InputWithLabel;

const styles = StyleSheet.create({
  lblStyle: {
    marginBottom: 5,
  },
});
