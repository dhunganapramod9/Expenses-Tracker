import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AccountForm from '../components/AccountForm';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/accounts');
      setAccounts(res.data);
    } catch (err) {
      setError('Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleEdit = (acc) => {
    setEditData(acc);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/accounts/${id}`);
    fetchAccounts();
  };

  const handleFormSubmit = async (form) => {
    if (editData) {
      await axios.put(`/api/accounts/${editData.id}`, form);
    } else {
      await axios.post('/api/accounts', form);
    }
    setFormOpen(false);
    fetchAccounts();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Accounts</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>Add Account</Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((acc) => (
              <TableRow key={acc.id}>
                <TableCell>{acc.name}</TableCell>
                <TableCell>{acc.type}</TableCell>
                <TableCell>{acc.balance}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(acc)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(acc.id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <Typography>Loading...</Typography>}
      {!loading && accounts.length === 0 && <Typography>No accounts found.</Typography>}
      <AccountForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editData}
      />
    </Box>
  );
};

export default Accounts; 