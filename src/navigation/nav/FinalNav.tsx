import { ROUTES, RootStackParams } from "../../routes";

import Content from "../Content";
import { NavigationContainer } from "@react-navigation/native";
import NoNetwork from "../../components/others/NoNetwork";
import React from "react";
import { Splash } from "../auth";
import { createStackNavigator } from "@react-navigation/stack";
import { useNetwork } from "../../context";

const Stack = createStackNavigator<RootStackParams>();

function FinalNav() {
  const { isconnected } = useNetwork();

  if (!isconnected) return <NoNetwork status={isconnected} />;

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
