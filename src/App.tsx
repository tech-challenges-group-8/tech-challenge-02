import { lazy, Suspense, type ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedLayout from "./layouts/ProtectedLayout";
import LandingPage from "./pages/landingpage";
import PageLoader from "./components/ui/PageLoader";
import { SnackbarProvider } from "notistack";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Transactions = lazy(() => import("./pages/transactions"));
const Investments = lazy(() => import("./pages/investments"));
const Services = lazy(() => import("./pages/services"));

const LazyRoute = ({ Component }: { Component: ComponentType }) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const protectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/transactions", component: Transactions },
  { path: "/investments", component: Investments },
  { path: "/services", component: Services },
];

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
        <Route element={<ProtectedLayout />}>
          {protectedRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<LazyRoute Component={Component} />} />
          ))}
        </Route>
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
