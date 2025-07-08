import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function AnalyticsRow({ selectedMonth, expenses }) {
  const [totalSpend, setTotalSpend] = useState(0);
  const [averageSpend, setAverageSpend] = useState(0);

  useEffect(() => {
    if (!selectedMonth || !expenses) return;

    const total = expenses.reduce((sum, expense) => sum + expense.totalAmount, 0);
    const daysWithExpenses = expenses.length;
    const average = daysWithExpenses > 0 ? total / daysWithExpenses : 0;
    
    setTotalSpend(total);
    setAverageSpend(average);
  }, [selectedMonth, expenses]);

  if (!selectedMonth) return null;

  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center", margin: "20px 0" }}>
      <div style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Total Spend</h3>
        <p>₹{totalSpend.toFixed(2)}</p>
      </div>
      <div style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Average Spend/Day</h3>
        <p>₹{averageSpend.toFixed(2)}</p>
      </div>
    </div>
  );
}

AnalyticsRow.propTypes = {
  selectedMonth: PropTypes.instanceOf(Date),
  expenses: PropTypes.array.isRequired,
};