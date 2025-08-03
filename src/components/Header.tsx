"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "../contexts/UserContext";

const Header = () => {
  const theme = useTheme();
  const { user, setUser } = useUser();
  const router = useRouter();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [sidebarAnchorEl, setSidebarAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const sidebarOpen = Boolean(sidebarAnchorEl);
  const pathname = usePathname();

  const handleSidebarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setSidebarAnchorEl(event.currentTarget);
  };

  const handleSidebarClose = () => {
    setSidebarAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      setUser(null);
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", height: "68px" }}>
        {/* Sidebar Menu Icon for xs screens */}
        <IconButton
          sx={{ display: { xs: "block", sm: "none" } }}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleSidebarMenu}
          aria-controls={sidebarOpen ? "sidebar-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={sidebarOpen ? "true" : undefined}
        >
          <MenuIcon />
        </IconButton>

        {/* Placeholder for balance on mobile (if needed, otherwise remove) */}
        <Box sx={{ visibility: { xs: "hidden", md: "visible" } }}>
          {/* This box might be removed or repurposed later if balance is moved */}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ marginRight: 3, color: theme.palette.secondary.contrastText }}
          >
            {user?.name}
          </Typography>
          <IconButton
            onClick={handleMenu}
            aria-controls={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            color="inherit"
            sx={{ padding: 0 }}
          >
            <Avatar
              sx={{
                border: `2px solid ${theme.palette.primary.contrastText}`,
                color: theme.palette.primary.contrastText,
                backgroundColor: "transparent",
                width: "40px",
                height: "40px",
              }}
            >
              {user?.name?.charAt(0) || "U"}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>{t("header.logout")}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Sidebar Menu for xs screens */}
      <Menu
        id="sidebar-menu"
        anchorEl={sidebarAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={sidebarOpen}
        onClose={handleSidebarClose}
        MenuListProps={{
          "aria-labelledby": "sidebar-menu-button",
        }}
      >
        <MenuItem
          component={Link}
          href="/dashboard"
          onClick={handleSidebarClose}
          selected={pathname === "/dashboard"}
        >
          {t("sidebar.home")}
        </MenuItem>
        <MenuItem
          component={Link}
          href="/transactions"
          onClick={handleSidebarClose}
          selected={pathname === "/transactions"}
        >
          {t("sidebar.transactions")}
        </MenuItem>
        <MenuItem
          component={Link}
          href="/investiments"
          onClick={handleSidebarClose}
          selected={pathname === "/investiments"}
        >
          {t("sidebar.investments")}
        </MenuItem>
        <MenuItem
          component={Link}
          href="/services"
          onClick={handleSidebarClose}
          selected={pathname === "/services"}
        >
          {t("sidebar.services")}
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
