import { Box, Typography } from "@mui/material";
import TransactionItem from "./TransactionItem";
import type { Transaction } from "../../../lib/types";

interface TransactionListProps {
  groupedTransactions: Record<string, Transaction[]>;
  theme: any;
}

export default function TransactionList({
  groupedTransactions,
  theme,
}: TransactionListProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "2px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&:hover::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.primary.main,
        },
        "&:hover::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      {Object.entries(groupedTransactions).map(([month, monthTransactions]) => (
        <Box key={month} mb={theme.spacing(2)}>
          <Typography
            fontWeight="bold"
            textTransform="capitalize"
            color={theme.palette.primary.main}
            mb={theme.spacing(1)}
          >
            {month}
          </Typography>
          {monthTransactions.map((tx) => (
            <Box key={tx.id} display="flex" alignItems="center">
              <TransactionItem tx={tx} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
