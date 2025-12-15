"use client";

import { Button, styled } from "@mui/material";

const CustomButton = styled(Button)(({ theme }) => ({
  width: "180px",
  height: "48px",
  borderRadius: `${theme.shape.borderRadius}px`,
  backgroundColor: theme.palette.action.active,
  color: theme.palette.common.white,
  fontWeight: 600,
  fontSize: "16px",
  border: `2px solid ${theme.palette.action.active}`,
  textTransform: "none",
  transition: "all 0.3s ease",
  padding: "0px",

  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.action.active,
  },
  [theme.breakpoints.down("lg")]: {
    width: "144px",
    height: "48px",
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    backgroundColor: theme.palette.common.black,
    border: `2px solid ${theme.palette.common.black}`,
  },
}));

export default CustomButton;
