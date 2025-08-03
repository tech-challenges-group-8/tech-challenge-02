import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Dashboard from "./pages/dashboard";
import "./App.css";
import ProtectedLayout from "./layouts/ProtectedLayout";

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
        </Route>
      </Routes>
  );
}

export default App;
