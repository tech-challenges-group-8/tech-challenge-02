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

import { useUser } from "../../../contexts/UserContext";
import { useTransactions } from "../../../hooks/useTransactions";
import { getCommonInputStyles } from "../../../styles/commonStyles";

import { LoadingButton, NumericInputField, PageTitle } from "../../ui";

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

  const commonInputStyles = getCommonInputStyles(theme);

  const handleFeedback = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedExtensions = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedExtensions.includes(selectedFile.type)) {
      handleFeedback(
        "error",
        "Apenas arquivos JPG, PNG ou PDF são permitidos"
      )();
      e.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      handleFeedback("error", "O arquivo deve ter no máximo 5MB")();
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
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
      description: description || "",
      anexo: file ? file.name : "",
    };

    try {
      await addTransaction(newTransaction);
      setType("");
      setValue("");
      setDescription("");
      setFile(null);

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
      <PageTitle
        sx={{
          marginBottom: "44px",
        }}
      >
        {t("newTransaction.title")}
      </PageTitle>

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
              "&.Mui-focused": {
                color: theme.palette.primary.main,
                top: "-15px",
                left: "-15px",
              },
              top: "-15px",
              left: "-10px",
            }}
            className="InputLabelCustom"
          >
            {t("newTransaction.typeLabel")}
          </InputLabel>
          <Select
            labelId="transaction-type-label"
            id="transaction-type-select"
            value={type}
            label={t("newTransaction.typeLabel") || "Tipo"}
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
            label={t("newTransaction.description")}
            type="text"
            fullWidth
            value={description}
            style={{ marginTop: theme.spacing(2) }}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 255 }}
            slotProps={{
              htmlInput: {
                maxLength: 255,
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
              mb: 2,
              width: { xs: "100%", sm: "400px" },
              "& .MuiOutlinedInput-notchedOutline legend": {
                display: "none",
              },
            }}
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
            error={!!error || (value !== "" && parseFloat(value) < 0.01)}
            helperText={error}
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
