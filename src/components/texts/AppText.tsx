import { ColorValue, StyleSheet, Text, TextProps } from "react-native";
import { appColors, appFonts } from "../../utils";

import React from "react";
import { useTranslation } from "react-i18next";
import { useAppConfig } from "../../context";

interface IAppText {
  lbl?: string;
  color?: ColorValue;
  hasBgColor?: boolean;
}

const AppText = (props: IAppText & TextProps) => {
  const { theme } = useAppConfig();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <Text
      style={[
        styles.rootStyle,
        {
          color: props.color
            ? props.color
            : !props.hasBgColor
            ? theme === "light"
              ? appColors.txtColor.dark
              : appColors.txtColor.light
            : theme === "light"
            ? appColors.txtColor.light
            : appColors.txtColor.light,

          fontFamily: lang === "fa" ? appFonts.fa : appFonts.en,
          textAlign: lang === "fa" ? "right" : "justify",
        },
        props.style,
      ]}
      ellipsizeMode={props.lineBreakMode}
      numberOfLines={props.numberOfLines}
    >
      {t(props.lbl ? props.lbl : "")}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  rootStyle: {
    fontSize: 13,
  },
});
