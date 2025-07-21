import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const TransactionForm = ({ open, onClose, onSubmit, initialData, categories, accounts }) => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    account: '',
    date: '',
    note: '',
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ title: '', amount: '', type: 'expense', category: '', account: '', date: '', note: '' });
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{initialData ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="transaction-form">
          <TextField margin="normal" label="Title" name="title" value={form.title} onChange={handleChange} fullWidth required />
          <TextField margin="normal" label="Amount" name="amount" type="number" value={form.amount} onChange={handleChange} fullWidth required />
          <FormControl margin="normal" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={form.type} onChange={handleChange} label="Type">
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select name="category" value={form.category} onChange={handleChange} label="Category">
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Account</InputLabel>
            <Select name="account" value={form.account} onChange={handleChange} label="Account">
              {accounts.map((acc) => (
                <MenuItem key={acc.id} value={acc.name}>{acc.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField margin="normal" label="Date" name="date" type="date" value={form.date} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
          <TextField margin="normal" label="Note" name="note" value={form.note} onChange={handleChange} fullWidth />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="transaction-form" variant="contained">{initialData ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm; 