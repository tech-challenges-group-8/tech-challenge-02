import { Container } from "@mui/material";
import { CardBackground, PageTitle } from "../../components/ui";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useUser } from "../../contexts/UserContext";
import { transactionApi } from "../../lib/transactionApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Evolução das Transações no Tempo",
    },
  },
};
interface Transaction {
  accountId: string;
  date: string;
  id: string;
  type: string;
  value: number;
}

// const transactions: Transaction[] = [
//     {
//       accountId: "68928b8ad8afe2c930d47d95",
//       date: "2025-08-05T23:28:18.868Z",
//       id: "68929392d8afe2c930d47e5d",
//       type: "DEPOSIT",
//       value: 100,
//     },
//     {
//       accountId: "68928b8ad8afe2c930d47d95",
//       date: "2025-08-06T23:28:18.868Z",
//       id: "68929392d8afe2c930d47e5d",
//       type: "TRANSFER",
//       value: 50,
//     },
//   ];


export default function Dashboard() {
  const [transactions, setTransactionsInner] = useState<Transaction[]>([]);
  const { user, setTransactions } = useUser();

  const loadTransactions = useCallback(async () => {
    if (!user?.account) {
      setTransactions([]);
      return;
    }

    try {
      const transactionsData = await transactionApi.getTransactions(
        user.account
      );
      setTransactions(transactionsData);
      setTransactionsInner(transactionsData);
    } catch (error) {
      console.error("Erro de rede ao carregar transações:", error);
      setTransactions([]);
    }
  }, [user?.balance]);

  // useEffect to load transactions
  useEffect(() => {
    loadTransactions();
  }, [user]);

  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { labels: [], datasets: [] };
    }

    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      labels: sorted.map((t) =>
        new Date(t.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        })
      ),

      datasets: [
        {
          label: "Depósitos",
          data: sorted.map((t) => (t.type === "DEPOSIT" ? t.value : 0)),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
        {
          label: "Transferências",
          data: sorted.map((t) => (t.type === "TRANSFER" ? t.value : 0)),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [transactions]);
  return (
    <CardBackground>
      <Container>
        <PageTitle>Dashboard</PageTitle>
        <Line options={chartOptions} data={chartData} />
      </Container>
    </CardBackground>
  );
}
