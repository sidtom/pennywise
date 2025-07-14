import "./analyticsDashboard.css";
import { useEffect, useState } from "react";
import { AreaChart, BarChart, DonutChart, PieChart } from "@mantine/charts";
import { MonthPickerInput } from '@mantine/dates';
import { uniqueCategories, seriesMatching , categoryColors, transformExpensesByType, isEMICategory } from "../../utils/analytics";

export default function AnalyticsDashboard() {
 const [expenses, setExpenses] = useState([]);
 const [selectedMonth, setSelectedMonth] = useState(null);
  
  useEffect(() => {
    let url = 'http://localhost:5000/expenses';
    if (selectedMonth) {
      const month = selectedMonth.getMonth() + 1;
      const year = selectedMonth.getFullYear();
      url += `?month=${month}&year=${year}`;
    }
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setExpenses(data);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  }, [selectedMonth])
  const categories = uniqueCategories(expenses);
  const series = seriesMatching(categories);

  const chartData = expenses.map((expense) => {
    const dataPoint = { date: expense.date };
    expense.transactions.filter(t => !isEMICategory(t.category)).forEach((transaction) => {
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
    expense.transactions.filter(t => !isEMICategory(t.category)).forEach((transaction) => {
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
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <MonthPickerInput
          label="Select Month"
          placeholder="Pick month"
          value={selectedMonth}
          onChange={setSelectedMonth}
          style={{ maxWidth: "300px", margin: "0 auto" }}
        />
      </div>
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
    </div>
  );
}
