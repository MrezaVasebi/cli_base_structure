import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEV_MODE } from "../utils/constants";

export const storage = <T>(key: string) => {
  return {
    storeData: async (v: T) => {
      try {
        await AsyncStorage.setItem(key, v as string);
      } catch (error) {
        if (DEV_MODE) console.log(error, "storeData error");
      }
    },
    storeObj: async (v: T) => {
      try {
        const jsonV = JSON.stringify(v);
        await AsyncStorage.setItem(key, jsonV);
      } catch (error) {
        if (DEV_MODE) console.log(error, "storeObj error");
      }
    },
    readData: async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        return value ? (value as T) : null;
      } catch (error) {
        return null;
      }
    },
    readObj: async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
      } catch (error) {
        return null;
      }
    },
    removeKey: async () => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (e) {
        if (DEV_MODE) console.log(e, "removeKey error");
      }
    },
  };
};
