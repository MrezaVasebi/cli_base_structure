import { RootStackParams, ROUTES } from "../../routes";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NoNetwork from "../../components/others/NoNetwork";
import { useAppConfig } from "../../context";
import { Splash } from "../auth";
import Content from "../Content";
import { View } from "react-native";
import { appColors } from "../../utils";

const Stack = createStackNavigator<RootStackParams>();

function FinalNav() {
  const { theme } = useAppConfig();
  const { hasNetwork } = useAppConfig();

  if (!hasNetwork) return <NoNetwork status={hasNetwork} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "light" ? appColors.dark : appColors.grey,
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
