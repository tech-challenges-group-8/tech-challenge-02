import { Avatar, useTheme, IconButton } from "@mui/material";
import React, { memo } from "react";

interface UserAvatarButtonProps {
  userName: string | undefined;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
}

const UserAvatarButton: React.FC<UserAvatarButtonProps> = memo(({
  userName,
  onClick,
  open,
}) => {
  const theme = useTheme();

  return (
    <IconButton
      onClick={onClick}
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
        {userName?.charAt(0) || "U"}
      </Avatar>
    </IconButton>
  );
});

UserAvatarButton.displayName = 'UserAvatarButton';

export default UserAvatarButton;
