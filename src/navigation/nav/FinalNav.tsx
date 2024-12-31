import { RootStackParams, ROUTES } from "../../routes";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import NoNetwork from "../../components/others/NoNetwork";
import { useAppConfig } from "../../context";
import { appColors } from "../../utils";
import { Splash } from "../auth";
import Content from "../Content";

const Stack = createStackNavigator<RootStackParams>();

function FinalNav() {
  const { theme } = useAppConfig();
  const { hasNetwork } = useAppConfig();

  if (!hasNetwork) return <NoNetwork status={hasNetwork} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme === "light" ? appColors.bg.light : appColors.bg.dark,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ROUTES.Splash}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={ROUTES.Splash} component={Splash} />
          <Stack.Screen name={ROUTES.Content} component={Content} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default FinalNav;
