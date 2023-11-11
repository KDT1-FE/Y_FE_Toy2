import { Box, Button, InputBase, Typography, styled } from '@mui/material';

export const Wrapper = styled('div')({
  display: 'flex',
});

export const ChatListWrapper = styled('div')({
  borderRight: '1px solid #dbdbdb',
  width: '380px',
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

export const Title = styled(Typography)({
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
