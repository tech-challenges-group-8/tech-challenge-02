"use client";

import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, List, ListItem, ListItemText, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo-branco.svg";

// ListItem customizado (opcional para controle de padding ou outros estilos)
const CustomListItem = styled(ListItem)(() => ({
    padding: '2px 0',
}));

export default function FooterHome() {
    const { t } = useTranslation();
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
          color: "#fff",
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
          <List sx={{ width: "100%", maxWidth: 220 }}>
            {[
              t("footerHome.servicesTitle"),
              t("footerHome.checkingAccount"),
              t("footerHome.businessAccount"),
              t("footerHome.creditCard"),
            ].map((item, index) => (
              <CustomListItem key={item}>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    fontSize: "16px",
                    fontWeight: index === 0 ? 700 : 400,
                  }}
                />
              </CustomListItem>
            ))}
          </List>
          <List sx={{ width: "100%", maxWidth: 220 }}>
            {[
              t("footerHome.contactTitle"),
              "0800 004 250 08",
              "meajuda@bytebank.com.br",
              "ouvidoria@bytebank.com.br",
            ].map((item, index) => (
              <CustomListItem key={item}>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    fontSize: "16px",
                    fontWeight: index === 0 ? 700 : 400,
                  }}
                />
              </CustomListItem>
            ))}
          </List>
          <List
            sx={{
              width: "100%",
              maxWidth: 220,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
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
                gap: "16px",
              }}
            >
              <InstagramIcon sx={{ color: "#fff", fontSize: "32px" }} />
              <WhatsAppIcon sx={{ color: "#fff", fontSize: "32px" }} />
              <YouTubeIcon sx={{ color: "#fff", fontSize: "32px" }} />
            </CustomListItem>
          </List>
        </Box>
      </Box>
    );
}
