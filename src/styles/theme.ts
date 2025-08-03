import { createTheme } from "@mui/material/styles";

import { COLORS, SHAPE, SPACING, TYPOGRAPHY } from "./tokens";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.brand.main,
      contrastText: COLORS.brand.contrast,
    },
    secondary: {
      main: COLORS.alert.error,
      contrastText: COLORS.neutral.white,
    },
    success: {
      main: COLORS.alert.success,
    },
    background: {
      default: COLORS.neutral[100],
      paper: COLORS.neutral.white,
    },
    text: {
      primary: COLORS.neutral[900],
      secondary: COLORS.neutral[700],
      disabled: COLORS.neutral[500],
    },
    action: {
      active: COLORS.neutral[600],
      disabled: COLORS.neutral[300],
      hover: "#F0F0F0",
    },
    common: {
      black: COLORS.neutral[900],
      white: COLORS.neutral.white,
    },
  },
  typography: {
    fontFamily: TYPOGRAPHY.fontFamily,
    h1: TYPOGRAPHY.h1,
    h2: TYPOGRAPHY.h2,
    body1: TYPOGRAPHY.body1,
    body2: TYPOGRAPHY.body2,
    subtitle2: TYPOGRAPHY.subtitle,
  },
  shape: SHAPE,
  spacing: SPACING,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: SHAPE.borderRadius,
          fontWeight: TYPOGRAPHY.button.fontWeight,
          padding: "8px 16px",
        },
        containedPrimary: {
          backgroundColor: COLORS.alert.success,
          color: COLORS.neutral.white,
          "&:hover": {
            backgroundColor: "#166c2e",
          },
        },
        containedSecondary: {
          backgroundColor: COLORS.alert.error,
          color: COLORS.neutral.white,
          "&:hover": {
            backgroundColor: "#cc4127",
          },
        },
      },
    }
  },
  breakpoints: {
    values: {
      xs: 0,     // Mobile
      sm: 720,   // Tablet pequeno
      md: 960,   // Tablet grande / Desktop pequeno
      lg: 1280,  // Desktop médio
      xl: 1920,  // Desktop grande
    },
  },
});

export default theme;
