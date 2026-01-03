import { TextField, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getCommonInputStyles } from "../../../styles/commonStyles";

interface FilterDialogFieldsProps {
  dateFrom: string;
  dateTo: string;
  minValue: string;
  maxValue: string;
  description: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onMinValueChange: (value: string) => void;
  onMaxValueChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  theme: any;
}

export default function FilterDialogFields({
  dateFrom,
  dateTo,
  minValue,
  maxValue,
  description,
  onDateFromChange,
  onDateToChange,
  onMinValueChange,
  onMaxValueChange,
  onDescriptionChange,
  theme,
}: FilterDialogFieldsProps) {
  const { t } = useTranslation();
  const commonInputStyles = getCommonInputStyles(theme);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label={t("statement.filter.startDate")}
        type="date"
        fullWidth
        value={dateFrom}
        onChange={(e) => onDateFromChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{
          ...commonInputStyles,
          "& input[type='date']::-webkit-calendar-picker-indicator": {
            cursor: "pointer",
          },
        }}
        inputProps={{
          max: dateTo || undefined,
        }}
      />
      <TextField
        label={t("statement.filter.endDate")}
        type="date"
        fullWidth
        value={dateTo}
        onChange={(e) => onDateToChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{
          ...commonInputStyles,
          "& input[type='date']::-webkit-calendar-picker-indicator": {
            cursor: "pointer",
          },
        }}
        inputProps={{
          min: dateFrom || undefined,
        }}
      />
      <TextField
        label={t("statement.filter.minValue")}
        type="number"
        fullWidth
        value={minValue}
        onChange={(e) => onMinValueChange(e.target.value)}
        sx={commonInputStyles}
        inputProps={{
          min: 0,
          step: 0.01,
          max: maxValue || undefined,
        }}
      />
      <TextField
        label={t("statement.filter.maxValue")}
        type="number"
        fullWidth
        value={maxValue}
        onChange={(e) => onMaxValueChange(e.target.value)}
        sx={commonInputStyles}
        inputProps={{
          min: minValue || 0,
          step: 0.01,
        }}
      />
      <TextField
        label={t("statement.filter.description")}
        fullWidth
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        sx={commonInputStyles}
        placeholder={
          t("statement.filter.descriptionPlaceholder") ||
          "Digite parte da descrição..."
        }
      />
    </Box>
  );
}
