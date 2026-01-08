"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  Button,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTransactions } from "../../../hooks/useTransactions";

import { LoadingButton, NumericInputField } from "../../ui";
import type { Transaction } from "../../../lib/types";

interface TransactionItemProps {
  tx: Transaction;
}

export default function TransactionItem({ tx }: TransactionItemProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { editTransaction, deleteTransaction } = useTransactions();

  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(tx.value.toString());
  const [editError, setEditError] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const formattedBalance = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(tx.value);

  const handleDeleteConfirm = async () => {
    setLoading(true);
    await deleteTransaction(tx);
    setLoading(false);
    handleCloseDeleteModal();
  };

  const handleStartEditing = () => {
    setEditing(true);
    setEditedValue(tx.value.toString());
    setEditError("");
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedValue(event.target.value);
    if (editError) setEditError("");
  };

  const handleSaveEdit = async () => {
    const parsed = parseFloat(editedValue);
    if (isNaN(parsed) || parsed <= 0) {
      setEditError(t("statement.invalidValue"));
      return;
    }

    setLoading(true);
    await editTransaction({ ...tx, value: parsed });
    setLoading(false);
    setEditing(false);
    setEditedValue(parsed.toString());
    setEditError("");
  };
  return (
    <Box mb={theme.spacing(2)} width={"100%"}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width={"100%"}>
        <Box>
          <Typography variant="body2" color={theme.palette.primary.main}>
            {tx.type === "TRANSFER"
              ? t("statement.transfer")
              : t("statement.deposit")}
          </Typography>

          {editing ? (
            <Box display="flex" flexDirection={"column"} justifyContent={'space-between'} alignItems="center" gap={theme.spacing(1)}>
              <NumericInputField
                value={editedValue}
                onChange={handleValueChange}
                sx={{
                  zIndex: 1,
                  height: "40px",
                  width: { xs: "100%", sm: "150px" },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    padding: 0
                  },
                  "& label": {
                    display:'none',
                  }
                }}
                error={!!editError}
                helperText={editError}
                disabled={loading}
              />
              <LoadingButton
                onClick={handleSaveEdit}
                isSubmitting={loading}
                loadingText={t("statement.saving")}
                sx={{
                  height: "40px",
                  width: "100%",
                  minWidth: "unset",
                  padding: "6px 16px",
                }}
              >
                {t("statement.ok")}
              </LoadingButton>
            </Box>
          ) : (
            <Typography
              fontWeight={600}
              color={
                tx.type === "TRANSFER"
                  ? theme.palette.error.main
                  : theme.palette.success.main
              }
            >
              {tx.type === "TRANSFER"
                ? `- ${formattedBalance}`
                : ` ${formattedBalance}`}
            </Typography>
          )}

          <Typography variant="caption" color={theme.palette.primary.main}>
            {new Date(tx.date).toLocaleDateString("pt-BR")}
          </Typography>

          <br />
          <Typography variant="caption" color={theme.palette.primary.main}>
            {tx.description || ""}
          </Typography>
        </Box>

        <Box display={'flex'} flexDirection={"column"} marginLeft={"10px"}>
          <IconButton onClick={handleStartEditing} disabled={loading}>
            <EditIcon
              sx={{
                fontSize: 18,
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
          <IconButton onClick={handleOpenDeleteModal} disabled={loading}>
            <DeleteIcon
              sx={{
                fontSize: 18,
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
          {tx.anexo && (
            <IconButton
              component="a"
              href={'https://i.ytimg.com/vi/-881wGRdhWc/maxresdefault.jpg'}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                ml: 1,
                fontSize: 18,
                color: theme.palette.primary.main,
                width: 18,
              }}
              title={tx.anexo}
            >
              <AttachFileIcon color="primary" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider sx={{ mt: theme.spacing(1) }} />

      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={openDeleteModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              boxShadow: 24,
              p: theme.spacing(4),
              borderRadius: theme.shape.borderRadius,
              width: 300,
            }}
          >
            <Typography variant="body1" mb={theme.spacing(2)}>
              {t("statement.confirmDelete")}
            </Typography>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleDeleteConfirm}
              disabled={loading}
            >
              {t("statement.deleteTransaction")}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
