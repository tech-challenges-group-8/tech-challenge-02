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
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "../../../contexts/UserContext";
import type { Transaction } from "../../../lib/types";
import { transactionApi } from "../../../lib/transactionApi";
import { useStatementFilters } from "../../../hooks/useStatementFilters";
import { useTransactionFilter } from "../../../hooks/useTransactionFilter";
import {
  useTransactionPagination,
  useGroupedTransactions,
} from "../../../hooks/useTransactionPagination";

import FilterDialog from "./FilterDialog";
import Pagination from "./Pagination";
import TransactionList from "./TransactionList";

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

  // Filters
  const {
    filterType,
    setFilterType,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    description,
    setDescription,
    filterOpen,
    setFilterOpen,
    clearFilters,
  } = useStatementFilters();

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
  }, [user?.balance, user?.account, setTransactions]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const filteredTransactions = useTransactionFilter({
    transactions: initialTransactions || transactions,
    filterType,
    dateFrom,
    dateTo,
    minValue,
    maxValue,
    description,
  });

  // Pagination
  const { paginatedTransactions, totalPages } = useTransactionPagination(
    filteredTransactions,
    page,
    limit
  );

  // Group by month
  const groupedByMonth = useGroupedTransactions(paginatedTransactions);

  const handleClearFilters = () => {
    clearFilters();
    setPage(1);
  };

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
          onClick={handleClearFilters}
          sx={{
            mb: 2,
            color: theme.palette.text.secondary,
            textTransform: "none",
            fontSize: "0.875rem",
          }}
        >
          {t("statement.filter.clear") || "Limpar filtros"}
        </Button>

        <FilterDialog
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          dateFrom={dateFrom}
          dateTo={dateTo}
          minValue={minValue}
          maxValue={maxValue}
          description={description}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onMinValueChange={setMinValue}
          onMaxValueChange={setMaxValue}
          onDescriptionChange={setDescription}
          onClearFilters={handleClearFilters}
          theme={theme}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          theme={theme}
        />

        <TransactionList groupedTransactions={groupedByMonth} theme={theme} />
      </Box>
    </Box>
  );
}
