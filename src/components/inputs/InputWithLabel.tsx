import React from "react";
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { RequiredText } from "../texts";
import SimpleInput from "./SimpleInput";

interface IInputWithLabel {
  lbl: string;
  visible?: boolean;
  isRequired?: boolean;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const InputWithLabel = (props: IInputWithLabel & TextInputProps) => {
  return (
    <View style={props.rootStyle}>
      {props.visible && (
        <RequiredText
          lbl={props.lbl}
          lblStyle={props.lblStyle}
          isRequired={props.isRequired}
        />
      )}

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
