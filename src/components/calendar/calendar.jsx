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
    <div className="calendar-container">
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
