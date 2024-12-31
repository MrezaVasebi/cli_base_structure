import React from "react";
import { StyleSheet } from "react-native";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import TextButton from "./TextButton";

interface ISingleSelectItem {
  lbl: string;
  isSelected: boolean;
  onPress: () => void;
}

const SingleSelectItem = (props: ISingleSelectItem) => {
  const { theme } = useAppConfig();

  return (
    <TextButton
      lbl={props.lbl}
      lblStyle={{
        fontSize: 15,
        color: props.isSelected
          ? appColors.orange
          : theme === "light"
          ? appColors.bg.dark
          : appColors.bg.light,
      }}
      style={{
        ...styles.itemStyle,
        borderColor: theme === "light" ? appColors.bg.dark : appColors.bg.light,
      }}
      onPress={props.onPress}
    />
  );
};

export default SingleSelectItem;

const styles = StyleSheet.create({
  itemStyle: {
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
});
