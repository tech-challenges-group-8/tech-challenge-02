import React from "react";
import { Typography, useTheme } from "@mui/material";
import type { SxProps } from "@mui/system";

type PageTitleProps = {
  children: React.ReactNode;
  sx?: SxProps;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function PageTitle({ children, sx, variant = "h4" }: PageTitleProps) {
  const theme = useTheme();
  const neutral200 = (theme.palette as any).neutral?.[200] ?? "#dee9ea";

  return (
    <Typography
      variant={variant}
      fontWeight="bold"
      mb={2}
      sx={{ color: { xs: theme.palette.primary.main, sm: neutral200 }, ...(sx as any) }}
    >
      {children}
    </Typography>
  );
}
