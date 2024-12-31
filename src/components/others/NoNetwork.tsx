import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { appColors } from "../../utils";
import { AppText } from "../texts";

interface INoNetwork {
  status: boolean | null;
}

const NoNetwork = (props: INoNetwork) => {
  return (
    <View style={styles.rootStyle}>
      <StatusBar hidden />

      {props.status === null ? (
        <AppText lbl="Loading..." />
      ) : !props.status ? (
        <AppText lbl="No Internet Connection" />
      ) : (
        <AppText lbl="Welcome Back ..." />
      )}
    </View>
  );
};

export default NoNetwork;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColors.bg.light,
  },
});
