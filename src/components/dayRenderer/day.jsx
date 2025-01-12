import PropTypes from 'prop-types';
import { expenses } from '../../mocks/expense';

function formatDate(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-indexed months
  const year = date.getFullYear();

  // Return the formatted date in the format "DD/M/YYYY"
  return `${day}/${month}/${year}`;
}

function getTotalAmountSpent(expenses, formattedDate) {
  // Find the entry for the given date in the JSON data
  const dateEntry = expenses.find(entry => entry.date === formattedDate);

  // If an entry is found, return the total amount; otherwise, return 0
  return dateEntry ? dateEntry.totalAmount : 0;
}
const pillboxStyle = {
  display: 'inline-block',
  padding: '5px 10px',
  borderRadius: '20px',
  border: '2px solid orange',
  color: 'orange',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: '5px'
};
export default function Day(props) {
const formatedDate = formatDate(props.date);
const totalAmountSpent = getTotalAmountSpent(expenses, formatedDate);
  return (
    <>
  <div>{props.date.getDate()}</div>
  <br></br>
  <div style={pillboxStyle}>{totalAmountSpent}</div>
    </>
  )
}

Day.propTypes = {
  date: PropTypes.string.isRequired,
}
