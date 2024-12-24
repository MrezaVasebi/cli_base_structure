import { StyleSheet, Text, TextProps } from "react-native";
import { appColors, appFonts } from "../../utils";

import React from "react";
import { useTranslation } from "react-i18next";

interface IAppText {
  lbl?: string;
}

const AppText = (props: IAppText & TextProps) => {
  const { t, i18n } = useTranslation();

  return (
    <Text
      style={[
        styles.rootStyle,
        {
          fontFamily: i18n.language === "fa" ? appFonts.fa : appFonts.en,
        },
        props.style,
      ]}
      ellipsizeMode={props.lineBreakMode}
      numberOfLines={props.numberOfLines}
      {...props}
    >
      {t(props.lbl ?? "")}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  rootStyle: {
    fontSize: 13,
    color: appColors.black,
  },
});
