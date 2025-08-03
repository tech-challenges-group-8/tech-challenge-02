"use client";

import { Button, useTheme } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import React from "react";

interface LoadingButtonProps extends ButtonProps {
  isSubmitting: boolean;
  loadingText: string;
  children: React.ReactNode;
}

export default function LoadingButton({
  isSubmitting,
  loadingText,
  children,
  ...props
}: LoadingButtonProps) {
  const { sx, ...otherProps } = props
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      disabled={isSubmitting}
      sx={{
        zIndex: 1,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 600,
        width: { xs: "100%", sm: "250px" },
        height: "48px",
        "&:hover": {
          backgroundColor: "#006B80",
        },
        ...sx,
      }}
      {...otherProps}
    >
      {isSubmitting ? loadingText : children}
    </Button>
  );
}
