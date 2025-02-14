import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { AppText } from "../texts";
import RootView from "./RootView";

interface INoNetwork {
  status: boolean | null;
}

const NoNetwork = (props: INoNetwork) => {
  return (
    <RootView bodyStyle={styles.rootStyle}>
      <StatusBar hidden />

      <View style={styles.container}>
        {props.status === null ? (
          <AppText style={styles.txtStyle} lbl="loading" />
        ) : !props.status ? (
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
