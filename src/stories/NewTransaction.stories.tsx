import type { Meta, StoryObj } from '@storybook/react';

import { NewTransaction } from '../components/features';

import { withI18n } from './decorators/withI18n';
import { withTheme } from './decorators/withTheme';
import { withUserContext } from './decorators/withUserContext';

const meta = {
  title: 'Components/NewTransaction',
  component: NewTransaction,
  decorators: [withTheme, withI18n, withUserContext],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewTransaction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
