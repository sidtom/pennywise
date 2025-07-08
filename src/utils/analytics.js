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
  Food: "orange.6",
  Alcohol: "red.7",
  Shopping: "blue.6",
  Rent: "purple.7",
  Petrol: "yellow.7",
  Recharge: "pink.6",
  Parents: "green.7",
  Movie: "indigo.6",
  Medicine: "teal.7",
  Subscriptions: "violet.6",
  Playstation: "lime.6",
  Hotel: "cyan.6",
  Zomato: "amber.6",
  Vinai: "emerald.6",
  Bipin: "rose.6",
  Things: "grape.6",
  Clothes: "dark.6",
  Splits: "orange.8",
  Misc: "brown.4",
  Other: "gray.4",
};
