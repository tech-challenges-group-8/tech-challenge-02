"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "../../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIconButton from "./icons/MenuIconButton";
import UserAvatarButton from "./icons/UserAvatarButton";

// Small reusable hook to manage anchor element state for MUI Menus
const useAnchor = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return { anchorEl, open, handleOpen, handleClose };
};
const Header = React.memo(() => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const account = useAnchor();
  const sidebar = useAnchor();
  const location = useLocation();
  const pathname = location.pathname;

  const handleSidebarMenu = sidebar.handleOpen;
  const handleSidebarClose = sidebar.handleClose;

  const sidebarMenuItems = [
    { href: "/dashboard", labelKey: "sidebar.home" },
    { href: "/transactions", labelKey: "sidebar.transactions" },
    { href: "/investiments", labelKey: "sidebar.investments" },
    { href: "/services", labelKey: "sidebar.services" },
  ];

  const handleLogout = async () => {
    account.handleClose();
    try {
      setUser(null);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", height: "68px" }}>
        {/* Sidebar Menu Icon for xs screens */}
        <MenuIconButton
          onClick={handleSidebarMenu}
          open={sidebar.open}
        />
        {/* Placeholder for balance on mobile (if needed, otherwise remove) */}
        <Box sx={{ visibility: { xs: "hidden", md: "visible" } }}>
          {/* This box might be removed or repurposed later if balance is moved */}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ marginRight: 3, color: "inherit" }}
          >
            {user?.name}
          </Typography>
          <UserAvatarButton
            userName={user?.name}
            onClick={account.handleOpen}
            open={account.open}
          />
          <Menu
            id="menu-appbar"
            anchorEl={account.anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={account.open}
            onClose={account.handleClose}
          >
            <MenuItem onClick={handleLogout}>{t("header.logout")}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Sidebar Menu for xs screens */}
      <Menu
        id="sidebar-menu"
        anchorEl={sidebar.anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={sidebar.open}
        onClose={sidebar.handleClose}
        MenuListProps={{
          "aria-labelledby": "sidebar-menu-button",
        }}
      >
        {sidebarMenuItems.map((item) => (
          <MenuItem
            key={item.href}
            component={Link}
            href={item.href}
            onClick={handleSidebarClose}
            selected={pathname === item.href}
          >
            {t(item.labelKey)}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
});

Header.displayName = 'Header';

export default Header;
