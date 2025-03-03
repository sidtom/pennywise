import "./analyticsDashboard.css";
import { AreaChart, BarChart, DonutChart, PieChart } from "@mantine/charts";
import { expenses } from "../../mocks/expense";
export default function AnalyticsDashboard() {
  const categories = [
    ...new Set(
      expenses.flatMap((expense) => expense.transactions.map((t) => t.category))
    ),
  ];
  const series = categories.map((category, index) => ({
    name: category,
    color: `hsl(${index * 30}, 70%, 50%)`, // Generate a unique color for each category
  }));

  const chartData = expenses.map((expense) => {
    const dataPoint = { date: expense.date };
    expense.transactions.forEach((transaction) => {
      dataPoint[transaction.category] = transaction.amount;
    });
    return dataPoint;
  });

  const barData = expenses.map((expense) => ({
    day: expense.date, // Keeping the date as 'month' for consistency with the given format
    "Total Spending": expense.totalAmount,
  }));
  const categoryColors = {
    Food: "yellow.6",
    Alcohol: "teal.6",
    Misc: "gray.6",
    Shopping: "blue.6",
    Rent: "red.6",
    Petrol: "orange.6",
    Recharge: "pink.6",
    Lekshmy: "cyan.6",
    "Medical store": "green.6",
    Subscriptions: "purple.6",
    Swimming: "lime.6",
    Hotel: "violet.6",
    "Gym 3 months": "indigo.6",
    Vinai: "emerald.6",
    Bipin: "amber.6",
    Things: "rose.6",
    Jam: "fuchsia.6",
    Other: "gray.4",
  };

  const categoryTotals = {};

  expenses.forEach((expense) => {
    expense.transactions.forEach((transaction) => {
      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = 0;
      }
      categoryTotals[transaction.category] += transaction.amount;
    });
  });

  const donutData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
    color: categoryColors[category] || "gray.6", // Default color if not found
  }));

  const transformExpensesByType = (expenses) => {
    const colors = {
      Gpay: "indigo.6",
      Card: "yellow.6",
      Received: "teal.6",
      Other: "gray.6",
    };

    const groupedExpenses = {};

    // Iterate through each day's transactions
    expenses.forEach((expense) => {
      expense.transactions.forEach(({ transactionType, amount }) => {
        if (!groupedExpenses[transactionType]) {
          groupedExpenses[transactionType] = 0;
        }
        groupedExpenses[transactionType] += amount;
      });
    });

    // Convert to array format for graph
    return Object.keys(groupedExpenses).map((key) => ({
      name: key,
      value: groupedExpenses[key],
      color: colors[key] || "gray.6", // Default color if not listed
    }));
  };
  const pieData = transformExpensesByType(expenses);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <div className="box">
        <AreaChart
          h={300}
          data={chartData}
          dataKey="date"
          series={series}
          curveType="linear"
        />
      </div>
      <div className="box">
        <DonutChart
          style={{ marginLeft: "35%", marginTop: "10%" }}
          data={donutData}
        />
      </div>
      <div className="box">
        <BarChart
          h={300}
          data={barData}
          dataKey="day"
          series={[{ name: "Total Spending", color: "violet.6" }]}
          tickLine="y"
        />
      </div>
      <div className="box">
        <PieChart
          style={{ marginLeft: "35%", marginTop: "10%" }}
          data={pieData}
          withTooltip 
          labelsType="value"
          withLabels
        />
      </div>
    </div>
  );
}
