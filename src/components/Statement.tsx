"use client";

import {
  Box,
  Typography,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "../contexts/UserContext";
import TransactionItem from "./TransactionItem";
import type { Transaction } from "../lib/types";
import { getCommonInputStyles } from "../styles/commonStyles";

import { transactionApi } from "../lib/transactionApi";

interface StatementProps {
  initialTransactions?: Transaction[];
}

export default function Statement({ initialTransactions }: StatementProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { user, setTransactions } = useUser();
  const [transactions, setTransactionsInner] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  // Get default date range (last 30 days)
  const getDefaultDateRange = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    return {
      from: thirtyDaysAgo.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0],
    };
  };

  // Helper function to parse dd/mm/yyyy to Date object
  const parseDate = (dateString: string) => {
    if (!dateString) return null;

    // Check if it's already in ISO format (yyyy-mm-dd)
    if (dateString.includes("-") && dateString.length === 10) {
      return new Date(dateString);
    }

    // Handle dd/mm/yyyy format
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    return new Date(dateString);
  };

  // Helper function to format date for comparison
  const formatDateForComparison = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  //Filtros
  const [filterType, setFilterType] = useState<string>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<string>(getDefaultDateRange().from);
  const [dateTo, setDateTo] = useState<string>(getDefaultDateRange().to);
  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  //end Filtros

  const commonInputStyles = getCommonInputStyles(theme);

  const clearFilters = () => {
    const defaultRange = getDefaultDateRange();
    setFilterType("all");
    setDateFrom(defaultRange.from);
    setDateTo(defaultRange.to);
    setMinValue("");
    setMaxValue("");
    setDescription("");
    setPage(1);
  };

  const filteredTransactions = (initialTransactions || transactions).filter(
    (t) => {
      const transactionDate = parseDate(t.date);
      const fromDate = dateFrom ? parseDate(dateFrom) : null;
      const toDate = dateTo ? parseDate(dateTo) : null;

      return (
        (filterType === "all" || t.type === filterType) &&
        (!fromDate ||
          !transactionDate ||
          formatDateForComparison(transactionDate) >=
            formatDateForComparison(fromDate)) &&
        (!toDate ||
          !transactionDate ||
          formatDateForComparison(transactionDate) <=
            formatDateForComparison(toDate)) &&
        (!minValue || t.value >= Number(minValue)) &&
        (!maxValue || t.value <= Number(maxValue)) &&
        (!description ||
          t.description?.toLowerCase().includes(description.toLowerCase()))
      );
    }
  );

  const loadTransactions = useCallback(async () => {
    if (!user?.account) {
      setTransactions([]);
      return;
    }

    try {
      const transactionsData = await transactionApi.getTransactions(
        user.account
      );
      setTransactions(transactionsData);
      setTransactionsInner(transactionsData);
    } catch (error) {
      console.error("Erro de rede ao carregar transações:", error);
      setTransactions([]);
    }
  }, [user?.balance]);

  // useEffect to load transactions
  useEffect(() => {
    loadTransactions();
  }, [user]);

  const uniqueTransactions = Array.from(
    new Map(filteredTransactions.map((t) => [t.id, t])).values()
  );

  const paginatedTransactions = uniqueTransactions.slice(
    (page - 1) * limit,
    page * limit
  );

  const groupedByMonth = paginatedTransactions.reduce<
    Record<string, Transaction[]>
  >((acc, transaction) => {
    const monthLabel = new Date(transaction.date).toLocaleString("default", {
      month: "long",
    });
    if (!acc[monthLabel]) acc[monthLabel] = [];
    acc[monthLabel].push(transaction);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        width: { xs: `calc(100% - ${theme.spacing(2)})`, lg: "400px" },
        height: {
          xs: "400px",
          md: `calc(100vh - 64px - ${theme.spacing(2)} * 2)`,
        },
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        paddingX: { xs: 1, md: 2 },
        paddingY: { xs: 0.5, md: 1 },
      }}
    >
      <Box
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={theme.spacing(2)}
          color={theme.palette.primary.main}
        >
          {t("statement.title")}
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel id="type-filter-label">Tipo</InputLabel>
          <Select
            labelId="type-filter-label"
            value={filterType}
            label="Tipo"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="all">{t("statement.all")}</MenuItem>
            <MenuItem value="TRANSFER">{t("statement.transfer")}</MenuItem>
            <MenuItem value="DEPOSIT">{t("statement.deposit")}</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => setFilterOpen(true)}
          sx={{ mb: 1 }}
        >
          {t("statement.filter.title")}
        </Button>
        <Button
          variant="text"
          onClick={clearFilters}
          sx={{
            mb: 2,
            color: theme.palette.text.secondary,
            textTransform: "none",
            fontSize: "0.875rem",
          }}
        >
          {t("statement.filter.clear") || "Limpar filtros"}
        </Button>
        <Dialog
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{t("statement.filter.title")}</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label={t("statement.filter.startDate")}
                type="date"
                fullWidth
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
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
                onChange={(e) => setDateTo(e.target.value)}
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
                onChange={(e) => setMinValue(e.target.value)}
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
                onChange={(e) => setMaxValue(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
                sx={commonInputStyles}
                placeholder={
                  t("statement.filter.descriptionPlaceholder") ||
                  "Digite parte da descrição..."
                }
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button onClick={clearFilters} color="secondary" variant="outlined">
              {t("statement.filter.clear")}
            </Button>
            <Button onClick={() => setFilterOpen(false)} variant="contained">
              {t("statement.filter.apply") || "Aplicar"}
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
          gap={1}
          style={{ marginBottom: theme.spacing(1) }}
        >
          {Array.from(
            { length: Math.ceil(uniqueTransactions.length / limit) },
            (_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "contained" : "outlined"}
                onClick={() => setPage(i + 1)}
                sx={{ minWidth: 36, px: 0 }}
              >
                {i + 1}
              </Button>
            )
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&:hover::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.main,
            },
            "&:hover::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {Object.entries(groupedByMonth).map(([month, monthTransactions]) => (
            <Box key={month} mb={theme.spacing(2)}>
              <Typography
                fontWeight="bold"
                textTransform="capitalize"
                color={theme.palette.primary.main}
                mb={theme.spacing(1)}
              >
                {month}
              </Typography>
              {monthTransactions.map((tx) => (
                <Box key={tx.description} display="flex" alignItems="center">
                  <TransactionItem tx={tx} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
