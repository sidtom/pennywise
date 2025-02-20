import "./analyticsDashboard.css";
import { AreaChart } from "@mantine/charts";
import { DonutChart } from '@mantine/charts';
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

  const categoryColors = {
    "Food": "yellow.6",
    "Alcohol": "teal.6",
    "Misc": "gray.6",
    "Shopping": "blue.6",
    "Rent": "red.6",
    "Petrol": "orange.6",
    "Recharge": "pink.6",
    "Lekshmy": "cyan.6",
    "Medical store": "green.6",
    "Subscriptions": "purple.6",
    "Swimming": "lime.6",
    "Hotel": "violet.6",
    "Gym 3 months": "indigo.6",
    "Vinai": "emerald.6",
    "Bipin": "amber.6",
    "Things": "rose.6",
    "Jam": "fuchsia.6",
    "Other": "gray.4"
  };
  
  const categoryTotals = {};
  
  expenses.forEach(expense => {
    expense.transactions.forEach(transaction => {
      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = 0;
      }
      categoryTotals[transaction.category] += transaction.amount;
    });
  });
  
  const donutData = Object.keys(categoryTotals).map(category => ({
    name: category,
    value: categoryTotals[category],
    color: categoryColors[category] || "gray.6" // Default color if not found
  }));


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
      <div className="box"><DonutChart data={donutData}/></div>
      <div className="box">Box3</div>
      <div className="box">Box4</div>
    </div>
  );
}
