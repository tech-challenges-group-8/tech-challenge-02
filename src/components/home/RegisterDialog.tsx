"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import IlustrationRegister from "../../assets/home/ilustracao-cadastro.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface RegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string;
  userName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setAcceptedTerms: (checked: boolean) => void;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  t: (key: string, options?: any) => string;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({
  isOpen,
  onClose,
  isLoading,
  error,
  userName,
  email,
  password,
  acceptedTerms,
  setUserName,
  setEmail,
  setPassword,
  setAcceptedTerms,
  handleRegister,
  t,
}) => {
  return (
    <BootstrapDialog
      onClose={(reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      disableEscapeKeyDown
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
            maxWidth: "355px",
            position: "relative",
            aspectRatio: "355 / 260",
          }}
        >
          <img
            src={IlustrationRegister}
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
          {t("account.registerTitle")}
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate>
          <TextField
            label={t("newTransaction.nameLabel")}
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            disabled={isLoading}
          />

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

          <FormControlLabel
            control={
              <Checkbox
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                disabled={isLoading}
              />
            }
            label={t("account.privacyPolicy")}
            sx={{ mt: 1 }}
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
            {isLoading
              ? t("account.creatingAccount")
              : t("account.createAccountButton")}
          </Button>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default RegisterDialog;
