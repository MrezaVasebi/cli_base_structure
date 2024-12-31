import { IconButton, SimpleButton } from "../../components/buttons";
import { ROUTES, SplashProps } from "../../routes";

import React from "react";
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

  return (
    <RootView
      bodyStyle={{
        ...styles.rootStyle,
      }}
    >
      <IconButton
        style={styles.langStyle}
        onPress={async () => {
          await i18n.changeLanguage(i18n.language === "fa" ? "en" : "fa");
          await storage().storeData(
            i18n.language === "fa" ? "fa" : "en",
            STORAGE_KEY.lang_key
          );
        }}
        iconName="language"
        iconSize={25}
      />

      <IconButton
        style={{ ...styles.langStyle, left: 70 }}
        onPress={async () => {
          setTheme(theme === "light" ? "dark" : "light");
          await storage().storeData(
            theme === "light" ? "dark" : "light",
            STORAGE_KEY.theme_key
          );
        }}
        iconName={"theme-light-dark"}
        iconSize={25}
      />

      <AppText lbl={"appDescription"} style={styles.descStyle} />

      <SimpleButton
        lbl={"gotToSeeContent"}
        onPress={() =>
          props.navigation.navigate(ROUTES.Content, {
            title: "content",
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
    justifyContent: "center",
  },
  descStyle: {
    fontSize: 14,
    lineHeight: 25,
  },
  langStyle: {
    top: 20,
    left: 20,
    position: "absolute",
  },
});
