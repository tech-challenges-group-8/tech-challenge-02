import type { Meta, StoryObj } from '@storybook/react';

import { Header } from '../components/features';

import { withI18n } from './decorators/withI18n';
import { withUserContext } from './decorators/withUserContext';
import { withRouter } from './decorators/withRouter';

const meta = {
  title: "Layout/Header",
  component: Header,
  decorators: [withI18n, withUserContext, withRouter],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
