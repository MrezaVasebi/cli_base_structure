import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ViewProps } from "react-native";
import { TextButton } from "../buttons";

interface ICountDownTimer {
  secondsLeft: number;
  onPressAgain: () => void;
}

const CounterDown = (props: ICountDownTimer & ViewProps) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.rootStyle, props.style]}>
      <TextButton
        onPress={props.onPressAgain}
        lbl={
          props.secondsLeft === 0
            ? t("resendOtpAgain")
            : `${t("sendCodeAfter")} ${props.secondsLeft} ${t("seconds")}`
        }
        disabled={props.secondsLeft === 0 ? false : true}
        lblStyle={{
          opacity: props.secondsLeft === 0 ? 1 : 0.5,
        }}
      />
    </View>
  );
};

export default memo(CounterDown);

const styles = StyleSheet.create({
  rootStyle: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
