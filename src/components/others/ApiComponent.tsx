import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { AppText } from "../texts";
import CustomSpinner from "./CustomSpinner";
import NoData from "./NoData";

interface IApiComponent {
  data: any[];
  error: string;
  loading: boolean;
}

const ApiComponent = (props: IApiComponent & ViewProps) => {
  return (
    <View style={styles.rootStyle}>
      {props.loading ? (
        <CustomSpinner size={"large"} />
      ) : !props.loading && props.error ? (
        <View style={styles.container}>
          <AppText lbl={props.error} />
        </View>
      ) : props.data && props.data.length === 0 ? (
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
