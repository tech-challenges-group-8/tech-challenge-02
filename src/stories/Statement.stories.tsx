import type { Meta, StoryObj } from '@storybook/react';

import { Statement } from '../components/features';

import { withI18n } from './decorators/withI18n';
import { withTheme } from './decorators/withTheme';
import { withUserContext } from './decorators/withUserContext';
import type { Transaction } from '../lib/types';

const mockTransactions: Transaction[] = [
  {
    id: "1",
    accountId: "1",
    date: "2024-05-15T10:00:00Z",
    type: "DEPOSIT",
    value: 5000,
  },
  {
    id: "2",
    accountId: "1",
    date: "2024-06-15T10:00:00Z",
    type: "TRANSFER",
    value: 5000.5,
  },
];

const meta = {
  title: "Components/Statement",
  component: Statement,
  decorators: [withTheme, withI18n, withUserContext],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initialTransactions: {
      description: "Array of initial transactions to display in the statement.",
    },
  },
} satisfies Meta<typeof Statement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialTransactions: mockTransactions,
  },
};

export const Empty: Story = {
  args: {
    initialTransactions: [],
  },
};
