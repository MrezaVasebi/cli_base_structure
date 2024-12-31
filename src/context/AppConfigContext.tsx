import React, { createContext, useContext, useEffect, useState } from "react";

import NetInfo from "@react-native-community/netinfo";
import { Platform } from "react-native";
import { storage } from "../modules/storage.ts";
import { STORAGE_KEY } from "../utils";

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

    // get theme
    getTheme();

    return () => {
      unsubscribe();
    };
  }, []);

  const getTheme = async () => {
    await storage<ThemeType>()
      .readData(STORAGE_KEY.theme_key)
      .then((res) => {
        if (res) {
          setTheme(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
