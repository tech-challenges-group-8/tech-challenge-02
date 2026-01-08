
import { apiClient } from "./apiClient";
import type { Transaction, NewTransaction } from "./types";

const CACHE_TTL_MS = Number((import.meta as any)?.env?.VITE_CACHE_TTL_MS) || 30_000;
type CacheEntry = { timestamp: number; data: Transaction[] };
const transactionsCache = new Map<string, CacheEntry>();

export const transactionApi = {
  getTransactions: async (id: string) => {
    const cached = transactionsCache.get(id);
    const now = Date.now();
    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    const response = await apiClient.get(`/account/${id}/statement`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load transactions");
    }

    const sorted: Transaction[] = data.result.transactions.sort((a: Transaction, b: Transaction) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    transactionsCache.set(id, { timestamp: now, data: sorted });

    return sorted;
  },

  createTransaction: async (transaction: NewTransaction) => {
    const response = await apiClient.post("/account/transaction", transaction);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create transaction");
    }

    const savedTx: Transaction = data.result;

    const accountId = savedTx.accountId;
    const cached = transactionsCache.get(accountId);
    if (cached) {
      transactionsCache.set(accountId, { timestamp: Date.now(), data: [savedTx, ...cached.data] });
    }

    return savedTx;
  },

  deleteTransaction: async (transactionId: string, accountId: string) => {
    
    const response = await apiClient.delete(`/account/${accountId}/transaction/${transactionId}/`);

    if (!response.ok) {
      throw new Error("Failed to delete transaction");
    }

    const cached = transactionsCache.get(accountId);
    if (cached) {
      const filtered = cached.data.filter((t) => t.id !== transactionId);
      transactionsCache.set(accountId, { timestamp: Date.now(), data: filtered });
    }
  },

  updateTransaction: async (transaction: Transaction) => {
    const response = await apiClient.patch(
      `/account/${transaction.accountId}/transaction/${transaction.id}/`,
      transaction
    );

    if (!response.ok) {
      throw new Error("Failed to update transaction");
    }

    const accountId = transaction.accountId;
    const cached = transactionsCache.get(accountId);
    if (cached) {
      const updated = cached.data.map((t) => (t.id === transaction.id ? transaction : t));
      transactionsCache.set(accountId, { timestamp: Date.now(), data: updated });
    }

    return transaction;
  },
};
