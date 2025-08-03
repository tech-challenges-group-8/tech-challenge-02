
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
};

export type Transaction = {
  id: string;
  accountId: string;
  type: "DEPOSIT" | "TRANSFER";
  value: number;
  date: string;
};

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}