import { ROUTES, SplashProps } from "../../routes";

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { RootView } from "../../components/others";
import { AppText } from "../../components/texts";

// import {StackNavigationProp} from '@react-navigation/stack';

// type SplashProp = StackNavigationProp<RootStackParams, 'Splash'>;

const Splash = (props: SplashProps) => {
  // const navigation: NavigationProp<ParamListBase> = useNavigation<SplashProp>();

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate(ROUTES.Content, {
        title: "content",
      });
    }, 6000);
  }, []);

  return (
    <RootView bodyStyle={{ ...styles.rootStyle }}>
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
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
  },
});
