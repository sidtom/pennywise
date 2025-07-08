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
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "10px",
    border:
      totalAmountSpent === 0
        ? "1px solid grey"
        : totalAmountSpent > 1000
        ? "1px solid rgb(250, 6, 6)"
        : "1px solid rgb(8, 248, 28)",
    color: "rgb(3, 3, 0)",
    textAlign: "center",
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

      <div onClick={open}>
        <div style={{ textAlign: "center" }}>{date.getDate()}</div>
        <div style={pillboxStyle}>{totalAmountSpent}</div>
      </div>
    </>
  );
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  expenses: PropTypes.array.isRequired,
  onExpensesUpdate: PropTypes.func.isRequired,
};
