import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { TYPOGRAPHY } from "..//styles/tokens";

const TypographySample: React.FC<{ name: string; style: any }> = ({
  name,
  style,
}) => {
  if (name === "fontFamily" || typeof style === "string") return false;

  const validStyle = Object.fromEntries(
    Object.entries(style).filter(([, value]) => {
      return typeof value === "string" || typeof value === "number";
    })
  );

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ ...validStyle, marginBottom: "8px" }}>{name}</div>
      <div style={{ fontSize: "14px", color: "#666" }}>
        {JSON.stringify(validStyle)}
      </div>
    </div>
  );
};

const ThemeTypography = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Typography
      </h1>
      {Object.entries(TYPOGRAPHY).map(([name, style]) => (
        <TypographySample key={name} name={name} style={style} />
      ))}
    </div>
  );
};

const meta = {
  title: "Tokens/Typography",
  component: ThemeTypography,
} satisfies Meta<typeof ThemeTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
