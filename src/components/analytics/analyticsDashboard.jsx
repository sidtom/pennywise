import "./analyticsDashboard.css";
import { useEffect, useState } from "react";
import { AreaChart, BarChart, DonutChart, PieChart } from "@mantine/charts";
import { uniqueCategories, seriesMatching , categoryColors, transformExpensesByType } from "../../utils/analytics";

export default function AnalyticsDashboard() {
 const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/expenses')
      .then(response => response.json())
      .then(data => {
        setExpenses(data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  }, [])
  const categories = uniqueCategories(expenses);
  const series = seriesMatching(categories);

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
