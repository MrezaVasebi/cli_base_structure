import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { AppText } from "../texts";

interface INoData {
  lbl?: string;
}

const NoData = (props: INoData & ViewProps) => {
  return (
    <View style={[styles.rootStyle, props.style]} >
      <AppText lbl={props.lbl ?? "noData"} />
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
