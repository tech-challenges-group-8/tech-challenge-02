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
import { useTransactions } from "../hooks/useTransactions";
import { transactionApi } from "../lib/transactionApi";

import TransactionItem from "./TransactionItem";
import type { Transaction } from "../lib/types";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";

interface StatementProps {
  initialTransactions?: Transaction[];
}

export default function Statement({ initialTransactions }: StatementProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { user } = useUser();
  const { setTransactions } = useTransactions();
  const [transactions, setTransactionsInner] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  //Filtros
  const [filterType, setFilterType] = useState<string>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");
  const [id, setId] = useState<string>("");
  //end Filtros
  const filteredTransactions = (initialTransactions || transactions).filter(
    (t) =>
      (filterType === "all" || t.type === filterType) &&
      (!dateFrom || new Date(t.date) >= new Date(dateFrom)) &&
      (!dateTo || new Date(t.date) <= new Date(dateTo)) &&
      (!minValue || t.value >= Number(minValue)) &&
      (!maxValue || t.value <= Number(maxValue)) &&
      (!id || t.id?.toLowerCase().includes(id.toLowerCase())) // alterar por description
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

  // const displayTransactions = initialTransactions || transactions;

  // const uniqueTransactions = Array.from(
  //   new Map(displayTransactions.map((t) => [t.id, t])).values()
  // );
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
          sx={{ mb: 2 }}
        >
          {t("statement.filter.title")}
        </Button>
        <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
          <DialogTitle>{t("statement.filter.title")}</DialogTitle>
          <DialogContent>
            <TextField
              label={t("statement.filter.startDate")}
              type="date"
              fullWidth
              value={dateFrom}
              style={{ marginTop: theme.spacing(2) }}
              onChange={(e) => setDateFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label={t("statement.filter.endDate")}
              type="date"
              fullWidth
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label={t("statement.filter.minValue")}
              type="number"
              fullWidth
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label={t("statement.filter.maxValue")}
              type="number"
              fullWidth
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label={t("statement.filter.description")}
              fullWidth
              value={id}
              onChange={(e) => setId(e.target.value)}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFilterOpen(false)}>Fechar</Button>
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
                <Box key={tx.id} display="flex" alignItems="center">
                  <TransactionItem tx={tx} />
                  {tx.attachmentUrl && (
                    <IconButton
                      component="a"
                      href={tx.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ ml: 1 }}
                      title="Baixar anexo"
                    >
                      <AttachFileIcon color="primary" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
