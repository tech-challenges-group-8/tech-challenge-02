"use client";

import { Box } from "@mui/material";
import React from "react";

interface BoxMatrixBackgroundProps {
  matrix: number[][];
  colors: string[];
  position: "top-right" | "bottom-left";
  boxSize?: number;
  borderRadiusIndex?: number;
}

const BoxMatrixBackground: React.FC<BoxMatrixBackgroundProps> = ({
  matrix,
  colors,
  position,
  boxSize = 45,
  borderRadiusIndex,
}) => {
  const flatMatrix = matrix.flat();

  const sxProps =
    position === "top-right"
      ? { top: 0, right: 0 }
      : { bottom: 0, left: 0 };

  return (
    <Box
      sx={{
        position: "absolute",
        ...sxProps,
        display: "grid",
        gridTemplateColumns: `repeat(4, ${boxSize}px)`,
        gridTemplateRows: `repeat(4, ${boxSize}px)`,
        zIndex: 0,
      }}
    >
      {flatMatrix.map((colorIndex, i) => (
        <Box
          key={i}
          sx={{
            width: boxSize,
            height: boxSize,
            backgroundColor: colors[colorIndex] || "#cbcbcb",
            borderRadius: i === borderRadiusIndex ? 2 : "inherit",
          }}
        />
      ))}
    </Box>
  );
};

export default BoxMatrixBackground;
