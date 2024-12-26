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
          backgroundColor: props.topBgColor ?? appColors.white,
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: props.bodyBgColor ?? appColors.white,
        }}
      >
        <BodyView
          style={{
            ...props.bodyStyle,
            backgroundColor:
              theme === "light" ? appColors.dark : appColors.grey,
          }}
        >
          {props.children}
        </BodyView>
      </SafeAreaView>
    </Fragment>
  );
};

export default RootView;
