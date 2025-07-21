// In-memory categories array for demo. Replace with Mongoose model for MongoDB.
const categories = [];

module.exports = {
  categories,
  find: async () => categories,
  findById: async (id) => categories.find(c => c.id === id),
  create: async (category) => {
    categories.push(category);
    return category;
  },
  update: async (id, update) => {
    const idx = categories.findIndex(c => c.id === id);
    if (idx === -1) return null;
    categories[idx] = { ...categories[idx], ...update };
    return categories[idx];
  },
  remove: async (id) => {
    const idx = categories.findIndex(c => c.id === id);
    if (idx === -1) return null;
    const [deleted] = categories.splice(idx, 1);
    return deleted;
  },
}; 