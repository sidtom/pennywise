import "./analyticsDashboard.css";
import { AreaChart } from "@mantine/charts";
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
      <div className="box">Box2</div>
      <div className="box">Box3</div>
      <div className="box">Box4</div>
    </div>
  );
}
