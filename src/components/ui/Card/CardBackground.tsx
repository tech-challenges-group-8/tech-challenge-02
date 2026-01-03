import { Box, Paper, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import BoxMatrixBackground from "./BoxMatrixBackground";
import { COLORS } from "../../../styles/tokens";

export interface CardBackgroundProps {
  children: ReactNode;
  minHeight?: string | number;
}

/**
 * CardBackground - Card with decorative matrix background pattern
 */
export default function CardBackground({
  children,
  minHeight = "400px",
}: CardBackgroundProps) {
  const theme = useTheme();
  const bg = COLORS.neutral[250];
  const light = COLORS.neutral[200];
  const mid = COLORS.neutral[400];
  const gray = COLORS.neutral[450];
  const colors = [bg, light, mid, gray];

  return (
    <Box
      sx={{
        borderRadius: `${theme.shape.borderRadius}px`,
        width: "100%",
        minHeight,
        display: "flex",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: theme.spacing(4),
          width: "100%",
          backgroundColor: bg,
          position: "relative",
          borderRadius: `${theme.shape.borderRadius}px`,
        }}
      >
        <BoxMatrixBackground
          matrix={[
            [1, 0, 2, 0],
            [0, 1, 3, 0],
            [0, 0, 1, 0],
            [0, 0, 3, 1],
          ]}
          colors={colors}
          position="top-right"
          borderRadiusIndex={3}
        />
        <BoxMatrixBackground
          matrix={[
            [1, 2, 0, 0],
            [0, 1, 0, 0],
            [0, 2, 1, 0],
            [0, 3, 0, 1],
          ]}
          colors={colors}
          position="bottom-left"
          borderRadiusIndex={12}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
          }}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
