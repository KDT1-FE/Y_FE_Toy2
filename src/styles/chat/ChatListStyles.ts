import { Box, Button, InputBase, Typography, styled } from '@mui/material';

export const Wrapper = styled('div')({
  display: 'flex',
});

export const ChatsWrapper = styled('div')({
  borderRight: '1px solid #dbdbdb',
  width: '440px',
  height: '100vh',
});

export const NewMessageWrapper = styled('div')({
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
});

export const NewMessageImgBox = styled(Box)({
  width: '60px',
  height: '60px',
});

export const NewMessageTitle = styled(Typography)({
  fontSize: '1.25rem',
});

export const NewMessageBody = styled(Typography)({
  fontSize: '0.825rem',
  color: '#737373',
});

export const NewMessageBtn = styled(Button)({});

export const ModalWrapper = styled('div')({
  width: '550px',
  height: '620px',
  backgroundColor: 'white',
  borderRadius: '20px',

  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',

  display: 'flex',
  flexDirection: 'column',
});

export const ModalHeader = styled('div')({
  borderBottom: '1px solid #dbdbdb',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const EmptyBox = styled(Box)({ width: '46px', height: '100%' });

export const ModalTitle = styled(Typography)({
  fontWeight: 700,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const CancelBtn = styled(Box)({ padding: '12px', cursor: 'pointer' });

export const ModalPartnerSearch = styled('div')({
  borderBottom: '1px solid #dbdbdb',
  display: 'flex',
});

export const Partner = styled(Typography)({
  width: '20%',
  fontWeight: 700,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SearchInput = styled(InputBase)({ width: '100%', padding: '8px' });

export const ModalUserList = styled('div')({
  height: '100%',

  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#1D3557',
    borderRadius: '25px',
  },
});

export const UserNotFound = styled(Typography)({
  padding: '16px',
  color: '#737373',
});

export const ModalFooter = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StartChatBtn = styled(Button)({
  width: '100%',
  padding: '16px',
  borderRadius: '0 0 20px 20px',
});
