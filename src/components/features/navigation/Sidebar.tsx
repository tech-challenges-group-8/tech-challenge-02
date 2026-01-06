"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";

interface SidebarItemProps {
  href: string;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = memo(({ href, text }) => {
  const theme = useTheme();
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = pathname === href;

  return (
    <ListItemButton
      component={Link}
      to={href}
      sx={{
        borderLeft: {
          sm: "none",
          lg: isActive ? `3px solid ${theme.palette.action.active}` : "none",
        },
        borderBottom: {
          sm: isActive ? `3px solid ${theme.palette.action.active}` : "none",
          lg: "none",
        },
        minWidth: { sm: "auto", lg: 180 },
        justifyContent: { sm: "center", lg: "flex-start" },
        paddingX: { sm: 1, lg: 2 },
        paddingY: { sm: 0.5, lg: 1 },
      }}
    >
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          sx: {
            color: isActive
              ? theme.palette.action.active
              : theme.palette.text.primary,
            fontWeight: isActive ? "bold" : "normal",
            textAlign: { sm: "center", lg: "left" },
          },
        }}
      />
    </ListItemButton>
  );
});

SidebarItem.displayName = 'SidebarItem';

const Sidebar = memo(() => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        flexDirection: { sm: "row", lg: "column" },
        width: { sm: `calc(100% - ${theme.spacing(2)})`, lg: 250 },
        height: { sm: "auto", lg: "100%" },
        borderRadius: theme.shape.borderRadius,
        bgcolor: theme.palette.background.paper,
        boxShadow: 2,
        justifyContent: { sm: "space-around", lg: "flex-start" },
        alignItems: "center",
        paddingX: { xs: 1, md: 2 },
        paddingY: { xs: 0.5, md: 1 },
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: { sm: "row", lg: "column" },
          width: "100%",
          justifyContent: { sm: "space-around", lg: "flex-start" },
          alignItems: "center",
        }}
      >
        <SidebarItem href="/dashboard" text={t("sidebar.home")} />
        <SidebarItem href="/transactions" text={t("sidebar.transactions")} />
        <SidebarItem href="/investments" text={t("sidebar.investments")} />
        <SidebarItem href="/services" text={t("sidebar.services")} />
      </List>
    </Box>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
