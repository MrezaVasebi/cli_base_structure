import { ROUTES, RootStackParams } from "../../routes";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NoNetwork from "../../components/others/NoNetwork";
import { useAppConfig } from "../../context";
import { Splash } from "../auth";
import Content from "../Content";

const Stack = createStackNavigator<RootStackParams>();

function FinalNav() {
  const { hasNetwork } = useAppConfig();

  if (!hasNetwork) return <NoNetwork status={hasNetwork} />;

  return (
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
  );
}

export default FinalNav;
