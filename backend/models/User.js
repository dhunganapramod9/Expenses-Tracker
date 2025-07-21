// For demo: In-memory users array. Replace with Mongoose model for MongoDB.
const users = [];

module.exports = {
  users,
  findOne: async (query) => users.find(u => u.email === query.email),
  create: async (user) => {
    users.push(user);
    return user;
  },
  findById: async (id) => users.find(u => u.id === id),
}; 