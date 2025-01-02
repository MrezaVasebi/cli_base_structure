import { IconButton } from "../../components/buttons";
import { ROUTES, SplashProps } from "../../routes";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { RootView } from "../../components/others";
import { AppText } from "../../components/texts";
import { useAppConfig } from "../../context";
import { storage } from "../../modules/storage.ts";
import { STORAGE_KEY } from "../../utils";

// import {StackNavigationProp} from '@react-navigation/stack';

// type SplashProp = StackNavigationProp<RootStackParams, 'Splash'>;

const Splash = (props: SplashProps) => {
  // const navigation: NavigationProp<ParamListBase> = useNavigation<SplashProp>();

  const { theme, setTheme } = useAppConfig();
  const { i18n } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate(ROUTES.Content, {
        title: "content",
      });
    }, 5000);
  }, []);

  return (
    <RootView
      bodyStyle={{
        ...styles.rootStyle,
      }}
    >
      <AppText lbl={"appDescription"} style={styles.descStyle} />
    </RootView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  rootStyle: {
    padding: 20,
    justifyContent: "center",
  },
  descStyle: {
    fontSize: 14,
    lineHeight: 30,
  },
  langStyle: {
    top: 20,
    left: 20,
    position: "absolute",
  },
});
