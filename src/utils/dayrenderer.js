export function formatDate(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-indexed months
  const year = date.getFullYear();

  // Return the formatted date in the format "DD/M/YYYY"
  return `${day}/${month}/${year}`;
}

export function getTotalAmountSpent(expenses, formattedDate) {
  // Find the entry for the given date in the JSON data
  const dateEntry = expenses.find(entry => entry.date === formattedDate);

  // If an entry is found, return the total amount; otherwise, return 0
  return dateEntry ? dateEntry.totalAmount : 0;
}