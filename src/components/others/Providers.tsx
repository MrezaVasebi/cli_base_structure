import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";
import { AppConfigProvider } from "../../context";
import FinalNav from "../../navigation/nav/FinalNav";

const Providers = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AppConfigProvider>
        <FinalNav />
      </AppConfigProvider>
    </I18nextProvider>
  );
};

export default Providers;
