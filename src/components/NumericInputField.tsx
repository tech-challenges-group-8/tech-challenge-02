"use client";

import { TextField, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

interface NumericInputFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  sx?: object;
  disabled?: boolean;
}

export default function NumericInputField({
  value,
  onChange,
  placeholder,
  error,
  helperText,
  sx,
  disabled,
}: NumericInputFieldProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const commonInputStyles = {
    backgroundColor: "#fff",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "8px",
    "& .MuiInputBase-input": {
      padding: "12px 8px",
      height: "24px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder || t("newTransaction.valuePlaceholder")}
      type="number"
      error={error}
      helperText={helperText}
      InputProps={{
        inputProps: { min: 0.01, step: 0.01 },
        style: {
          height: 48,
        },
      }}
      sx={{
        ...commonInputStyles,
        zIndex: 1,
        "& .MuiInputBase-input": {
          ...commonInputStyles["& .MuiInputBase-input"],
          textAlign: "center",
        },
        ...sx,
      }}
      disabled={disabled}
    />
  );
}
