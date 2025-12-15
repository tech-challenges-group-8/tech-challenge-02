import { Suspense } from "react";
import theme from "../../styles/theme";
import { Box } from "@mui/material";
import PageTitle from "../../components/PageTitle";

export default function Dashboard() {

  return (
    <Box
      sx={{
        borderRadius: theme.shape.borderRadius,
        width: "100%",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageTitle>Dashboard</PageTitle>
      <Suspense fallback="Loading Remote...">
        Substituir dashboard
      </Suspense>
    </Box>
  );
}
