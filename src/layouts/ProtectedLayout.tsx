import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import BalanceCard from "../components/BalanceCard";
import CardBackground from "../components/CardBackground";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Statement from "../components/Statement";
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
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          autoHideDuration={5000} // 5 seconds
        >
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
                  <CardBackground>
                    <Outlet />
                  </CardBackground>
                </Box>
                <Statement />
              </Box>
            </Box>
          </UserProvider>
        </SnackbarProvider>
      </Suspense>
    </ThemeProvider>
  );
};

export default ProtectedLayout;
