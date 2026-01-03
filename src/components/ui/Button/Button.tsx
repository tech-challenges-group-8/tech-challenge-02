import { Button as MuiButton, styled } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";

export interface StyledButtonProps extends MuiButtonProps {
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
}

/**
 * Base Button component - Extends MUI Button with consistent styling
 */
const StyledButton = styled(MuiButton)<StyledButtonProps>(({ theme }) => ({
  borderRadius: `${theme.shape.borderRadius}px`,
  textTransform: "none",
  fontWeight: 600,
  fontSize: "16px",
  transition: "all 0.3s ease",
  height: "48px",
  
  "&.MuiButton-contained": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.info?.main || "#006B80",
    },
  },
  
  "&.MuiButton-outlined": {
    border: `2px solid ${theme.palette.action.active}`,
    color: theme.palette.action.active,
    "&:hover": {
      backgroundColor: theme.palette.action.active,
      color: theme.palette.common.white,
    },
  },
}));

export default StyledButton;
