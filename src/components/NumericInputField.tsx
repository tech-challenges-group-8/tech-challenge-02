"use client";

import { TextField, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

interface NumericInputFieldProps {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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

  const MAX_ALLOWED_VALUE = 999999999.99;

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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      // Força exatamente 2 casas decimais ao sair do campo
      e.target.value = val.toFixed(2);
      onChange(e);
    }
  };

  return (
    <TextField
      value={value}
      onChange={(e) => {
        let val = e.target.value;

        // 1. Bloqueia sinais e caracteres inválidos
        if (val.includes("-")) return;

        // 2. Validação de casas decimais em tempo real
        if (val.includes(".")) {
          const [, fraction] = val.split(".");
          if (fraction && fraction.length > 2) return;
        }

        // 3. Validação do valor máximo (999.999.999,99)
        const numericValue = parseFloat(val);
        if (numericValue > MAX_ALLOWED_VALUE) return;

        onChange(e);
      }}
      onBlur={handleBlur} // Garante a máscara de 2 casas ao terminar de digitar
      placeholder={placeholder || t("newTransaction.valuePlaceholder")}
      type="number"
      label={t("newTransaction.valueLabel")}
      error={error}
      helperText={
        value && parseFloat(value) < 0.01
          ? t("validation.minAmount")
          : helperText
      }
      slotProps={{
        input: {
          style: { height: 48 },
        },
        htmlInput: {
          min: 0,
          step: 0.01,
          onKeyDown: (e: any) =>
            ["-", "e", "+"].includes(e.key) && e.preventDefault(),
        },
        inputLabel: {
          shrink: true,
          sx: {
            top: "-15px",
            left: "-12px",
            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },
          },
        },
      }}
      sx={{
        ...commonInputStyles,
        zIndex: 1,
        "& .MuiInputBase-input": {
          ...commonInputStyles["& .MuiInputBase-input"],
          textAlign: "center",
        },
        "& .MuiOutlinedInput-notchedOutline legend": {
          display: "none",
        },
        // marginTop: "25px",
        ...sx,
      }}
      disabled={disabled}
    />
  );
}