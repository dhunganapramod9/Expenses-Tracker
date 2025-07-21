// For demo: In-memory expenses array. Replace with Mongoose model for MongoDB.
const expenses = [];

module.exports = {
  expenses,
  find: async (query) => expenses.filter(e => e.user === query.user),
  create: async (expense) => {
    expenses.push(expense);
    return expense;
  },
  findOneAndUpdate: async (query, update) => {
    const idx = expenses.findIndex(e => e._id === query._id && e.user === query.user);
    if (idx === -1) return null;
    expenses[idx] = { ...expenses[idx], ...update };
    return expenses[idx];
  },
  findOneAndDelete: async (query) => {
    const idx = expenses.findIndex(e => e._id === query._id && e.user === query.user);
    if (idx === -1) return null;
    const [deleted] = expenses.splice(idx, 1);
    return deleted;
  },
}; 