import React from "react";
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
  return (
    <View style={[styles.rootStyle, props.style]}>
      <View style={[styles.innerStyle, props.innerStyle]}>
        <ButtonOfTab
          tabCounter="Three"
          tabName={props.tabName}
          mainLbl={props.lblLeft}
          onPress={props.onPressLeft}
          rightLabel={props.lblRight}
          centerLabel={props.lblCenter}
          style={{
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
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
            borderRadius: 0,
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
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        />
      </View>
    </View>
  );
};

export default ThreeTabButton;

const styles = StyleSheet.create({
  rootStyle: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  innerStyle: {
    padding: 1,
    borderRadius: 45,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: appColors.white,
    ...shadowStyle,
  },
});
