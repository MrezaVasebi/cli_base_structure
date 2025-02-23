import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewProps,
} from "react-native";
import { appFonts } from "../../utils";
import { appColors } from "../../utils/appColors";

interface IPinInput {
  length: number; // Number of digits in the PIN
  secureTextEntry?: boolean;
  onComplete: (pin: string) => void; // Callback when PIN is fully entered
  inputStyle?: StyleProp<TextStyle>; // Style for individual input boxes
}

const PinInput = (props: IPinInput & ViewProps) => {
  const { t, i18n } = useTranslation();
  const { length = 4, onComplete, inputStyle, secureTextEntry } = props;

  const inputs = useRef<Array<TextInput | null>>([]); // Refs for each TextInput
  const [pin, setPin] = useState<string[]>(Array(length).fill("")); // State to store PIN digits

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;

    // Update the state
    setPin(newPin);

    // Move focus to the next input
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Call onComplete if PIN is fully entered
    if (newPin.join("").length === length) {
      onComplete(newPin.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && pin[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus(); // Move focus to the previous input
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            maxLength={1}
            value={pin[index]}
            keyboardType="numeric"
            // autoFocus={index === 0} // Autofocus on the first input
            secureTextEntry={secureTextEntry}
            style={[
              styles.input,
              {
                fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
              },
              inputStyle,
            ]}
            ref={(ref) => (inputs.current[index] = ref)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
  },
  input: {
    width: 45,
    height: 45,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    color: appColors.black,
    backgroundColor: appColors.white,
  },
});

export default PinInput;
