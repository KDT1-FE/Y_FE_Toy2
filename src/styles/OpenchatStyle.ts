import { Box, Grid, styled } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

export const OpenchatContainer = styled('main')<{ isOpenModal: boolean }>(
  ({ isOpenModal }) => ({
    backgroundColor: '#f5f5f5',
    height: isOpenModal ? '100vh' : 'auto',
    overflow: isOpenModal ? 'hidden' : 'initial',
  }),
);

export const OpenchatAppbar = styled('div')({
  position: 'sticky',
  top: 0,
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  padding: '0.8rem',
  backgroundColor: 'white',
  overflow: 'auto',
  zIndex: 2,
});

export const OpenchatBox = styled(Box)(({ theme }) => ({
  paddingTop: '58px',
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    margin: '0 -16px',
  },
}));

export const OpenchatRoom = styled(Box)(({ theme }) => ({
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  backgroundColor: [theme.palette.common.white],
  padding: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
    margin: '0 -6px',
    borderRadius: 0,
  },
  '& .openchat__room-avatar': {
    width: '3.3rem',
    '& img': { verticalAlign: 'top' },
  },
  '& .openchat__room-info': {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  '& .openchat__room-desc': {
    flex: '7 1 70%',
    margin: '0 0.5rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0 6px',
    },
    '& .overflow-ellipsis': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '240px',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '200px',
      },
    },
  },
  '& .openchat__room-btn': { flex: '1 1 10%' },
}));

export const OpenchatCreateChatBtn = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

interface ChatWrapProps {
  isOpen: string | null;
}

export const OpenchatCreateChatWrap = styled('div')<ChatWrapProps>(
  ({ isOpen }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: isOpen ? 'rgba(0,0,0,0.66)' : 'rgba(0,0,0,0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.2s',
    visibility: isOpen ? 'visible' : 'hidden',
  }),
);

export const OpenchatCreateChatModal = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '480px',
  height: '100%',
  boxSizing: 'border-box',
  maxHeight: '660px',
  padding: '1rem',
  backgroundColor: '#fff',
  border: `1px solid #ddd`,
  borderRadius: '10px',
  overflow: 'scroll',
  [theme.breakpoints.down('sm')]: {
    maxHeight: '768px',
    borderRadius: '0',
  },
  '& .openchat__reset-btn': {
    position: 'absolute',
    top: '1rem',
    right: '100px',
  },
  '& .openchat__submit-btn': {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
  '& .modal-title .MuiSvgIcon-fontSizeMedium': {
    verticalAlign: 'middle',
    marginRight: '6px',
  },
}));

export const OpenchatAvatarWrap = styled('div')({
  position: 'relative',
  margin: 'auto',
  width: '3.3rem',
  height: '3.3rem',
  overflow: 'hidden',
  userSelect: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url("data:image/svg+xml,%3csvg width='88px' height='88px' viewBox='0 0 88 88' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cpath d='M44%2c0.5 C59.8650505%2c0.5 70.7664452%2c3.40244096 77.6820021%2c10.3179979 C84.597559%2c17.2335548 87.5%2c28.1349495 87.5%2c44 C87.5%2c59.8650505 84.597559%2c70.7664452 77.6820021%2c77.6820021 C70.7664452%2c84.597559 59.8650505%2c87.5 44%2c87.5 C28.1349495%2c87.5 17.2335548%2c84.597559 10.3179979%2c77.6820021 C3.40244096%2c70.7664452 0.5%2c59.8650505 0.5%2c44 C0.5%2c28.1349495 3.40244096%2c17.2335548 10.3179979%2c10.3179979 C17.2335548%2c3.40244096 28.1349495%2c0.5 44%2c0.5 Z' fill='none' stroke='rgba(0,0,0,0.08)'%3e%3c/path%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  },
  '& .svg-profile': {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  '& .default-txt': {
    fontSize: '2em',
    fill: '#fff',
  },

  '& .default-bg': {
    width: '100%',
    height: '100%',
  },
});

export const OpenchatFriendWrap = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '10px 0',
  alignItems: 'center',
  '& .openchat__friend-img': {
    flex: '0 1 48px',
    width: '48px',
    height: '48px',
    overflow: 'hidden',
    borderRadius: '100%',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      verticalAlign: 'middle',
    },
  },
  '& .openchat__friend-text': {
    flex: '1 1 50%',
    margin: '0 10px',
    '& .overflow-ellipsis': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '150px',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '250px',
      },
    },
  },
  '& .openchat__friend-send': {
    flex: '0 1 20px',
    cursor: 'pointer',
    color: '#1D3557',
    alignSelf: 'center',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#A8DADC',
    },
  },
}));

export const OpenchatRoomAppbar = React.memo(
  styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.background.paper,
    height: '62px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    padding: '5px 10px',
    boxSizing: 'border-box',
    '& .openchat__room-appbar-wrap': {
      display: 'flex',
      alignItems: 'center',
    },
  })),
);

export const OpenchatMessageWrap = React.memo(
  styled(Box)(({ theme }) => ({
    padding: '0 0 62px',
    minHeight: '100vh',
    boxSizing: 'border-box',
  })),
);

export const OpenchatMessageItemWrap = styled(Box)<{ isme: string }>(
  ({ theme, isme }) => ({
    padding: '1rem 0',
    alignSelf: isme === 'true' ? 'flex-end' : 'flex-start',
    display: 'flex',
    gap: 10,
    '& .openchat__msg-wrapper': {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: isme === 'true' ? 'row-reverse' : 'row',
      gap: '8px',
    },
    '& .openchat__msg-box': {
      flex: '1 1 auto',
      maxWidth: '360px',
      backgroundColor:
        isme === 'true'
          ? theme.palette.primary.main
          : theme.palette.secondary.light,
      color:
        isme === 'true'
          ? theme.palette.background.paper
          : theme.palette.common.black,
      padding: '1rem',
      borderRadius: '10px',
    },
    '& .openchat__time-box': {
      flex: '0 0 4rem',
      textAlign: isme === 'true' ? 'right' : 'left',
    },
  }),
);

export const OpenchatSenderWrap = styled(Grid)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  '& .openchat__sender-input': {
    flex: '1 1 80%',
    display: 'block',
    padding: '10px',
    border: 0,
  },
}));
