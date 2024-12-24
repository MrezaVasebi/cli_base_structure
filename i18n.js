import { DEV_MODE, STORAGE_KEY } from "./src/utils/constants";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./src/locales/en.json";
import fa from "./src/locales/fa.json";
import { storage } from "./src/modules/storage";

// Detect device language
const languageDetector = {
  type: "languageDetector",
  async: true,
  // detect: (callback) => {
  //   const locales = Localization.getLocales();
  //   callback(locales[0].languageCode);
  // },
  detect: async (callback) => {
    const savedDataJSON = await storage().readData(STORAGE_KEY.lang_key);
    if (DEV_MODE) console.log({ savedDataJSON });

    const lang = savedDataJSON ? savedDataJSON : "en";
    callback(lang);
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    await storage().storeData(STORAGE_KEY.lang_key, language);
  },
};

// Initialize i18next
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      fa: { translation: fa },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
