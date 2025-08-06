import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import type { VariantType } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "../contexts/UserContext";
import { useTransactions } from "../hooks/useTransactions";

import LoadingButton from "./LoadingButton";
import NumericInputField from "./NumericInputField";

const TRANSACTION_TYPES = (t: any) => [
  { value: "DEPOSIT", label: t("newTransaction.typeDeposit") },
  { value: "TRANSFER", label: t("newTransaction.typeTransfer") },
];

export default function NewTransaction() {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { user } = useUser();
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

  const handleFeedback = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!type) {
      setError(t("newTransaction.errorSelectType"));
      return;
    }

    const parsedValue = parseFloat(value);
    if (!value || isNaN(parsedValue) || parsedValue <= 0) {
      setError(t("newTransaction.errorInvalidValue"));
      return;
    }

    setIsSubmitting(true);
    setError("");

    const newTransaction = {
      accountId: user?.account || "",
      type: type as "DEPOSIT" | "TRANSFER",
      value: parsedValue,
    };

    try {
      await addTransaction(newTransaction);
      setType("");
      setValue("");

      handleFeedback("success", "Transação cadastrada")();
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
      setError("Erro ao adicionar transação.");
      handleFeedback("error", "Erro ao adicionar transação")();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#dee9ea"
        mb={2}
        sx={{ color: { xs: theme.palette.primary.main, sm: "#dee9ea" } }}
      >
        {t("newTransaction.title")}
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <FormControl
          sx={{
            width: { xs: "100%", sm: "355px" },
            alignSelf: "flex-start",
          }}
        >
          <InputLabel
            id="transaction-type-label"
            sx={{
              color: type ? theme.palette.primary.main : undefined,
              "&.Mui-focused": { color: theme.palette.primary.main },
            }}
          >
            {t("newTransaction.typeLabel")}
          </InputLabel>
          <Select
            labelId="transaction-type-label"
            id="transaction-type-select"
            value={type}
            label={t("newTransaction.typeLabel")}
            onChange={(e) => {
              setType(e.target.value);
              if (error) setError("");
            }}
            sx={{
              ...commonInputStyles,
              height: "48px",
              width: { xs: "100%", sm: "400px" },
              "& .MuiSelect-icon": { color: theme.palette.primary.main },
            }}
            disabled={isSubmitting}
          >
            {TRANSACTION_TYPES(t).map((transactionType) => (
              <MenuItem
                key={transactionType.value}
                value={transactionType.value}
              >
                {transactionType.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" flexDirection="column" gap={3}>
          <NumericInputField
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            placeholder={t("newTransaction.valuePlaceholder")}
            sx={{
              zIndex: 1,
              width: { xs: "100%", sm: "400px" },
              "& .MuiInputBase-input": {
                textAlign: "center",
              },
            }}
            error={!!error}
            disabled={isSubmitting}
          />
        </Box>

        {error && (
          <Typography color="error" variant="caption" mt={-1} mb={1}>
            {error}
          </Typography>
        )}

        <LoadingButton
          onClick={handleSubmit}
          isSubmitting={isSubmitting}
          loadingText={t("newTransaction.loadingButton")}
          sx={{ width: { xs: "100%", sm: "250px" } }}
        >
          {t("newTransaction.completeButton")}
        </LoadingButton>
      </Box>
    </>
  );
}
