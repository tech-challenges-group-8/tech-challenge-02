import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import React, { memo } from "react";

interface MenuIconButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  ariaLabel?: string;
}

const MenuIconButton: React.FC<MenuIconButtonProps> = memo(({
  onClick,
  open,
  ariaLabel = "menu",
}) => {
  return (
    <IconButton
      sx={{ display: { xs: "block", sm: "none" } }}
      edge="start"
      color="inherit"
      aria-label={ariaLabel}
      onClick={onClick}
      aria-controls={open ? "sidebar-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
    >
      <MenuIcon />
    </IconButton>
  );
});

MenuIconButton.displayName = 'MenuIconButton';

export default MenuIconButton;
