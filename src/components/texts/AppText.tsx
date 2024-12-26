import { StyleSheet, Text, TextProps } from "react-native";
import { appColors, appFonts } from "../../utils";

import React from "react";
import { useTranslation } from "react-i18next";
import { useAppConfig } from "../../context";

interface IAppText {
  lbl?: string;
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
          color: !props.hasBgColor
            ? theme === "light"
              ? appColors.white
              : appColors.dark
            : theme === "light"
            ? appColors.blue
            : appColors.white,
          fontFamily: lang === "fa" ? appFonts.fa : appFonts.en,
          textAlign: lang === "fa" ? "right" : "justify",
        },
        props.style,
      ]}
      ellipsizeMode={props.lineBreakMode}
      numberOfLines={props.numberOfLines}
    >
      {t(props.lbl ?? "")}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  rootStyle: {
    fontSize: 13,
  },
});
