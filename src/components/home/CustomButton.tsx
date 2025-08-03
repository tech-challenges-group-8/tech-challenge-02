"use client";

import { Button, styled } from "@mui/material";

const CustomButton = styled(Button)(({ theme }) => ({
  width: "180px",
  height: "48px",
  borderRadius: "8px",
  backgroundColor: "#47A138",
  color: "#FFFFFF",
  fontWeight: 600,
  fontSize: "16px",
  border: "2px solid #47A138",
  textTransform: "none",
  transition: "all 0.3s ease",
  padding: "0px",

  "&:hover": {
    backgroundColor: "transparent",
    color: "#47A138",
  },
  [theme.breakpoints.down("lg")]: {
    width: "144px",
    height: "48px",
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    backgroundColor: "#000000",
    border: "2px solid #000000",
  },
}));

export default CustomButton;
