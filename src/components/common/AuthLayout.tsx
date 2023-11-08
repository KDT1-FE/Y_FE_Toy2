import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
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
            <Typography variant="h1" sx={{ fontSize: '2rem', color: 'primary.main', fontFamily: 'Bungee' }}>
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
            {/* <span>
              사진:{' '}
              <a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89%EA%B3%BC-%EB%85%B9%EC%83%89-%EC%9B%90%EA%B2%A9-%EC%A0%9C%EC%96%B4-zs-41Br0WhQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Unsplash
              </a>
              의
              <a href="https://unsplash.com/ko/@ademay?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Adem AY
              </a>
            </span> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AuthLayout;
