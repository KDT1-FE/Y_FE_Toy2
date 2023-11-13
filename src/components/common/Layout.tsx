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
        xs={12}
        sm={12}
        md={2}
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
        }}
      >
        <AppBar position="sticky" sx={{ minHeight: '100vh' }}>
          <Sidebar />
        </AppBar>
      </Grid>
      <Grid item xs={12} sm={12} md={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default Layout;
