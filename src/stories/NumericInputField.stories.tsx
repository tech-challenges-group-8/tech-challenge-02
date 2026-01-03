import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { NumericInputField } from '../components/ui';

import { withI18n } from './decorators/withI18n';
import { withTheme } from './decorators/withTheme';

const meta = {
  title: 'Components/NumericInputField',
  component: NumericInputField,
  decorators: [withTheme, withI18n],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    sx: { control: 'object' },
  },
} satisfies Meta<typeof NumericInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Enter amount',
    error: false,
    helperText: '',
    onChange: () => {}, // Added onChange to args
  },
  render: (args) => {
    const StoryComponent = () => { // Wrap in a functional component
      const [value, setValue] = useState(args.value);
      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
        args.onChange(event);
      };
      return <NumericInputField {...args} value={value} onChange={handleChange} />;
    };
    return <StoryComponent />;
  },
};

export const WithError: Story = {
  args: {
    value: 'abc',
    placeholder: 'Enter amount',
    error: true,
    helperText: 'Invalid input',
    onChange: () => {},
  },
  render: (args) => {
    const StoryComponent = () => { // Wrap in a functional component
      const [value, setValue] = useState(args.value);
      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
        args.onChange(event);
      };
      return <NumericInputField {...args} value={value} onChange={handleChange} />;
    };
    return <StoryComponent />;
  },
};

export const WithInitialValue: Story = {
  args: {
    value: '123.45',
    placeholder: 'Enter amount',
    error: false,
    helperText: '',
    onChange: () => {},
  },
  render: (args) => {
    const StoryComponent = () => { // Wrap in a functional component
      const [value, setValue] = useState(args.value);
      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
        args.onChange(event);
      };
      return <NumericInputField {...args} value={value} onChange={handleChange} />;
    };
    return <StoryComponent />;
  },
};
