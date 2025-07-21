const Account = require('../models/Account');
const { v4: uuidv4 } = require('uuid');

exports.getAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
};

exports.addAccount = async (req, res, next) => {
  try {
    const { name, type, balance } = req.body;
    const account = { id: uuidv4(), name, type, balance };
    await Account.create(account);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
};

exports.updateAccount = async (req, res, next) => {
  try {
    const updated = await Account.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Account not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const deleted = await Account.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Account not found' });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    next(err);
  }
}; 