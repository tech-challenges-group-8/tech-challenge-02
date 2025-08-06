import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
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
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
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

    const formData = new FormData();
    formData.append("accountId", user?.account || "");
    formData.append("type", type as "DEPOSIT" | "TRANSFER");
    formData.append("value", parsedValue.toString());
    if (file) {
      formData.append("attachment", file);
    }

    const newTransaction = {
      accountId: user?.account || "",
      type: type as "DEPOSIT" | "TRANSFER",
      value: parsedValue,
      description: description || '',
      anexo: file ? file.name : '',
    };

    try {
      await addTransaction(newTransaction);
      setType("");
      setValue("");
      setDescription("");
      setFile(null)

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
          <TextField
            label={t("statement.filter.description") || "Descrição"}
            type="text"
            fullWidth
            value={description || ""}
            style={{ marginTop: theme.spacing(2) }}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
              sx={{
                width: { xs: "100%", sm: "250px" },
                alignSelf: "flex-start",
              }}
            >
              {file ? file.name : "Anexar arquivo"}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
            </Button>
            {file && (
              <IconButton
                aria-label="Remover anexo"
                onClick={() => setFile(null)}
                disabled={isSubmitting}
                sx={{ color: theme.palette.error.main }}
              >
                <ClearIcon />
              </IconButton>
            )}
          </Box>
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
