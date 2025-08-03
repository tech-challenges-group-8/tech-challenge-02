import type { Meta, StoryObj } from "@storybook/react";

import { SPACING, SHAPE } from "..//styles/tokens";

const ThemeSpacingAndShape = () => {
  return (
    <div style={{ padding: "16px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Spacing and Shape
      </h1>

      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
        Spacing
      </h2>
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        {[1, 2, 3, 4].map((multiplier) => (
          <div
            key={multiplier}
            style={{
              width: `${SPACING * multiplier}px`,
              height: `${SPACING * multiplier}px`,
              backgroundColor: "#004D61",
              borderRadius: "4px",
            }}
          >
            {SPACING * multiplier}px
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
        Shape
      </h2>
      <div
        style={{
          width: "200px",
          height: "50px",
          backgroundColor: "#004D61",
          borderRadius: `${SHAPE.borderRadius}px`,
        }}
      >
        Border Radius: {SHAPE.borderRadius}px
      </div>
    </div>
  );
};

const meta = {
  title: "Tokens/Spacing and Shape",
  component: ThemeSpacingAndShape,
} satisfies Meta<typeof ThemeSpacingAndShape>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
