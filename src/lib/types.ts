export interface User {
  account: string;
  name: string;
  email: string;
  balance: number;
  active: boolean;
}

export type NewTransaction = {
  accountId: string;
  type: "DEPOSIT" | "TRANSFER";
  value: number;
  anexo?: string | null;
  description?: string;
};

export type Transaction = {
  id: string;
  accountId: string;
  type: "DEPOSIT" | "TRANSFER";
  value: number;
  date: string;
  description?: string;
  anexo?: string;
};

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  refreshTransactions: () => Promise<void>;
}