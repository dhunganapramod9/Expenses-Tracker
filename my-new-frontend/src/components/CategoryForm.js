import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const icons = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

const CategoryForm = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({ name: '', color: '', icon: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ name: '', color: '', icon: '' });
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
      <DialogTitle>{initialData ? 'Edit Category' : 'Add Category'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="category-form">
          <TextField margin="normal" label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
          <TextField margin="normal" label="Color" name="color" value={form.color} onChange={handleChange} fullWidth required />
          <FormControl margin="normal" fullWidth>
            <InputLabel>Icon</InputLabel>
            <Select name="icon" value={form.icon} onChange={handleChange} label="Icon">
              {icons.map((icon) => (
                <MenuItem key={icon} value={icon}>{icon}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="category-form" variant="contained">{initialData ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryForm; 