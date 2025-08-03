import React from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "../../commons/i18n";

export const withI18n = (Story: React.FC) => (
  <I18nextProvider i18n={i18n}>
    <Story />
  </I18nextProvider>
);
