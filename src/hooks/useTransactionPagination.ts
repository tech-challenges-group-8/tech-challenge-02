import { useMemo } from "react";
import type { Transaction } from "../lib/types";

export const useTransactionPagination = (
  transactions: Transaction[],
  page: number,
  limit: number
) => {
  const paginatedTransactions = useMemo(() => {
    return transactions.slice((page - 1) * limit, page * limit);
  }, [transactions, page, limit]);

  const totalPages = useMemo(() => {
    return Math.ceil(transactions.length / limit);
  }, [transactions.length, limit]);

  return { paginatedTransactions, totalPages };
};

export const useGroupedTransactions = (transactions: Transaction[]) => {
  return useMemo(() => {
    return transactions.reduce<Record<string, Transaction[]>>(
      (acc, transaction) => {
        const date = new Date(transaction.date);
        const monthLabel = date.toLocaleString("pt-BR", {
          month: "long",
          year: "numeric",
        });
        if (!acc[monthLabel]) acc[monthLabel] = [];
        acc[monthLabel].push(transaction);
        return acc;
      },
      {}
    );
  }, [transactions]);
};
