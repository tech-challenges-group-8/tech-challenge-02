"use client";

import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, List, ListItemText, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo-branco.svg";
import { FooterList, CustomListItem } from "./FooterList";

// Exported helpers that build arrays using the translator `t` for clarity
const footerServices = (t: (key: string) => string) => [
  t("footerHome.servicesTitle"),
  t("footerHome.checkingAccount"),
  t("footerHome.businessAccount"),
  t("footerHome.creditCard"),
];

const footerContacts = (t: (key: string) => string) => [
  t("footerHome.contactTitle"),
  "0800 004 250 08",
  "meajuda@bytebank.com.br",
  "ouvidoria@bytebank.com.br",
];

export default function FooterHome() {
  const { t } = useTranslation();
  const theme = useTheme();
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        }}
      >
        <Box
          sx={{
          display: { xs: "flex", sm: "flex", md: "flex" },
          justifyContent: { xs: "center", sm: "space-between" },
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "1200px",
          padding: { xs: "20px 50px", sm: "20px" },
          }}
        >
          <FooterList items={footerServices(t)} />
          <FooterList items={footerContacts(t)} />
          <List
            sx={{
              width: "100%",
              maxWidth: 220,
              display: "flex",
              flexDirection: "column",
            gap: theme.spacing(2),
            }}
          >
            <CustomListItem>
              <ListItemText
                primary={t("footerHome.developedBy")}
                primaryTypographyProps={{
                  fontSize: "16px",
                  fontWeight: 700,
                  textAlign: { xs: "left", sm: "center" },
                }}
              />
            </CustomListItem>
            <CustomListItem
              sx={{
                display: "flex",
                justifyContent: { xs: "left", sm: "center" },
              }}
            >
              <img src={Logo} alt="logo" width={146} height={32} />
            </CustomListItem>
            <CustomListItem
              sx={{
                display: "flex",
                justifyContent: { xs: "left", sm: "center" },
                gap: theme.spacing(2),
              }}
            >
              <InstagramIcon sx={{ color: theme.palette.common.white, fontSize: "32px" }} />
              <WhatsAppIcon sx={{ color: theme.palette.common.white, fontSize: "32px" }} />
              <YouTubeIcon sx={{ color: theme.palette.common.white, fontSize: "32px" }} />
            </CustomListItem>
          </List>
        </Box>
      </Box>
    );
}
