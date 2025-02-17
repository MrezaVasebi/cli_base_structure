import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useAppConfig } from "../../context";
import { AppText } from "../texts";
import RootView from "./RootView";

const NoNetwork = () => {
  const { hasNetwork } = useAppConfig();

  return (
    <RootView bodyStyle={styles.container}>
      <StatusBar hidden />

      <View style={styles.container}>
        {hasNetwork === null ? (
          <AppText style={styles.txtStyle} lbl="loading" />
        ) : !hasNetwork ? (
          <AppText lbl="noInternet" style={styles.txtStyle} />
        ) : (
          <AppText lbl="welcomeBack" />
        )}
      </View>
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
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  txtStyle: {
    fontSize: 18,
    textAlign: "center",
  },
});
