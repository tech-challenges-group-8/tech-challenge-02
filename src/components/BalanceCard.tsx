"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  capitalize,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "../contexts/UserContext";

const BalanceCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { user } = useUser();

  const [isVisible, setIsVisible] = useState(true);

  const handleToggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  const formattedBalance = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(user?.balance || 0);

  const locale = navigator.language;
  const now = capitalize(
    new Date().toLocaleDateString(locale, {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );

  return (
    <Box
      sx={{
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(4),
        minHeight: "250px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.contrastText,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: { lg: "40%", md: "40%", xs: "20%" },
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {t("balanceCard.greeting", {
            name: user?.name || t("balanceCard.guest"),
          })}
        </Typography>
        <Typography variant="body2" mt={3}>
          {now}
        </Typography>
      </Box>

      <Box
        sx={{
          textAlign: "left",
          alignSelf: "center",
          width: "179px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight="bold">
            {t("balanceCard.balance")}
          </Typography>
          <IconButton sx={{ padding: 0 }} onClick={handleToggleVisibility}>
            <VisibilityIcon
              sx={{ fontSize: 18, color: theme.palette.primary.contrastText }}
            />
          </IconButton>
        </Box>

        <Divider
          sx={{
            borderColor: theme.palette.primary.contrastText,
            borderBottomWidth: "2px",
            my: 0.5,
          }}
        />
        <Typography variant="body2" mt={1}>
          {t("balanceCard.account")}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {isVisible ? formattedBalance : "******"}
        </Typography>
      </Box>
    </Box>
  );
};

export default BalanceCard;
