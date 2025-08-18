import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEMICategory } from "../../utils/analytics";
import "./analyticsRow.css";

export default function AnalyticsRow({ selectedMonth, expenses }) {
  const [totalSpend, setTotalSpend] = useState(0);
  const [averageSpend, setAverageSpend] = useState(0);

  useEffect(() => {
    if (!selectedMonth || !expenses) return;

    const total = expenses.reduce((sum, expense) => {
      const netAmount = expense.transactions
        .filter(t => !isEMICategory(t.category))
        .reduce((txSum, tx) => {
          const amount = tx.amount || 0;
          return tx.transactionNature === 'Income' 
            ? txSum - amount 
            : txSum + amount;
        }, 0);
      return sum + netAmount;
    }, 0);
    const daysWithExpenses = expenses.length;
    const average = daysWithExpenses > 0 ? total / daysWithExpenses : 0;
    
    setTotalSpend(total);
    setAverageSpend(average);
  }, [selectedMonth, expenses]);

  if (!selectedMonth) return null;

  return (
    <div className="analytics-row-container">
      <div className="analytics-spend-card">
        <h3 className="analytics-card-title">Total Spend</h3>
        <p className="analytics-card-value">₹{totalSpend.toFixed(2)}</p>
      </div>
      <div className="analytics-spend-card">
        <h3 className="analytics-card-title">Average Spend/Day</h3>
        <p className="analytics-card-value">₹{averageSpend.toFixed(2)}</p>
      </div>
    </div>
  );
}

AnalyticsRow.propTypes = {
  selectedMonth: PropTypes.instanceOf(Date),
  expenses: PropTypes.array.isRequired,
};