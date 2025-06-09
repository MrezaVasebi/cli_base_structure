import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { useAppConfig } from "../../context";
import { AppText } from "../texts";
import RootView from "./RootView";

const NoNetwork = () => {
  const { hasNetwork } = useAppConfig();

  return (
    <RootView bodyStyle={styles.rootStyle}>
      <StatusBar hidden />

      {hasNetwork === null ? (
        <AppText style={styles.txtStyle} lbl="loading" />
      ) : !hasNetwork ? (
        <AppText lbl="noInternet" style={styles.txtStyle} />
      ) : (
        <AppText lbl="welcomeBack" />
      )}
    </RootView>
  );
};

export default NoNetwork;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtStyle: {
    fontSize: 18,
    textAlign: "center",
  },
});
