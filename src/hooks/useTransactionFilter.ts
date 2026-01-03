import { useMemo } from "react";
import type { Transaction } from "../lib/types";

const parseDate = (dateString: string) => {
  if (!dateString) return null;

  if (dateString.includes("T")) {
    return new Date(dateString);
  }

  if (dateString.includes("-") && dateString.length === 10) {
    return new Date(dateString + "T00:00:00.000Z");
  }

  const parts = dateString.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  return new Date(dateString);
};

const formatDateForComparison = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

interface UseTransactionFilterProps {
  transactions: Transaction[];
  filterType: string;
  dateFrom: string;
  dateTo: string;
  minValue: string;
  maxValue: string;
  description: string;
}

export const useTransactionFilter = ({
  transactions,
  filterType,
  dateFrom,
  dateTo,
  minValue,
  maxValue,
  description,
}: UseTransactionFilterProps) => {
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
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
    });
  }, [transactions, filterType, dateFrom, dateTo, minValue, maxValue, description]);

  // Remove duplicates
  const uniqueTransactions = useMemo(() => {
    return Array.from(
      new Map(filteredTransactions.map((t) => [t.id, t])).values()
    );
  }, [filteredTransactions]);

  return uniqueTransactions;
};
