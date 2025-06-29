import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { appColors, globalUi } from "../../utils";
import { ButtonOfTab } from "./index";

interface ITabButton {
  innerStyle?: {};
  tabName: string;
  lblLeft: string;
  lblRight: string;
  onPressLeft: () => void;
  onPressRight: () => void;
}

const TabButton = (props: ITabButton & ViewProps) => {
  return (
    <View style={[styles.rootStyle, props.style]}>
      <View style={[styles.innerStyle, props.innerStyle]}>
        {/* Left Tab */}
        <ButtonOfTab
          tabCounter={"Two"}
          tabName={props.tabName}
          mainLbl={props.lblLeft}
          onPress={props.onPressLeft}
          rightLabel={props.lblRight}
        />

        {/* Right Tab */}
        <ButtonOfTab
          tabCounter={"Two"}
          tabName={props.tabName}
          mainLbl={props.lblRight}
          onPress={props.onPressRight}
          rightLabel={props.lblLeft}
        />
      </View>
    </View>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  rootStyle: {
    height: 45,
    width: "100%",
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
    ...globalUi.shadowStyle,
  },
});
