"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

interface SidebarItemProps {
  href: string;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, text }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <ListItemButton
      LinkComponent={Link}
      href={href}
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
};

const Sidebar = () => {
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
        <SidebarItem href="/investiments" text={t("sidebar.investments")} />
        <SidebarItem href="/services" text={t("sidebar.services")} />
      </List>
    </Box>
  );
};

export default Sidebar;
