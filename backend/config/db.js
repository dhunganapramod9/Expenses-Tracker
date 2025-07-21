// const mongoose = require('mongoose');

// For demo: MongoDB connection is disabled. To enable, uncomment below and set MONGO_URI in .env
// const connectDB = async () => {
//   const conn = await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log(`MongoDB Connected: ${conn.connection.host}`);
// };
// module.exports = connectDB;

// No-op for now
const connectDB = async () => {
  console.log('MongoDB connection is currently disabled. Using in-memory data.');
};
module.exports = connectDB; 