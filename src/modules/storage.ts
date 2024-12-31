import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEV_MODE } from "../utils/constants";

export const storage = <T>() => {
  return {
    storeData: async (v: T, key: string) => {
      try {
        await AsyncStorage.setItem(key, v as string);
      } catch (error) {
        if (DEV_MODE) console.log(error, "storeData error");
      }
    },
    storeObj: async (v: T, key: string) => {
      try {
        const jsonV = JSON.stringify(v);
        await AsyncStorage.setItem(key, jsonV);
      } catch (error) {
        if (DEV_MODE) console.log(error, "storeObj error");
      }
    },
    readData: async (key: string) => {
      try {
        const value = await AsyncStorage.getItem(key);
        return value ? (value as T) : null;
      } catch (error) {
        return null;
      }
    },
    readObj: async (key: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (error) {
        return null;
      }
    },
    removeKey: async (key: string) => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (e) {
        if (DEV_MODE) console.log(e, "removeKey error");
      }
    },
  };
};
