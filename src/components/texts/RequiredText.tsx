import { useTranslation } from "react-i18next";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { appColors } from "../../utils";
import AppText from "./AppText";

interface IRequiredText {
  lbl?: string;
  isRequired?: boolean;
  lblStyle?: StyleProp<TextStyle>;
}

const RequiredText = (props: IRequiredText) => {
  const { i18n } = useTranslation();

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: i18n.language === "en" ? "row" : "row-reverse",
      }}
    >
      <AppText lbl={props.lbl} style={[styles.lblStyle, props.lblStyle]} />

      {props.isRequired && (
        <View
          style={{
            ...styles.circleStyle,
            ...(i18n.language === "fa"
              ? { marginRight: 5 }
              : { marginLeft: 5 }),
          }}
        />
      )}
    </View>
  );
};

export default RequiredText;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  circleStyle: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: appColors.isRequired,
  },
  lblStyle: {
    marginBottom: 5,
  },
});
