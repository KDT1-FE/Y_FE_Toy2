import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContainer } from '../../styles/AuthStyles';

function AuthLayout() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        minHeight: '100vh',
      }}
    >
      <Grid container sx={{ flex: '1 1 auto' }}>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: '2rem',
                color: 'primary.main',
                fontFamily: 'Bungee',
              }}
            >
              <Link to="/">Langchat</Link>
            </Typography>
          </Box>

          <AuthContainer>
            <Outlet />
          </AuthContainer>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            backgroundColor: 'primary.main',
            color: 'white',
            display: { xs: 'none', lg: 'flex' },
            justifyContent: 'center',
            position: 'relative',
            '& img': {
              maxWidth: '100%',
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: 0.4,
              background: 'url(mobile-app-bg.jpg) 50% 50%/cover no-repeat',
            },
          }}
        >
          <Box sx={{ p: 3, position: 'relative' }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1,
              }}
              variant="h1"
            >
              새로운 언어를 알아가는 즐거움 <br />
              <Box component="a" sx={{ color: '#15B79E' }} target="_blank">
                Langchat
              </Box>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Toaster />
    </Box>
  );
}

export default AuthLayout;
