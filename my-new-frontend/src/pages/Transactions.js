import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import TransactionForm from '../components/TransactionForm';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [txRes, catRes, accRes] = await Promise.all([
        axios.get('/api/transactions'),
        axios.get('/api/categories'),
        axios.get('/api/accounts'),
      ]);
      setTransactions(txRes.data);
      setCategories(catRes.data);
      setAccounts(accRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleEdit = (tx) => {
    setEditData(tx);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/transactions/${id}`);
    fetchAll();
  };

  const handleFormSubmit = async (form) => {
    if (editData) {
      await axios.put(`/api/transactions/${editData.id}`, form);
    } else {
      await axios.post('/api/transactions', form);
    }
    setFormOpen(false);
    fetchAll();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Transactions</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Add Transaction</Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.title}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.category}</TableCell>
                <TableCell>{tx.account}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.note}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(tx)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(tx.id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <Typography>Loading...</Typography>}
      {!loading && transactions.length === 0 && <Typography>No transactions found.</Typography>}
      <TransactionForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editData}
        categories={categories}
        accounts={accounts}
      />
    </Box>
  );
};

export default Transactions; 