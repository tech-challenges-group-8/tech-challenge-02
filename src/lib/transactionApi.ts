
import { apiClient } from "./apiClient";
import type { Transaction, NewTransaction } from "./types";

export const transactionApi = {
  getTransactions: async (id: string) => {
    const response = await apiClient.get(`/account/${id}/statement`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load transactions");
    }

    return data.result.transactions.sort((a: Transaction, b: Transaction) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  },

  createTransaction: async (transaction: NewTransaction) => {
    const response = await apiClient.post("/account/transaction", transaction);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create transaction");
    }

    return data.result;
  },

  deleteTransaction: async (transactionId: string, accountId: string) => {
    
    const response = await apiClient.delete(`/account/${accountId}/transaction/${transactionId}/`);

    if (!response.ok) {
      throw new Error("Failed to delete transaction");
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

    return transaction;
  },
};
