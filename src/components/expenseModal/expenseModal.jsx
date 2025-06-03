import { Modal, Button, TextInput, NumberInput, Table } from "@mantine/core";
import { useState } from "react";
import PropTypes from "prop-types";
import "./ExpenseModal.css";
import { useMediaQuery } from "@mantine/hooks";
export default function ExpenseModal({
  opened,
  onClose,
  date,
  expenses,
  onSave,
}) {
  const [currentExpenses, setCurrentExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    transactionType: "",
  });
  const isMobile = useMediaQuery("(max-width: 50em)");
  // Initialize the current expenses for the selected date
  useState(() => {
    const expenseData = expenses.find((e) => e.date === date) || {
      transactions: [],
    };
    setCurrentExpenses([...expenseData.transactions]);
  }, [date]);

  const handleDelete = (index) => {
    const updatedExpenses = [...currentExpenses];
    updatedExpenses.splice(index, 1);
    setCurrentExpenses(updatedExpenses);
  };

  const handleAddRow = () => {
    setCurrentExpenses([...currentExpenses, { ...newExpense }]);
    setNewExpense({ category: "", amount: "", transactionType: "" });
  };

  const handleSave = async () => {
    const totalAmount = currentExpenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    const payload = {
      date,
      transactions: currentExpenses,
      totalAmount,
    };

    try {
      const response = await fetch("http://localhost:5000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save expense");
      }

      const savedExpense = await response.json();
      console.log("Expense saved:", savedExpense);

      onSave(date, currentExpenses, totalAmount); // If you still want to call this
      onClose();
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  return (
    <Modal
      size={isMobile ? "xs" : "xl"}
      opened={opened}
      onClose={onClose}
      title={`Expenses for ${date}`}
      className="modal-container"
      centered
      fullScreen={isMobile}
    >
      <Table className="expenses-table">
        <thead className="table-header">
          <tr>
            <th className="header-cell">Category</th>
            <th className="header-cell">Amount</th>
            <th className="header-cell">Transaction Type</th>
            <th className="header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {currentExpenses.map((expense, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">
                <TextInput
                  className="text-input"
                  value={expense.category}
                  onChange={(e) =>
                    setCurrentExpenses((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? { ...item, category: e.target.value }
                          : item
                      )
                    )
                  }
                />
              </td>
              <td className="table-cell">
                <NumberInput
                  className="number-input"
                  value={expense.amount}
                  onChange={(value) =>
                    setCurrentExpenses((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, amount: value } : item
                      )
                    )
                  }
                />
              </td>
              <td className="table-cell">
                <TextInput
                  className="text-input"
                  value={expense.transactionType}
                  onChange={(e) =>
                    setCurrentExpenses((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? { ...item, transactionType: e.target.value }
                          : item
                      )
                    )
                  }
                />
              </td>
              <td className="table-cell actions-cell">
                <Button
                  className="delete-button"
                  color="red"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          <tr className="table-row">
            <td className="table-cell">
              <TextInput
                className="text-input"
                placeholder="Category"
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              />
            </td>
            <td className="table-cell">
              <NumberInput
                className="number-input"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(value) =>
                  setNewExpense((prev) => ({ ...prev, amount: value }))
                }
              />
            </td>
            <td className="table-cell">
              <TextInput
                className="text-input"
                placeholder="Transaction Type"
                value={newExpense.transactionType}
                onChange={(e) =>
                  setNewExpense((prev) => ({
                    ...prev,
                    transactionType: e.target.value,
                  }))
                }
              />
            </td>
            <td className="table-cell actions-cell">
              <Button className="add-button" onClick={handleAddRow}>
                Add
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Button className="save-button" fullWidth onClick={handleSave}>
        Save
      </Button>
    </Modal>
  );
}
ExpenseModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.string.isRequired,
          amount: PropTypes.string.isRequired,
          transactionType: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};
