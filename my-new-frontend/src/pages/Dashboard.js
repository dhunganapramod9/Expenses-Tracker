import React from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

const Dashboard = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Dashboard</Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Balance</Typography>
            <Typography variant="h5" color="primary">$0.00</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h5" color="success.main">$0.00</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h5" color="error.main">$0.00</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">Trends & Charts</Typography>
            <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'grey.500' }}>
              (Charts will appear here)
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard; 