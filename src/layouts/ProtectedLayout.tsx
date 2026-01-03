import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Box } from "@mui/material";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { BalanceCard, Header, Sidebar, Statement } from "../components/features";
import { UserProvider } from "../contexts/UserContext";
import { useAuth } from "../hooks/useAuth";
import theme from "../styles/theme";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to the home page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the layout with the nested route content
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <UserProvider>
          <Box>
            <Header />
            <Box
              sx={{
                display: "flex",
                backgroundColor: theme.palette.background.default,
                padding: "16px",
                gap: "16px",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  lg: "row",
                },
              }}
            >
              <Sidebar />
              <Box
                sx={{
                  display: "grid",
                  gridGap: "16px",
                  width: {
                    xs: `calc(100% - ${theme.spacing(2)})`,
                    md: "100%",
                  },
                }}
              >
                <BalanceCard />
                <Outlet />
              </Box>
              <Statement />
            </Box>
          </Box>
        </UserProvider>
      </Suspense>
    </ThemeProvider>
  );
};

export default ProtectedLayout;
