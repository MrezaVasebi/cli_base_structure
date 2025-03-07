import React from "react";
import {
  StyleProp,
  StyleSheet,
  type TouchableOpacityProps,
  View,
  type ViewProps,
} from "react-native";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import { AppText } from "../texts";
import ButtonWrapper from "./ButtonWrapper";

interface ILineTabButton {
  tabName: string;
  lblLeft: string;
  lblRight: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  btnStyleLeft?: StyleProp<ViewProps>;
  btnStyleRight?: StyleProp<ViewProps>;
}

interface IBtn {
  label: string;
  tabName: string;
  lblStyle?: object;
}

const Btn = (props: IBtn & TouchableOpacityProps) => {
  let { label, tabName, lblStyle } = props;
  const { theme } = useAppConfig();

  return (
    <ButtonWrapper
      onPress={props.onPress}
      style={[
        styles.btnStyle,
        props.style,
        {
          borderColor: theme === "light" ? appColors.bg.dark : appColors.orange,
          borderBottomWidth: tabName === label ? 2.5 : 0,
        },
      ]}
    >
      <AppText
        lbl={label}
        style={{
          ...styles.lblStyle,
          ...lblStyle,
        }}
      />
    </ButtonWrapper>
  );
};

const LineTabButton = (props: ILineTabButton & ViewProps) => {
  return (
    <View style={[styles.root, {}, props.style]}>
      <Btn
        label={props.lblLeft}
        tabName={props.tabName}
        style={props.btnStyleLeft}
        onPress={props.onPressLeft}
      />

      <Btn
        label={props.lblRight}
        tabName={props.tabName}
        style={props.btnStyleRight}
        onPress={props.onPressRight}
      />
    </View>
  );
};

export default LineTabButton;

const styles = StyleSheet.create({
  root: {
    height: 45,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: appColors.darkGrey,
  },
  btnStyle: {
    bottom: -1,
    width: "50%",
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lblStyle: {
    fontSize: 15,
  },
});
