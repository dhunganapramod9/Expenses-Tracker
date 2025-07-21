// In-memory transactions array for demo. Replace with Mongoose model for MongoDB.
const transactions = [];

module.exports = {
  transactions,
  find: async () => transactions,
  findById: async (id) => transactions.find(t => t.id === id),
  create: async (transaction) => {
    transactions.push(transaction);
    return transaction;
  },
  update: async (id, update) => {
    const idx = transactions.findIndex(t => t.id === id);
    if (idx === -1) return null;
    transactions[idx] = { ...transactions[idx], ...update };
    return transactions[idx];
  },
  remove: async (id) => {
    const idx = transactions.findIndex(t => t.id === id);
    if (idx === -1) return null;
    const [deleted] = transactions.splice(idx, 1);
    return deleted;
  },
}; 