"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import IlustrationLogin from "../../assets/home/ilustracao-login.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  t: (key: string, options?: any) => string;
}

const LoginDialog: React.FC<LoginDialogProps> = ({
  isOpen,
  onClose,
  isLoading,
  error,
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
  t,
}) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "333px",
            position: "relative",
            aspectRatio: "333 / 260",
          }}
        >
          <img
            src={IlustrationLogin}
            alt="banner"
            loading="lazy"
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Typography
          component="p"
          sx={{
            fontSize: "20px",
            lineHeight: "24px",
            fontWeight: "bold",
            color: "#000000",
            width: "100%",
          }}
        >
          {t("account.loginTitle")}
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />

          <TextField
            label={t("newTransaction.passwordLabel")}
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? t("account.loggingIn") : t("account.loginButton")}
          </Button>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default LoginDialog;
