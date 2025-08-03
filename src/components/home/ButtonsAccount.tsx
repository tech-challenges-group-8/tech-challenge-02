"use client";

import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import type { VariantType } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { authApi } from "../../lib/authApi";
import { userApi } from "../../lib/userApi";

import CustomButton from "./CustomButton";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { useNavigate } from "react-router-dom";

export default function ButtonsAccount() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      localStorage.setItem("token", data.result.token); // Store the token
      handleClickVariant("success", t("account.loginSuccess"))();
      setIsLoginOpen(false);
      console.log("go to dashboard");
      navigate("/dashboard");
    } catch (err: any) {
      setError(t("account.loginFailed") + err.message);
      console.error(err);
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
      const data = await userApi.createUser({
        username: userName,
        email: email,
        password: password,
      });
      setIsRegisterOpen(false);
      handleClickVariant("success", t("account.registerSuccess"))();
    } catch (err: any) {
      setError(t("account.registerFailed") + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <Box sx={{ display: { xs: "none", sm: "none", lg: "block" } }}>
        <CustomButton
          variant="contained"
          onClick={() => {
            setIsRegisterOpen(true);
            clearFields();
          }}
          disabled={isLoading}
        >
          {t("account.openMyAccount")}
        </CustomButton>
      </Box>

      <Box sx={{ display: { xs: "block", sm: "block", lg: "none" } }}>
        <CustomButton
          variant="contained"
          onClick={() => {
            setIsRegisterOpen(true);
            clearFields();
          }}
          disabled={isLoading}
        >
          {t("account.openAccount")}
        </CustomButton>
      </Box>

      <CustomButton
        variant="contained"
        onClick={() => {
          setIsLoginOpen(true);
          clearFields();
        }}
        disabled={isLoading}
      >
        {t("account.alreadyHaveAccount")}
      </CustomButton>

      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        isLoading={isLoading}
        error={error}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        t={t}
      />

      <RegisterDialog
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        isLoading={isLoading}
        error={error}
        userName={userName}
        email={email}
        password={password}
        acceptedTerms={acceptedTerms}
        setUserName={setUserName}
        setEmail={setEmail}
        setPassword={setPassword}
        setAcceptedTerms={setAcceptedTerms}
        handleRegister={handleRegister}
        t={t}
      />
    </Box>
  );
}
