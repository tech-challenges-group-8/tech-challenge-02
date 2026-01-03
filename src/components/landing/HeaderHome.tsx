import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo.svg";
import LogoTablet from "../../assets/logo-tablet.png";

import ButtonsAccount from "./ButtonsAccount";

export default function HeaderHome() {
    const [openMenu, setOpenMenu] = React.useState(false);
    const { t } = useTranslation();

    const toggleDrawer = (newOpenMenu: boolean) => () => {
        setOpenMenu(newOpenMenu);
    };
    const DrawerList = (
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {[t('headerHome.about'), t('headerHome.services')].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
          height: "96px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "calc(100% - 40px)",
            maxWidth: "1200px",
            padding: { xs: "0 20px 0 0", sm: "0 20px" },
          }}
        >
          <Button
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon sx={{ color: "#47A138", fontSize: "32px" }} />
          </Button>
          <Drawer open={openMenu} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            <Box sx={{ display: { xs: "block", sm: "none", lg: "block" } }}>
              <img
                src={Logo}
                alt="Logo Bank financial"
                width={146}
                height={32}
              />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block", lg: "none" } }}>
              <img
                src={LogoTablet}
                alt="Logo Bank financial"
                width={26}
                height={26}
              />
            </Box>
            <Box
              sx={{
                fontSize: "16px",
                fontWeight: "Semibold",
                color: "#47A138",
                cursor: "pointer",
                display: { xs: "none", sm: "block", lg: "block" },
              }}
            >
              {t("headerHome.about")}
            </Box>
            <Box
              sx={{
                fontSize: "16px",
                fontWeight: "Semibold",
                color: "#47A138",
                cursor: "pointer",
                display: { xs: "none", sm: "block", lg: "block" },
              }}
            >
              {t("headerHome.services")}
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block", lg: "block" } }}>
            <ButtonsAccount />
          </Box>
        </Box>
      </Box>
    );
}
