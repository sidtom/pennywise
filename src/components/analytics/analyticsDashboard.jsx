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

  // Weekday spending analysis
  const weekdayData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    if (!isNaN(date.getTime())) {
      const dayName = date.toLocaleDateString('en', { weekday: 'short' });
      if (!acc[dayName]) acc[dayName] = 0;
      acc[dayName] += expense.totalAmount;
    }
    return acc;
  }, {});
  
  const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekdayChartData = dayOrder
    .filter(day => weekdayData[day])
    .map(day => ({
      day,
      amount: weekdayData[day]
    }));

  // Top 5 spending categories
  const topCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category, amount]) => ({
      category,
      amount,
      color: categoryColors[category] || "gray.6"
    }));

  // Daily average vs actual spending
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.totalAmount, 0);
  const dailyAverage = expenses.length > 0 ? totalSpent / expenses.length : 0;
  const avgVsActualData = expenses.map(expense => ({
    date: expense.date,
    "Daily Average": dailyAverage,
    "Actual Spending": expense.totalAmount
  }));

  return (
    <div className="analytics-dashboard-container">
      <div className="analytics-month-picker-section">
        <div className="analytics-month-picker-wrapper">
          <MonthPickerInput
            label="Select Month"
            placeholder="Pick month"
            value={selectedMonth}
            onChange={setSelectedMonth}
            style={{ maxWidth: "300px" }}
          />
        </div>
      </div>
      <div className="analytics-charts-grid">
      <div className="box">
        <AreaChart
          h={250}
          data={chartData}
          dataKey="date"
          series={series}
          curveType="linear"
        />
      </div>
      <div className="box">
        <DonutChart
          className="analytics-donut-chart"
          data={donutData}
        />
      </div>
      <div className="box">
        <BarChart
          h={250}
          data={barData}
          dataKey="day"
          series={[{ name: "Total Spending", color: "violet.6" }]}
          tickLine="y"
        />
      </div>
      <div className="box">
        <PieChart
          className="analytics-pie-chart"
          data={pieData}
          withTooltip 
          labelsType="value"
          withLabels
        />
      </div>
      <div className="box">
        <BarChart
          h={250}
          data={weekdayChartData}
          dataKey="day"
          series={[{ name: "amount", color: "teal.6" }]}
          tickLine="y"
        />
      </div>
      <div className="box">
        <BarChart
          h={250}
          data={topCategories}
          dataKey="category"
          series={[{ name: "amount", color: "orange.6" }]}
          tickLine="y"
        />
      </div>
      <div className="box">
        <AreaChart
          h={250}
          data={avgVsActualData}
          dataKey="date"
          series={[
            { name: "Daily Average", color: "red.6" },
            { name: "Actual Spending", color: "blue.6" }
          ]}
          curveType="linear"
        />
      </div>
    </div>
    </div>
  );
}
