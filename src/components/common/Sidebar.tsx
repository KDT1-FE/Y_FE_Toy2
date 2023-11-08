import React, { useMemo } from 'react';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { Home, Message, SportsEsports, Person } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarLogo,
  SidebarContainer,
  SidebarNavWrap,
  SidebarNavListItem,
  StyledBadge,
} from '../../styles/SidebarStyles';

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <SidebarContainer>
      <Box
        sx={{
          padding: '1.6rem',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '2rem', color: 'white', mt: 2, mb: 4, fontFamily: 'Bungee' }}>
          <Link to="/">Langchat</Link>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            padding: '1rem',
            borderRadius: 2,
            color: '#fff',
          }}
        >
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar />
          </StyledBadge>
          유저 이름
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.04)' }} />
      <SidebarNavWrap>
        <ul>
          <SidebarNavListItem isActive={pathname === '/home'}>
            <Link to="/home">
              <Home /> 홈
            </Link>
          </SidebarNavListItem>
          <SidebarNavListItem isActive={pathname === '/chat'}>
            <Link to="/chat">
              <Message /> 메시지
            </Link>
          </SidebarNavListItem>
          <SidebarNavListItem isActive={pathname === '/game'}>
            <Link to="/game">
              <SportsEsports /> 게임
            </Link>
          </SidebarNavListItem>
          <SidebarNavListItem isActive={pathname === '/profile'}>
            <Link to="/profile">
              <Person /> 프로필
            </Link>
          </SidebarNavListItem>
        </ul>
      </SidebarNavWrap>
    </SidebarContainer>
  );
}

export default Sidebar;
