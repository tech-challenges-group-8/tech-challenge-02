import { styled } from "@mui/material";
import StyledButton from "./Button";

/**
 * CustomButton - Styled button for landing page
 * Used in header and call-to-action sections
 */
const CustomButton = styled(StyledButton)(({ theme }) => ({
  width: "180px",
  height: "48px",
  backgroundColor: theme.palette.action.active,
  color: theme.palette.common.white,
  border: `2px solid ${theme.palette.action.active}`,
  
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.action.active,
  },
  
  [theme.breakpoints.down("lg")]: {
    width: "144px",
  },
  
  [theme.breakpoints.down("sm")]: {
    backgroundColor: theme.palette.common.black,
    border: `2px solid ${theme.palette.common.black}`,
  },
}));

export default CustomButton;
