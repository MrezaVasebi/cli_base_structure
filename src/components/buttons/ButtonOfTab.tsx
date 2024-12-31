import React from "react";
import { useTranslation } from "react-i18next";
import { StyleProp, ViewStyle } from "react-native";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import SimpleButton from "./SimpleButton";

interface IButtonOfTab {
  tabName: string;
  mainLbl: string;
  onPress: () => void;
  rightLabel?: string;
  centerLabel?: string;
  tabCounter: "Two" | "Three";
  style?: StyleProp<ViewStyle>;
}

const ButtonOfTab = (props: IButtonOfTab) => {
  const { theme } = useAppConfig();
  const { t } = useTranslation();

  const calcUI = () => {
    if (props.tabCounter === "Two") {
      return {
        bgColor:
          props.tabName === props.mainLbl
            ? theme === "light"
              ? appColors.btnBgColor.light
              : appColors.btnBgColor.dark
            : appColors.transparent,
        borderRadius: 50,
        txtColor:
          props.tabName === props.mainLbl
            ? appColors.white
            : theme === "light"
            ? appColors.txtColor.dark
            : appColors.txtColor.dark,
      };
    }

    return {
      bgColor:
        props.tabName === props.mainLbl
          ? theme === "light"
            ? appColors.btnBgColor.light
            : appColors.btnBgColor.dark
          : appColors.transparent,
      txtColor:
        props.tabName === props.mainLbl
          ? appColors.white
          : theme === "light"
          ? appColors.txtColor.dark
          : appColors.txtColor.dark,
      borderRadius: 50,
    };
  };

  return (
    <SimpleButton
      lbl={t(props.mainLbl)}
      onPress={props.onPress}
      lblStyle={{ color: calcUI()?.txtColor }}
      style={{
        backgroundColor: calcUI()?.bgColor,
        borderRadius: calcUI()?.borderRadius,
        width: props.tabCounter === "Two" ? "49%" : "33%",
      }}
    ></SimpleButton>
  );
};

export default ButtonOfTab;
