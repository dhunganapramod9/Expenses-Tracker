// In-memory accounts array for demo. Replace with Mongoose model for MongoDB.
const accounts = [];

module.exports = {
  accounts,
  find: async () => accounts,
  findById: async (id) => accounts.find(a => a.id === id),
  create: async (account) => {
    accounts.push(account);
    return account;
  },
  update: async (id, update) => {
    const idx = accounts.findIndex(a => a.id === id);
    if (idx === -1) return null;
    accounts[idx] = { ...accounts[idx], ...update };
    return accounts[idx];
  },
  remove: async (id) => {
    const idx = accounts.findIndex(a => a.id === id);
    if (idx === -1) return null;
    const [deleted] = accounts.splice(idx, 1);
    return deleted;
  },
}; 