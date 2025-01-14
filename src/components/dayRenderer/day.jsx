import PropTypes from "prop-types";
import { expenses } from "../../mocks/expense";
import { formatDate, getTotalAmountSpent } from "../../utils/dayrenderer";
import { useDisclosure } from "@mantine/hooks";
import ExpenseModal from "../expenseModal/expenseModal";

export default function Day(props) {
  const [opened, { open, close }] = useDisclosure(false);
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

  const handleSave = (date, transactions, totalAmount) => {
    const existingIndex = expenses.findIndex((e) => e.date === date);

    if (existingIndex > -1) {
      expenses[existingIndex] = { date, transactions, totalAmount };
    } else {
      expenses.push({ date, transactions, totalAmount });
    }
  };

  return (
    <>
      <ExpenseModal
        opened={opened}
        onClose={close}
        date={formattedDate}
        expenses={expenses}
        onSave={handleSave}
      />

      <div onClick={open}>
        <div style={{ textAlign: "center" }}>{props.date.getDate()}</div>
        <div style={pillboxStyle}>{totalAmountSpent}</div>
      </div>
    </>
  );
}

Day.propTypes = {
  date: PropTypes
}