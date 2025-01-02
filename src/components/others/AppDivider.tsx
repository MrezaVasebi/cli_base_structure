import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { appColors } from "../../utils";

const AppDivider = (props: ViewProps) => {
  return <View style={[styles.rootStyle, props.style]} />;
};

export default AppDivider;

const styles = StyleSheet.create({
  rootStyle: {
    height: 1,
    width: "100%",
    marginVertical: 3,
    backgroundColor: appColors.darkGrey,
  },
});
