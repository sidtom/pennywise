export const uniqueCategories = (expenses) => {
  return [
    ...new Set(
      expenses.flatMap((expense) => expense.transactions.map((t) => t.category))
    ),
  ];
};

export const seriesMatching = (categories) =>
  categories.map((category, index) => ({
    name: category,
    color: `hsl(${index * 30}, 70%, 50%)`, // Generate a unique color for each category
  }));

  export const transformExpensesByType = (expenses) => {
    const colors = {
      Gpay: "indigo.6",
      Card: "yellow.6",
      Received: "teal.6",
      Other: "gray.6",
    };

    const groupedExpenses = {};

    // Iterate through each day's transactions
    expenses.forEach((expense) => {
      expense.transactions.forEach(({ transactionType, amount }) => {
        if (!groupedExpenses[transactionType]) {
          groupedExpenses[transactionType] = 0;
        }
        groupedExpenses[transactionType] += amount;
      });
    });

    // Convert to array format for graph
    return Object.keys(groupedExpenses).map((key) => ({
      name: key,
      value: groupedExpenses[key],
      color: colors[key] || "gray.6", // Default color if not listed
    }));
  };

export const categoryColors = {
  Food: "yellow.6",
  Alcohol: "teal.6",
  Shopping: "blue.6",
  Rent: "red.6",
  Petrol: "orange.6",
  Recharge: "pink.6",
  Lekshmy: "cyan.6",
  Movie: "green.6",
  Subscriptions: "purple.6",
  Playstation: "lime.6",
  Hotel: "violet.6",
  Zomato: "indigo.6",
  Vinai: "emerald.6",
  Bipin: "amber.6",
  Things: "rose.6",
  Misc: "fuchsia.6",
  Other: "gray.4",
};
