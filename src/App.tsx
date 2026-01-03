import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedLayout from "./layouts/ProtectedLayout";
import LandingPage from "./pages/landingpage";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Investments from "./pages/investments";
import Services from "./pages/services";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={5000} // 5 seconds
    >
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<LandingPage />} />

        {/* PROTECTED ROUTES */}
        {/* All routes nested inside ProtectedLayout will share its UI */}
        {/* and will only be accessible if the user is authenticated */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
