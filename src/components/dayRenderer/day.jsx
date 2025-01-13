import PropTypes from "prop-types";
import { expenses } from "../../mocks/expense";
import { formatDate, getTotalAmountSpent } from "../../utils/dayrenderer";

export default function Day(props) {
  const formatedDate = formatDate(props.date);
  const totalAmountSpent = getTotalAmountSpent(expenses, formatedDate);

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

  return (
    <>
      <div
        onClick={() => {
          console.log("clicked");
        }}
      >
        <div style={{textAlign:"center"}}>{props.date.getDate()}</div>
        <div style={pillboxStyle}>{totalAmountSpent}</div>
      </div>
    </>
  );
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
