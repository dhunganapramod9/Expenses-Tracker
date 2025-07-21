import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AccountForm = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({ name: '', type: 'Checking', balance: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ name: '', type: 'Checking', balance: '' });
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
      <DialogTitle>{initialData ? 'Edit Account' : 'Add Account'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="account-form">
          <TextField margin="normal" label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
          <FormControl margin="normal" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={form.type} onChange={handleChange} label="Type">
              <MenuItem value="Checking">Checking</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Investment">Investment</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField margin="normal" label="Balance" name="balance" type="number" value={form.balance} onChange={handleChange} fullWidth required />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="account-form" variant="contained">{initialData ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountForm; 