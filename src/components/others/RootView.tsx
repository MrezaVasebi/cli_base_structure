import React, { Fragment } from "react";

import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import BodyView from "./BodyView";

interface IRootView {
  bodyStyle?: {};
  topBgColor?: string;
  bodyBgColor?: string;
  children: React.ReactNode;
}

const RootView = (props: IRootView) => {
  const { theme } = useAppConfig();
  return (
    <Fragment>
      <StatusBar hidden />

      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: props.topBgColor
            ? props.topBgColor
            : theme === "light"
            ? appColors.bg.light
            : appColors.bg.dark,
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: props.bodyBgColor
            ? props.bodyBgColor
            : theme === "light"
            ? appColors.bg.light
            : appColors.bg.dark,
        }}
      >
        <BodyView
          style={{
            ...props.bodyStyle,
            backgroundColor:
              theme === "light" ? appColors.bg.light : appColors.bg.dark,
          }}
        >
          {props.children}
        </BodyView>
      </SafeAreaView>
    </Fragment>
  );
};

export default RootView;
