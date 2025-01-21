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
import { appColors, iconsName } from "../../utils";
import { IconButton } from "../buttons";
import AppIcon from "../others/AppIcon";
import { AppText } from "../texts";
import SimpleInput from "./SimpleInput";

interface ISearchInput {
  lbl: string;
  visible?: boolean;
  onPressClear: () => void;
  lblStyle?: StyleProp<TextStyle>;
  rootStyle?: StyleProp<ViewStyle>;
}

const SearchInput = (props: ISearchInput & TextInputProps) => {
  const { i18n } = useTranslation();
  const language = i18n.language === "fa";
  const { fadeAnim } = useFadeAnimation(props.value);

  return (
    <View style={props.rootStyle}>
      {props.visible ? (
        <AppText lbl={props.lbl} style={[styles.lblStyle, props.lblStyle]} />
      ) : null}

      <View
        style={{
          position: "absolute",
          bottom: 12,
          ...(language ? { left: 5 } : { right: 5 }),
          zIndex: 1,
        }}
      >
        <AppIcon name={iconsName.search} color={appColors.darkGrey} />
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

      {props.value && (
        <Animated.View
          style={{
            ...styles.iconStyle,
            ...(i18n.language === "fa" ? { left: 5 } : { right: 5 }),
            opacity: fadeAnim,
          }}
        >
          <IconButton
            iconName={iconsName.close}
            onPress={props.onPressClear}
            iconColor={appColors.black}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  lblStyle: {
    marginBottom: 5,
  },
  iconStyle: {
    bottom: 7,
    position: "absolute",
  },
  inputStyle: {
    paddingHorizontal: 30,
  },
});
