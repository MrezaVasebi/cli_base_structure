import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { AppText } from "../texts";
import CustomSpinner from "./CustomSpinner";
import NoData from "./NoData";

interface IApiComponent {
  error: string;
  loading: boolean;
  data: any[] | object;
}

const ApiComponent = (props: IApiComponent & ViewProps) => {
  return (
    <View style={styles.rootStyle}>
      {props.loading ? (
        <CustomSpinner animationType="grid" size={40} />
      ) : !props.loading && props.error ? (
        <View style={styles.container}>
          <AppText lbl={props.error} />
        </View>
      ) : (props.data &&
          Array.isArray(props.data) &&
          props.data.length === 0) ||
        (typeof props.data === "object" &&
          Object.keys(props.data).length === 0) ? (
        <NoData />
      ) : (
        props.children
      )}
    </View>
  );
};

export default ApiComponent;

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
