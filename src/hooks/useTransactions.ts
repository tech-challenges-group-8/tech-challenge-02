import { transactionApi } from "../lib/transactionApi";
import { useUser } from "../contexts/UserContext";
import type { Transaction, User, NewTransaction } from "../lib/types";

export const useTransactions = () => {
  const { user, setUser, transactions, setTransactions } = useUser();

  // Function to calculate new balance
  const calculateNewBalance = (
    currentUser: User,
    oldTx?: Transaction,
    newTx?: Transaction
  ): number => {
    let balance = currentUser.balance;

    if (oldTx) {
      balance += oldTx.type === "DEPOSIT" ? -oldTx.value : oldTx.value;
    }

    if (newTx) {
      balance += newTx.type === "DEPOSIT" ? newTx.value : -newTx.value;
    }

    return balance;
  };

  // Add Transaction
  const addTransaction = async (tx: NewTransaction) => {
    try {
      const savedTx = await transactionApi.createTransaction(tx);

      setTransactions([savedTx, ...transactions]);
      if (user) {
        const newBalance =
          savedTx.type === "DEPOSIT"
            ? user.balance + savedTx.value
            : user.balance - savedTx.value;
        setUser({ ...user, balance: newBalance });
      }
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
    }
  };

  // Delete Transaction
  const deleteTransaction = async (transaction: Transaction) => {
    //const txToDelete = transactions.find((t) => t.id === id);
    const txToDelete = transaction;
    if (!txToDelete) return;

    try {
      await transactionApi.deleteTransaction(transaction.id, transaction.accountId);

      setTransactions(transactions.filter((t) => t.id !== id));
      if (user) {
        const updatedBalance =
          txToDelete.type === "DEPOSIT"
            ? user.balance - txToDelete.value
            : user.balance + txToDelete.value;
        setUser({ ...user, balance: updatedBalance });
      }
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  };

  // Edit Transaction
  const editTransaction = async (updatedTx: Transaction) => {
    //const oldTx = transactions.find((t) => t.id === updatedTx.id);
    const oldTx = updatedTx;
    if (!oldTx) return;

    try {
      const savedTx = await transactionApi.updateTransaction(updatedTx);

      setTransactions(
        transactions.map((t) => (t.id === savedTx.id ? savedTx : t))
      );
      if (user) {
        setUser({
          ...user,
          balance: calculateNewBalance(user, oldTx, savedTx),
        });
      }
    } catch (error) {
      console.error("Erro ao editar transação:", error);
    }
  };

  return {
    addTransaction,
    deleteTransaction,
    editTransaction,
    setTransactions,
  };
};
