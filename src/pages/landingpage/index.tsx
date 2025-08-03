import { CssBaseline, ThemeProvider } from "@mui/material";

import useInitI18n from "../../commons/useInitI18n";

import BodyHome from "../../components/home/BodyHome";
import FooterHome from "../../components/home/FooterHome";
import HeaderHome from "../../components/home/HeaderHome";
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
