import { StyleSheet, Text, TextProps } from "react-native";
import { appColors, appFonts } from "../../utils";

import React from "react";
import { useTranslation } from "react-i18next";
import { useAppConfig } from "../../context";

interface IAppText {
  lbl?: string;
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
          color: theme === "light" ? appColors.white : appColors.black,
          fontFamily: lang === "fa" ? appFonts.fa : appFonts.en,
          textAlign: lang === "fa" ? "right" : "justify",
        },
        props.style,
      ]}
      ellipsizeMode={props.lineBreakMode}
      numberOfLines={props.numberOfLines}
      // {...props}
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
