import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatDate, getTotalAmountSpent } from "../../utils/dayrenderer";
import { useDisclosure } from "@mantine/hooks";
import ExpenseModal from "../expenseModal/expenseModal";

export default function Day({ date, expenses, onExpensesUpdate }) {
  const [localExpenses, setLocalExpenses] = useState(expenses);

  useEffect(() => {
    setLocalExpenses(expenses);
  }, [expenses]);
  const [opened, { open, close }] = useDisclosure(false);
  const formattedDate = formatDate(date);
  const totalAmountSpent = getTotalAmountSpent(localExpenses, formattedDate);

  const pillboxStyle = {
    display: "block",
    padding: "6px 8px",
    borderRadius: "10px",
    border:
      totalAmountSpent === 0
        ? "1px solid grey"
        : totalAmountSpent > 1000
        ? "1px solid rgb(250, 6, 6)"
        : "1px solid rgb(8, 248, 28)",
    color: "rgb(3, 3, 0)",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: "bold",
    marginTop: "6px",
    minHeight: "20px",
    wordBreak: "break-all",
    lineHeight: "1.2"
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

      <div onClick={open} style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        minHeight: window.innerWidth <= 480 ? "50px" : window.innerWidth <= 768 ? "60px" : "70px", 
        padding: window.innerWidth <= 480 ? "2px" : "4px",
        cursor: "pointer"
      }}>
        <div style={{ 
          textAlign: "center", 
          marginBottom: "4px", 
          fontSize: window.innerWidth <= 480 ? "10px" : window.innerWidth <= 768 ? "12px" : "14px", 
          fontWeight: "500" 
        }}>{date.getDate()}</div>
        <div style={{
          ...pillboxStyle,
          fontSize: window.innerWidth <= 480 ? "8px" : window.innerWidth <= 768 ? "10px" : "12px",
          padding: window.innerWidth <= 480 ? "2px 4px" : window.innerWidth <= 768 ? "4px 6px" : "6px 8px",
          minHeight: window.innerWidth <= 480 ? "14px" : window.innerWidth <= 768 ? "16px" : "20px"
        }}>{totalAmountSpent}</div>
      </div>
    </>
  );
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  expenses: PropTypes.array.isRequired,
  onExpensesUpdate: PropTypes.func.isRequired,
};
