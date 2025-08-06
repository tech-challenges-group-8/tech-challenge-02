"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useUser } from "../contexts/UserContext";
import TransactionItem from "./TransactionItem";
import type { Transaction } from "../lib/types";

interface StatementProps {
  initialTransactions?: Transaction[];
}

export default function Statement({ initialTransactions }: StatementProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { transactions } = useUser();

  const displayTransactions = initialTransactions || transactions;

  const uniqueTransactions = Array.from(
    new Map(displayTransactions.map((t) => [t.id, t])).values()
  );

  const groupedByMonth = uniqueTransactions.reduce<
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
                <TransactionItem key={tx.id} tx={tx} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
