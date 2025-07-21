const Expense = require('../models/Expense');
const { v4: uuidv4 } = require('uuid');

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses.sort((a, b) => new Date(b.date) - new Date(a.date)));
  } catch (err) {
    next(err);
  }
};

exports.addExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;
    // For MongoDB: const expense = await Expense.create({ user: req.user.id, title, amount, category, date });
    const expense = { _id: uuidv4(), user: req.user.id, title, amount, category, date };
    await Expense.create(expense);
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    next(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    next(err);
  }
}; 