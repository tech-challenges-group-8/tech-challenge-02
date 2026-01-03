"use client";

import { Box } from "@mui/material";
import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import { CustomButton } from "../ui";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";

export default function ButtonsAccount() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  const {
    userName,
    email,
    password,
    acceptedTerms,
    error,
    isLoading,
    setUserName,
    setEmail,
    setPassword,
    setAcceptedTerms,
    clearFields,
    handleLogin,
    handleRegister,
    t,
  } = useAuth();

  const onLogin = async (e: React.FormEvent) => {
    const result = await handleLogin(e);
    if (result?.success) {
      setIsLoginOpen(false);
    }
  };

  const onRegister = async (e: React.FormEvent) => {
    const result = await handleRegister(e);
    if (result?.success) {
      setIsRegisterOpen(false);
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
        handleLogin={onLogin}
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
        handleRegister={onRegister}
        t={t}
      />
    </Box>
  );
}
