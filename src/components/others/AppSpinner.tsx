import React from "react";
import { StyleSheet, View } from "react-native";
import { CustomSpinner } from "./index.tsx";

interface IAppSpinner {
  size?: number;
  color?: string;
  hasBgColor?: boolean;
}

const AppSpinner = (props: IAppSpinner) => {
  return (
    <View style={styles.rootStyle}>
      <CustomSpinner
        size={props.size}
        color={props.color}
        animationType="grid"
        hasBgColor={props.hasBgColor}
      />
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
