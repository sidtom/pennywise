import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEMICategory } from "../../utils/analytics";

export default function AnalyticsRow({ selectedMonth, expenses }) {
  const [totalSpend, setTotalSpend] = useState(0);
  const [averageSpend, setAverageSpend] = useState(0);

  useEffect(() => {
    if (!selectedMonth || !expenses) return;

    const total = expenses.reduce((sum, expense) => {
      const nonEMIAmount = expense.transactions
        .filter(t => !isEMICategory(t.category))
        .reduce((txSum, tx) => txSum + tx.amount, 0);
      return sum + nonEMIAmount;
    }, 0);
    const daysWithExpenses = expenses.length;
    const average = daysWithExpenses > 0 ? total / daysWithExpenses : 0;
    
    setTotalSpend(total);
    setAverageSpend(average);
  }, [selectedMonth, expenses]);

  if (!selectedMonth) return null;

  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center", margin: "20px 0" }}>
      <div style={{ 
        padding: "20px", 
        background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid rgba(0, 0, 0, 0.08)", 
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        minWidth: "150px"
      }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#667eea", fontSize: "16px" }}>Total Spend</h3>
        <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#2d3748" }}>₹{totalSpend.toFixed(2)}</p>
      </div>
      <div style={{ 
        padding: "20px", 
        background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid rgba(0, 0, 0, 0.08)", 
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        minWidth: "150px"
      }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#667eea", fontSize: "16px" }}>Average Spend/Day</h3>
        <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#2d3748" }}>₹{averageSpend.toFixed(2)}</p>
      </div>
    </div>
  );
}

AnalyticsRow.propTypes = {
  selectedMonth: PropTypes.instanceOf(Date),
  expenses: PropTypes.array.isRequired,
};