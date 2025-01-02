import React from "react";
import { View, Text, StyleSheet, ColorValue } from "react-native";
import { CustomSpinner } from "./index.tsx";

interface IAppSpinner {
  color?: ColorValue;
  hasBgColor?: boolean;
  size?: "small" | "large" | number;
}

const AppSpinner = (props: IAppSpinner) => {
  return (
    <View style={styles.rootStyle}>
      <CustomSpinner color={props.color} hasBgColor={props.hasBgColor}   size={props.size} />
    </View>
  );
};

export default AppSpinner;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
