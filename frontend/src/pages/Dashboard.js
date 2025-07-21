import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      setError('Failed to fetch expenses');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4">Dashboard</Typography>
        <Button onClick={handleLogout} variant="outlined" sx={{ mt: 2, mb: 2 }}>Logout</Button>
        {error && <Typography color="error">{error}</Typography>}
        <List>
          {expenses.map(exp => (
            <ListItem key={exp._id}>
              <ListItemText primary={exp.title} secondary={`Amount: $${exp.amount} | Category: ${exp.category} | Date: ${exp.date}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Dashboard; 