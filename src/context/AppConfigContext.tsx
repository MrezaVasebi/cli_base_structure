import React, { createContext, useContext, useEffect, useState } from "react";

import NetInfo from "@react-native-community/netinfo";
import { Platform } from "react-native";

export type ThemeType = "light" | "dark";

type AppConfigContextType = {
  isAndroid: boolean;
  hasNetwork: boolean | null;

  theme: ThemeType;
  setTheme: (v: ThemeType) => void;
};

const AppConfigContext = createContext<AppConfigContextType | undefined>(
  undefined
);

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error("app config context not initialized");
  }

  return context;
};

interface IAppConfigProvider {
  children: React.ReactNode;
}

export const AppConfigProvider = (props: IAppConfigProvider) => {
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [hasNetwork, setHasNetwork] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    setIsAndroid(Platform.OS === "android");

    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setHasNetwork(state.isConnected);
    };

    checkConnection();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setHasNetwork(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppConfigContext.Provider
      value={{
        isAndroid,
        hasNetwork,

        theme,
        setTheme(v: ThemeType) {
          setTheme(v);
        },
      }}
    >
      {props.children}
    </AppConfigContext.Provider>
  );
};
