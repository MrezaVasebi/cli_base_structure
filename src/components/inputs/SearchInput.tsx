import React from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useFadeAnimation } from "../../hooks";
import { appColors, icons } from "../../utils";
import { IconButton } from "../buttons";
import AppIcon from "../others/AppIcon";
import { AppText } from "../texts";
import SimpleInput from "./SimpleInput";

interface ISearchInput {
  lbl?: string;
  visible?: boolean;
  iconColor?: string;
  onPressClear: () => void;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
}

const SearchInput = (props: ISearchInput & TextInputProps) => {
  const { i18n } = useTranslation();
  const { fadeAnim } = useFadeAnimation(props.value);

  return (
    <View style={[styles.rootStyle, props.rootStyle]}>
      {props.visible ? (
        <AppText lbl={props.lbl} style={[styles.lblStyle, props.lblStyle]} />
      ) : null}

      <View
        style={[
          styles.inputView,
          { flexDirection: i18n.language === "fa" ? "row" : "row-reverse" },
          props.innerStyle,
        ]}
      >
        <View style={{ ...styles.iconStyle }}>
          <AppIcon
            name={icons.search}
            color={props.iconColor ?? appColors.darkGrey}
          />
        </View>

        <SimpleInput
          value={props.value}
          editable={props.editable}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          style={[styles.inputStyle, props.style]}
          placeholderTextColor={props.placeholderTextColor}
        />

        <Animated.View
          style={{
            ...styles.iconStyle,
            opacity: fadeAnim,
            ...(i18n.language === "fa" ? { right: 2 } : { left: 2 }),
            position: "absolute",
          }}
        >
          <IconButton
            iconName={icons.close}
            onPress={props.onPressClear}
            iconColor={props.iconColor ?? appColors.black}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  rootStyle: {
    height: 75,
  },
  lblStyle: {
    marginVertical: 5,
  },
  iconStyle: {
    width: 30,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    flex: 1,
    height: 55,
    borderRadius: 5,
    backgroundColor: appColors.white,
  },
  inputStyle: {
    flex: 1,
    height: "100%",
  },
});
