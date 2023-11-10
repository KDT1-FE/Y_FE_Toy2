import { Box, styled } from '@mui/material';
import { motion } from 'framer-motion';

export const OpenchatContainer = styled('main')({
  backgroundColor: '#f5f5f5',
});

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
  padding: '1rem',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  justifyContent: 'space-between',
  '.openchat__room-avatar': { flex: 0 },
  '.openchat__room-info': {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
  },
  '.openchat__room-desc': {
    flex: 4,
    margin: '0 0.8rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0 4px',
    },
  },
  '.openchat__room-btn': { flex: 1 },
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

export const OpenchatCreateChatModal = styled(motion.div)({
  backgroundColor: '#fff',
  width: '100%',
  maxWidth: '440px',
  height: '100%',
  maxHeight: '688px',
  position: 'relative',
  padding: '1rem',
  border: `1px solid #ddd`,
  borderRadius: '10px',
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
});
