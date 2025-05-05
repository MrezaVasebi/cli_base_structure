import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

const BodyView = (props: ViewProps) => {
  return <View style={[styles.rootStyle, props.style]}>{props.children}</View>;
};

export default BodyView;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
  },
});
