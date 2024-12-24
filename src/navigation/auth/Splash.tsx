import { ROUTES, SplashProps } from "../../routes";

import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SimpleButton } from "../../components/buttons";
import { RootView } from "../../components/others";
import { AppText } from "../../components/texts";

// import {StackNavigationProp} from '@react-navigation/stack';

// type SplashProp = StackNavigationProp<RootStackParams, 'Splash'>;

const Splash = (props: SplashProps) => {
  // const navigation: NavigationProp<ParamListBase> = useNavigation<SplashProp>();

  const { t } = useTranslation();

  return (
    <RootView bodyStyle={styles.rootStyle}>
      <AppText lbl={"appDescription"} style={styles.descStyle} />

      <SimpleButton
        lbl={"gotToSeeContent"}
        onPress={() =>
          props.navigation.navigate(ROUTES.Content, {
            title: "Content",
          })
        }
        style={{ paddingHorizontal: 15, marginTop: 20 }}
      />
    </RootView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  rootStyle: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  descStyle: {
    fontSize: 15,
    lineHeight: 25,
    textAlign: "justify",
  },
});
