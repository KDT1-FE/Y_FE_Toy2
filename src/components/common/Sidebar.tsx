import React from 'react';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import {
  Home,
  Message,
  SportsEsports,
  Person,
  Tag,
  Logout,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  SidebarContainer,
  SidebarNavWrap,
  SidebarNavListItem,
  StyledBadge,
} from '../../styles/SidebarStyles';
import { userState } from '../../atoms';
import useLogout from '../../hooks/useLogout';

function Sidebar() {
  const { pathname } = useLocation();
  const userData = useRecoilValue(userState);
  const user = JSON.parse(userData);
  const handleLogout = useLogout();

  return (
    <SidebarContainer>
      <Box
        sx={{
          padding: '1.6rem',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '2rem',
            color: 'white',
            mt: 2,
            mb: 4,
            fontFamily: 'Bungee',
          }}
        >
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
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar src={user?.picture} />
          </StyledBadge>
          {user?.name}
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.04)' }} />
      <SidebarNavWrap>
        <ul>
          <SidebarNavListItem isActive={pathname.startsWith('/home')}>
            <Link to="/home">
              <Home /> 홈
            </Link>
          </SidebarNavListItem>
          <SidebarNavListItem isActive={pathname.startsWith('/chat')}>
            <Link to="/chat">
              <Message /> 메시지
            </Link>
          </SidebarNavListItem>
          <SidebarNavListItem isActive={pathname.startsWith('/open')}>
            <Link to="/open">
              <Tag /> 오픈채팅
            </Link>
          </SidebarNavListItem>
          <SidebarNavListItem isActive={pathname.startsWith('/game')}>
            <Link to="/game">
              <SportsEsports /> 게임
            </Link>
          </SidebarNavListItem>
          <SidebarNavListItem isActive={pathname.startsWith('/profile')}>
            <Link to="/profile">
              <Person /> 프로필
            </Link>
          </SidebarNavListItem>
          <SidebarNavListItem
            onClick={handleLogout}
            isActive={pathname.startsWith('/')}
          >
            <Link to="/">
              <Logout /> 로그아웃
            </Link>
          </SidebarNavListItem>
        </ul>
      </SidebarNavWrap>
    </SidebarContainer>
  );
}

export default Sidebar;
