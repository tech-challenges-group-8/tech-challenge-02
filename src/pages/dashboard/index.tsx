import React, { Suspense } from "react";
import theme from "../../styles/theme";
import { Box } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DashboardApp = React.lazy(() => import("dashboard/DashboardApp"));

export default function Dashboard() {
  return (
    <Box
      sx={{
        borderRadius: theme.shape.borderRadius,
        width: "100%",
        minHeight: "400px",
        display: "flex",
      }}
    >
      <Suspense fallback="Loading Remote...">
        <DashboardApp />
      </Suspense>
    </Box>
  );
}
