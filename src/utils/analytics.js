const EMI_CATEGORIES = ["EMI", "EMI - SBI", "EMI - ICICI"];

export const isEMICategory = (category) => EMI_CATEGORIES.includes(category);

export const uniqueCategories = (expenses) => {
  return [
    ...new Set(
      expenses.flatMap((expense) => expense.transactions.filter(t => !isEMICategory(t.category)).map((t) => t.category))
    ),
  ];
};

export const seriesMatching = (categories) =>
  categories.map((category) => ({
    name: category,
    color: categoryColors[category] || "gray.6", // Use categoryColors or default
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
      expense.transactions.filter(t => !isEMICategory(t.category)).forEach(({ transactionType, amount }) => {
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
  Food: "orange.6",        // Orange for food
  Alcohol: "red.7",        // Red for harmful/bad habit
  Shopping: "blue.6",      // Blue for retail/shopping
  Rent: "purple.7",        // Purple for housing/shelter
  Petrol: "yellow.6",      // Yellow for fuel/energy
  Recharge: "pink.6",      // Pink for telecom/communication
  Parents: "green.6",      // Green for family/care
  Movie: "indigo.6",       // Indigo for entertainment
  Medicine: "teal.6",      // Teal for health/medical
  Subscriptions: "violet.6", // Violet for recurring services
  Playstation: "lime.6",   // Lime for gaming/fun
  Hotel: "cyan.6",         // Cyan for travel/hospitality
  Zomato: "amber.6",       // Amber for food delivery
  Vinai: "emerald.6",      // Emerald for personal/friends
  Bipin: "rose.6",         // Rose for personal/friends
  Things: "grape.6",       // Grape for miscellaneous items
  Clothes: "dark.6",       // Dark for fashion/clothing
  Splits: "brown.6",       // Brown for shared expenses
  Misc: "gray.6",          // Gray for miscellaneous
  Mobile: "blue.7",        // Blue for mobile/telecom
  Fruits: "green.7",       // Green for healthy food
  Snacks: "orange.7",      // Orange for snacks/junk food
  Subscription: "violet.7", // Violet for subscriptions
  Fine: "red.6",           // Red for penalties/fines
  "Food - Lulu": "orange.8", // Darker orange for specific food store
  Subsription: "violet.8", // Darker violet for misspelled subscription
  Game: "lime.7",          // Lime for gaming
  Other: "gray.4",         // Light gray for other
};
