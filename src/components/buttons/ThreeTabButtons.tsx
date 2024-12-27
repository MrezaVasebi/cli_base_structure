import React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import { appColors, shadowStyle } from "../../utils";
import ButtonOfTab from "./ButtonOfTab";

interface ITabButton {
  innerStyle?: {};
  tabName: string;
  lblLeft: string;
  lblRight: string;
  lblCenter: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressCenter: () => void;
}

const ThreeTabButton = (props: ITabButton & ViewProps) => {
  return (
    <View style={[styles.rootStyle, props.style]}>
      <View style={{ ...styles.innerStyle, ...props.innerStyle }}>
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
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  innerStyle: {
    padding: 5,
    width: "100%",
    height: "100%",
    borderRadius: 50,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: appColors.white,
    ...shadowStyle,
  },
});
