import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, MenuItem } from '@mui/material';
import axios from 'axios';

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];

const AddExpense = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/expenses', { title, amount: Number(amount), category, date }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center">Add Expense</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField margin="normal" required fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <TextField margin="normal" required fullWidth label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          <TextField margin="normal" required fullWidth select label="Category" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </TextField>
          <TextField margin="normal" required fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} value={date} onChange={e => setDate(e.target.value)} />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Add Expense</Button>
          <Button fullWidth variant="outlined" onClick={() => navigate('/')}>Cancel</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddExpense; 