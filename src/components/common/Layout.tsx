import React from 'react';
import { AppBar, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
      }}
    >
      <Grid
        item
        xs={0}
        sm={2}
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <AppBar position="sticky" sx={{ minHeight: '100vh' }}>
          <Sidebar />
        </AppBar>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default Layout;
