import React, { createContext, useContext, useEffect, useState } from "react";

import NetInfo from "@react-native-community/netinfo";
import { Platform } from "react-native";
import { storage } from "../modules/storage.ts";
import { STORAGE_KEY } from "../utils";

export type ThemeType = "light" | "dark";

type TToastType = "success" | "error" | "info";

interface IToast {
  duration: number;
  type: TToastType;
  msg: string | null;
}

type AppConfigContextType = {
  isAndroid: boolean;
  hasNetwork: boolean | null;

  theme: ThemeType | null;
  setTheme: (v: ThemeType) => void;

  toast: IToast | null;
  showToast: (v: IToast) => void;
};

interface IAppConfigProviderProps {
  children: React.ReactNode;
}

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

export const AppConfigProvider = (props: IAppConfigProviderProps) => {
  const [theme, setTheme] = useState<ThemeType | null>(null);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [hasNetwork, setHasNetwork] = useState<boolean | null>(null);
  const [toast, setToast] = useState<IToast | null>(null);

  useEffect(() => {
    // check platform
    setIsAndroid(Platform.OS === "android");

    // check connection
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setHasNetwork(state.isConnected);
    };

    checkConnection();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setHasNetwork(state.isConnected);
    });

    // get theme
    getThemeAsync();

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   if (toast?.msg) {
  //     setTimeout(() => {
  //       setToast({
  //         msg: "",
  //         type: "error",
  //         duration: 3000,
  //       });
  //     }, toast.duration ?? 3000);
  //   }
  // }, [toast?.msg]);

  const getThemeAsync = async () => {
    await storage<ThemeType>(STORAGE_KEY.theme_key)
      .readData()
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

        toast: toast,
        showToast: (v: IToast) => {
          setToast(v);
        },
      }}
    >
      {props.children}
    </AppConfigContext.Provider>
  );
};
