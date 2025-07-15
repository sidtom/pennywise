import { Calendar } from "@mantine/dates";
import { useState, useEffect } from "react";
import Day from "../dayRenderer/day.JSX";
import AnalyticsRow from "../analyticsRow/analyticsRow";
import "@mantine/dates/styles.css";
import "./calendar.css";
import PropTypes from "prop-types";

export default function DashboardCalendar({ selectedMonth, onMonthChange }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!selectedMonth) return;
    
    const month = selectedMonth.getMonth() + 1;
    const year = selectedMonth.getFullYear();
    
    fetch(`http://localhost:5000/expenses?month=${month}&year=${year}`)
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, [selectedMonth]);

  const handleExpensesUpdate = (updatedExpenses) => {
    setExpenses(updatedExpenses);
  };

  return (
    <div className="calendar-container" style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      gap: "20px", 
      padding: "20px",
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(10px)"
    }}>
      <Calendar
        renderDay={(date) => <Day date={date} expenses={expenses} onExpensesUpdate={handleExpensesUpdate} />}
        size="xl"
        date={selectedMonth}
        onDateChange={onMonthChange}
      />
      <AnalyticsRow selectedMonth={selectedMonth} expenses={expenses} />
    </div>
  );
}

DashboardCalendar.propTypes = {
  selectedMonth: PropTypes.instanceOf(Date),
  onMonthChange: PropTypes.func.isRequired,
};
