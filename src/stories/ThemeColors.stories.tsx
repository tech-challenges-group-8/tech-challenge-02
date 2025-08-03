import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { COLORS } from "..//styles/tokens";

interface ColorSampleProps {
  name: string;
  color: string;
}

const ColorSample: React.FC<ColorSampleProps> = ({ name, color }) => (
  <div style={{ marginBottom: "16px" }}>
    <div
      style={{
        backgroundColor: color,
        width: "100%",
        height: "50px",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "bold",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
      }}
    >
      {name}
    </div>
    <div style={{ marginTop: "8px", fontSize: "14px", color: "#333" }}>
      {color}
    </div>
  </div>
);

const ThemeColors = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Theme Colors
      </h1>
      {Object.entries(COLORS).map(([groupName, groupColors]) => (
        <div key={groupName} style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {groupName.charAt(0).toUpperCase() + groupName.slice(1)} Colors
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "16px",
            }}
          >
            {Object.entries(groupColors).map(([colorName, colorValue]) => (
              <ColorSample
                key={colorName}
                name={colorName}
                color={colorValue as string}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const meta = {
  title: "Tokens/Colors",
  component: ThemeColors,
} satisfies Meta<typeof ThemeColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
