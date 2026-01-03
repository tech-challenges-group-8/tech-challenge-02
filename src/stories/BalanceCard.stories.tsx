import type { Meta, StoryObj } from '@storybook/react';

import { BalanceCard } from '../components/features';

import { withI18n } from './decorators/withI18n';
import { withTheme } from './decorators/withTheme';
import { withUserContext } from './decorators/withUserContext';

const meta = {
  title: 'Components/BalanceCard',
  component: BalanceCard,
  decorators: [withTheme, withI18n, withUserContext],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BalanceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
