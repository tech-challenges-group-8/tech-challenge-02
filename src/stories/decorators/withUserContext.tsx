import React from 'react';

import { UserContext } from '../../contexts/UserContext';
import type { UserContextType } from '../../lib/types';

const mockUser = {
  id: '1',
  account: "1",
  name: 'John Doe',
  email: 'john.doe@example.com',
  balance: 1234.56,
  active: true,
};

const mockUserContext: UserContextType = {
  user: mockUser,
  setUser: () => {},
  transactions: [],
  setTransactions: () => {},
  refreshTransactions: async () => Promise.resolve()
};

export const withUserContext = (Story: React.ComponentType) => (
  <UserContext.Provider value={mockUserContext}>
    <Story />
  </UserContext.Provider>
);
