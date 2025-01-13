import PropTypes from "prop-types";
import { expenses } from "../../mocks/expense";
import { formatDate, getTotalAmountSpent } from "../../utils/dayrenderer";
import { Modal, Button, TextInput, NumberInput, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function Day(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [currentExpenses, setCurrentExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    transactionType: "",
  });

  const formattedDate = formatDate(props.date);
  const totalAmountSpent = getTotalAmountSpent(expenses, formattedDate);

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

  const handleOpenModal = () => {
    const expenseData = expenses.find((e) => e.date === formattedDate) || { transactions: [] };
    setCurrentExpenses([...expenseData.transactions]);
    open();
  };

  const handleSave = () => {
    const totalAmount = currentExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const existingIndex = expenses.findIndex((e) => e.date === formattedDate);

    if (existingIndex > -1) {
      expenses[existingIndex] = { date: formattedDate, transactions: currentExpenses, totalAmount };
    } else {
      expenses.push({ date: formattedDate, transactions: currentExpenses, totalAmount });
    }

    close();
  };

  const handleDelete = (index) => {
    const updatedExpenses = [...currentExpenses];
    updatedExpenses.splice(index, 1);
    setCurrentExpenses(updatedExpenses);
  };

  const handleAddRow = () => {
    setCurrentExpenses([...currentExpenses, { ...newExpense }]);
    setNewExpense({ category: "", amount: "", transactionType: "" });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title={`Expenses for ${formattedDate}`}>
        <Table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Transaction Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.map((expense, index) => (
              <tr key={index}>
                <td>
                  <TextInput
                    value={expense.category}
                    onChange={(e) =>
                      setCurrentExpenses((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, category: e.target.value } : item))
                      )
                    }
                  />
                </td>
                <td>
                  <NumberInput
                    value={expense.amount}
                    onChange={(value) =>
                      setCurrentExpenses((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, amount: value } : item))
                      )
                    }
                  />
                </td>
                <td>
                  <TextInput
                    value={expense.transactionType}
                    onChange={(e) =>
                      setCurrentExpenses((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, transactionType: e.target.value } : item))
                      )
                    }
                  />
                </td>
                <td>
                  <Button color="red" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <TextInput
                  placeholder="Category"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense((prev) => ({ ...prev, category: e.target.value }))}
                />
              </td>
              <td>
                <NumberInput
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(value) => setNewExpense((prev) => ({ ...prev, amount: value }))}
                />
              </td>
              <td>
                <TextInput
                  placeholder="Transaction Type"
                  value={newExpense.transactionType}
                  onChange={(e) => setNewExpense((prev) => ({ ...prev, transactionType: e.target.value }))}
                />
              </td>
              <td>
                <Button onClick={handleAddRow}>Add</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button fullWidth onClick={handleSave}>
          Save
        </Button>
      </Modal>

      <div onClick={handleOpenModal}>
        <div style={{ textAlign: "center" }}>{props.date.getDate()}</div>
        <div style={pillboxStyle}>{totalAmountSpent}</div>
      </div>
    </>
  );
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
