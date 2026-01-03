import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import FilterDialogFields from "./FilterDialogFields";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
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
  onClearFilters: () => void;
  theme: any;
}

export default function FilterDialog({
  open,
  onClose,
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
  onClearFilters,
  theme,
}: FilterDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("statement.filter.title")}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <FilterDialogFields
          dateFrom={dateFrom}
          dateTo={dateTo}
          minValue={minValue}
          maxValue={maxValue}
          description={description}
          onDateFromChange={onDateFromChange}
          onDateToChange={onDateToChange}
          onMinValueChange={onMinValueChange}
          onMaxValueChange={onMaxValueChange}
          onDescriptionChange={onDescriptionChange}
          theme={theme}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClearFilters} color="secondary" variant="outlined">
          {t("statement.filter.clear")}
        </Button>
        <Button onClick={onClose} variant="contained">
          {t("statement.filter.apply") || "Aplicar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
