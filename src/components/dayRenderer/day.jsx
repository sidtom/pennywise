import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatDate, getTotalAmountSpent } from "../../utils/dayrenderer";
import { useDisclosure } from "@mantine/hooks";
import ExpenseModal from "../expenseModal/expenseModal";
import "./day.css";

export default function Day({ date, expenses, onExpensesUpdate }) {
  const [localExpenses, setLocalExpenses] = useState(expenses);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  const [opened, { open, close }] = useDisclosure(false);
  const formattedDate = formatDate(date);
  const totalAmountSpent = getTotalAmountSpent(localExpenses, formattedDate);

  const getPillboxClass = () => {
    if (totalAmountSpent === 0) return "pill-box pill-box-zero";
    if (totalAmountSpent > 1000) return "pill-box pill-box-high";
    return "pill-box pill-box-low";
  };

  const isToday = () => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleSave = (date, transactions, totalAmount) => {
    const updatedExpenses = [...localExpenses];
    const existingIndex = updatedExpenses.findIndex((e) => e.date === date);

    if (existingIndex > -1) {
      updatedExpenses[existingIndex] = { date, transactions, totalAmount };
    } else {
      updatedExpenses.push({ date, transactions, totalAmount });
    }
    
    setLocalExpenses(updatedExpenses);
    onExpensesUpdate(updatedExpenses);
  };

  return (
    <>
      <ExpenseModal
        opened={opened}
        onClose={close}
        date={formattedDate}
        expenses={localExpenses}
        onSave={handleSave}
      />

      <div onClick={open} className={`day-container ${isToday() ? 'day-today' : ''}`}>
        <div className="day-number">{date.getDate()}</div>
        <div className={getPillboxClass()}>{totalAmountSpent}</div>
      </div>
    </>
  );
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  expenses: PropTypes.array.isRequired,
  onExpensesUpdate: PropTypes.func.isRequired,
};
