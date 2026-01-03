/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

import { userApi } from "../lib/userApi";
import { transactionApi } from "../lib/transactionApi";
import type { UserContextType, User, Transaction } from "../lib/types";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const normalizeUser = (u: any): User => ({
    ...u,
    account: u.account[0].id,
    balance: u.transactions
      ? u.transactions.reduce((sum: number, t: any) => sum + Number(t.value), 0)
      : u.balance != null
      ? Number(u.balance)
      : 0,
  });

  useEffect(() => {
    const loadUserFromCookies = async () => {
      try {
        const userData = await userApi.getUserSession();
        const newUser = normalizeUser(userData);
        setUser(newUser);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setUser(null);
        localStorage.removeItem("token")
      }
    };

    loadUserFromCookies();
  }, []);

  const refreshTransactions = useCallback(async () => {
    if (!user?.account) {
      setTransactions([]);
      return;
    }

    try {
      const transactionsData = await transactionApi.getTransactions(user.account);
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
      setTransactions([]);
    }
  }, [user?.account]);

  useEffect(() => {
    if (user?.account) {
      refreshTransactions();
    }
  }, [user?.account, refreshTransactions]);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      transactions,
      setTransactions,
      refreshTransactions,
    }),
    [user, transactions, refreshTransactions]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
