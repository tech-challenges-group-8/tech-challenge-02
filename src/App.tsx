import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedLayout from "./layouts/ProtectedLayout";
import LandingPage from "./pages/landingpage";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Investiments from "./pages/investiments";
import Services from "./pages/services";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path="/" element={<LandingPage />} />

      {/* PROTECTED ROUTES */}
      {/* All routes nested inside ProtectedLayout will share its UI */}
      {/* and will only be accessible if the user is authenticated */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/investiments" element={<Investiments />} />
        <Route path="/services" element={<Services />} />
      </Route>
    </Routes>
  );
}

export default App;
