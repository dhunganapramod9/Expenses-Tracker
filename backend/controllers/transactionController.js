const Transaction = require('../models/Transaction');
const { v4: uuidv4 } = require('uuid');

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

exports.addTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, account, date, note } = req.body;
    const transaction = { id: uuidv4(), title, amount, type, category, account, date, note };
    await Transaction.create(transaction);
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const updated = await Transaction.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Transaction not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const deleted = await Transaction.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    next(err);
  }
}; 