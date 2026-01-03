import { CssBaseline, ThemeProvider } from "@mui/material";

import useInitI18n from "../../commons/useInitI18n";

import { BodyHome, FooterHome, HeaderHome } from "../../components/landing";
import theme from "../../styles/theme";

export default function Home() {
  const i18nReady = useInitI18n();

  if (!i18nReady) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderHome />
      <BodyHome />
      <FooterHome />
    </ThemeProvider>
  );
}
