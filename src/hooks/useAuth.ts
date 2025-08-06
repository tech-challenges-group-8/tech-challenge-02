import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import type { VariantType } from "notistack";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { authApi } from "../lib/authApi";
import { userApi } from "../lib/userApi";

export const useAuth = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const clearFields = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setAcceptedTerms(false);
    setError("");
  };

  const handleClickVariant = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant });
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      // Verify token by trying to get user session
      await userApi.getUserSession();
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Token validation failed:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError(t("account.fillAllFields"));
      setIsLoading(false);
      return;
    }

    try {
      const data = await authApi.login(email, password);
      localStorage.setItem("token", data.result.token);
      setIsAuthenticated(true);
      handleClickVariant("success", t("account.loginSuccess"))();
      navigate("/dashboard");
      return { success: true };
    } catch (err: any) {
      setError(t("account.loginFailed") + err.message);
      console.error(err);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!userName || !email || !password) {
      setError(t("account.fillAllFields"));
      setIsLoading(false);
      return;
    }

    if (!acceptedTerms) {
      setError(t("account.acceptTerms"));
      setIsLoading(false);
      return;
    }

    try {
      await userApi.createUser({
        username: userName,
        email: email,
        password: password,
      });
      handleClickVariant("success", t("account.registerSuccess"))();
      return { success: true };
    } catch (err: any) {
      setError(t("account.registerFailed") + err.message);
      console.error(err);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return {
    userName,
    email,
    password,
    acceptedTerms,
    error,
    isLoading,
    isAuthenticated,
    setUserName,
    setEmail,
    setPassword,
    setAcceptedTerms,
    clearFields,
    handleLogin,
    handleRegister,
    checkAuthStatus,
    logout,
    t,
  };
};
