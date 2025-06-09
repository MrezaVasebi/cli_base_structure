import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ViewProps } from "react-native";
import { useAppConfig } from "../../context";
import { appColors, globalUi } from "../../utils";
import { AppText } from "../texts";

const AppToast = (props: ViewProps) => {
  const { toast } = useAppConfig();
  const { i18n } = useTranslation();

  const sideBgcolor = () => {
    if (toast?.type === "error") return appColors.toastColor.error;
    if (toast?.type === "success") return appColors.toastColor.success;
    return appColors.toastColor.info;
  };

  return (
    toast?.msg && (
      <View style={[styles.rootStyle, props.style]}>
        <View
          style={{
            ...styles.sideStyle,
            ...(i18n.language === "fa" ? { left: 0 } : { right: 0 }),
            backgroundColor: sideBgcolor(),
          }}
        />

        <AppText
          lbl={toast.msg ?? ""}
          style={[
            styles.lblStyle,
            {
              ...(i18n.language === "fa"
                ? { paddingLeft: 15 }
                : { paddingRight: 15 }),
            },
          ]}
        />
      </View>
    )
  );
};

export default AppToast;

const styles = StyleSheet.create({
  rootStyle: {
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
    height: 50,
    borderRadius: 5,
    overflow: "hidden",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: appColors.white,
    ...globalUi.shadowStyle,
  },
  sideStyle: {
    width: 10,
    height: "100%",
    position: "absolute",
  },
  lblStyle: {
    color: appColors.black,
  },
});
