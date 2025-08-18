import {
  Modal,
  Button,
  TextInput,
  NumberInput,
  Table,
  Radio,
  Group,
} from "@mantine/core";
import { useState, useEffect } from "react";
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
    transactionType: "Gpay",
    transactionNature: "Expense",
  });
  const isMobile = useMediaQuery("(max-width: 50em)");
  // Initialize the current expenses for the selected date
  useEffect(() => {
    const matchedExpenses = expenses.filter((e) => e.date === date);
    const allTransactions = matchedExpenses.flatMap((e) => e.transactions);
    setCurrentExpenses(allTransactions);
  }, [date, expenses]);

  const handleDelete = async (index, expense) => {
    if (expense._id) {
      try {
        await fetch(`http://localhost:5000/expenses/${expense._id}`, {
          method: "DELETE",
        });
        const updatedExpenses = [...currentExpenses];
        updatedExpenses.splice(index, 1);
        setCurrentExpenses(updatedExpenses);
      } catch (error) {
        console.error("Error deleting expense:", error);
        return;
      }
    }
  };

  const handleAddRow = () => {
    setCurrentExpenses([...currentExpenses, { ...newExpense }]);
    setNewExpense({ category: "", amount: "", transactionType: "Gpay", transactionNature: "Expense" });
  };

  const handleSave = async () => {
    const totalAmount = currentExpenses.reduce(
      (sum, tx) => sum + Number(tx.amount),
      0
    );

    // Separate transactions: those with _id (existing) vs new (no _id)
    const existingTransactions = currentExpenses.filter((tx) => tx._id);
    const newTransactions = currentExpenses.filter((tx) => !tx._id);

    try {
      // 1. Update existing transactions
      for (const tx of existingTransactions) {
        const response = await fetch(
          `http://localhost:5000/expenses/${tx._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tx),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to update transaction with ID ${tx._id}`);
        }
      }

      // 2. Add new transactions
      if (newTransactions.length > 0) {
        const payload = {
          date,
          transactions: newTransactions,
          totalAmount: totalAmount,
        };

        const response = await fetch("http://localhost:5000/expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to create new transactions");
        }

        const saved = await response.json();
        console.log("New transactions saved:", saved);
      }

      // Optional: update total or refresh UI
      onSave(date, currentExpenses, totalAmount);
      onClose();
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  return (
    <Modal
      size={isMobile ? "xs" : "xl"}
      opened={opened}
      onClose={onClose}
      title={`Transactions for ${date}`}
      className="modal-container"
      centered
      fullScreen={isMobile}
    >
      <Table className="expenses-table">
        <thead className="table-header">
          <tr>
            <th className="header-cell">Category</th>
            <th className="header-cell">Amount</th>
            <th className="header-cell">Nature</th>
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
                <Radio.Group
                  value={expense.transactionNature || "Expense"}
                  onChange={(value) =>
                    setCurrentExpenses((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, transactionNature: value } : item
                      )
                    )
                  }
                >
                  <Group>
                    <Radio value="Expense" label="Expense" />
                    <Radio value="Income" label="Income" />
                  </Group>
                </Radio.Group>
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
                  onClick={() => handleDelete(index, expense)}
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
              <Radio.Group
                value={newExpense.transactionNature}
                onChange={(value) =>
                  setNewExpense((prev) => ({
                    ...prev,
                    transactionNature: value,
                  }))
                }
              >
                <Group>
                  <Radio value="Expense" label="Expense" />
                  <Radio value="Income" label="Income" />
                </Group>
              </Radio.Group>
            </td>
            <td className="table-cell">
              <Radio.Group
                value={newExpense.transactionType}
                onChange={(value) =>
                  setNewExpense((prev) => ({
                    ...prev,
                    transactionType: value,
                  }))
                }
              >
                <Group mt="xs">
                  <Radio value="Card" label="Card" />
                  <Radio value="Gpay" label="Gpay" />
                </Group>
              </Radio.Group>
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
          amount: PropTypes.number.isRequired,
          transactionType: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func.isRequired,
};
