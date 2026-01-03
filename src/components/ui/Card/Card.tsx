import { Box, Paper, useTheme, type SxProps } from "@mui/material";
import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  elevation?: number;
  sx?: SxProps;
  minHeight?: string | number;
}

/**
 * Base Card component - Simple card wrapper with consistent styling
 */
export default function Card({ 
  children, 
  elevation = 3, 
  sx,
  minHeight = "auto"
}: CardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: `${theme.shape.borderRadius}px`,
        width: "100%",
        minHeight,
        display: "flex",
        ...sx,
      }}
    >
      <Paper
        elevation={elevation}
        sx={{
          padding: theme.spacing(4),
          width: "100%",
          borderRadius: `${theme.shape.borderRadius}px`,
          position: "relative",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
