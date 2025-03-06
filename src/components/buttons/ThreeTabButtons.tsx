import React from "react";
import { useTranslation } from "react-i18next";
import { StyleProp, StyleSheet, View, type ViewProps } from "react-native";
import { appColors, shadowStyle } from "../../utils";
import ButtonOfTab from "./ButtonOfTab";

interface ITabButton {
  tabName: string;
  lblLeft: string;
  lblRight: string;
  lblCenter: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressCenter: () => void;
  innerStyle?: StyleProp<ViewProps>;
}

const ThreeTabButton = (props: ITabButton & ViewProps) => {
  const { i18n } = useTranslation();
  const isPersian = i18n.language === "fa";

  return (
    <View style={[styles.rootStyle, props.style]}>
      <View
        style={[
          styles.innerStyle,
          { flexDirection: isPersian ? "row-reverse" : "row" },
          props.innerStyle,
        ]}
      >
        <ButtonOfTab
          tabCounter="Three"
          tabName={props.tabName}
          mainLbl={props.lblLeft}
          onPress={props.onPressLeft}
          rightLabel={props.lblRight}
          centerLabel={props.lblCenter}
          style={{
            ...(isPersian
              ? { borderTopLeftRadius: 50 }
              : { borderTopRightRadius: 50 }),
            ...(isPersian
              ? { borderBottomLeftRadius: 50 }
              : { borderBottomRightRadius: 50 }),
            ...styles.btnStyle,
          }}
        />

        <ButtonOfTab
          tabCounter="Three"
          tabName={props.tabName}
          mainLbl={props.lblCenter}
          centerLabel={props.lblLeft}
          rightLabel={props.lblRight}
          onPress={props.onPressCenter}
          style={{
            ...styles.btnStyle,
          }}
        />

        <ButtonOfTab
          tabCounter="Three"
          tabName={props.tabName}
          mainLbl={props.lblRight}
          onPress={props.onPressRight}
          rightLabel={props.lblLeft}
          centerLabel={props.lblCenter}
          style={{
            ...(isPersian
              ? { borderTopRightRadius: 50 }
              : { borderTopLeftRadius: 50 }),
            ...(isPersian
              ? { borderBottomRightRadius: 50 }
              : { borderBottomLeftRadius: 50 }),
            ...styles.btnStyle,
          }}
        />
      </View>
    </View>
  );
};

export default ThreeTabButton;

const styles = StyleSheet.create({
  rootStyle: {},
  innerStyle: {
    padding: 2,
    width: "100%",
    borderRadius: 45,
    overflow: "hidden",
    backgroundColor: appColors.white,
    ...shadowStyle,
  },
  btnStyle: {
    flex: 1,
  },
});
