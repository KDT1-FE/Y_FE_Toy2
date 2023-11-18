import { styled, AppBar, Typography, Box, Input, Button } from '@mui/material';

export const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Header = styled(AppBar)({
  width: '100%',
  height: '72px',
  color: 'black',
  backgroundColor: 'white',
  position: 'sticky',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const BackBtn = styled(Box)({
  width: '5%',
  height: '100%',
  padding: '12px',
  cursor: 'pointer',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ChatName = styled(Typography)({
  width: '100%',
  height: '100%',
  fontSize: '1.25rem',
  fontWeight: 700,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const EmptyBox = styled(Box)({ width: '5%', height: '100%' });

export const StyledMessages = styled('ul')({
  width: '100%',
  height: '100%',
  padding: '16px 0',

  display: 'flex',
  flexDirection: 'column',
  gap: '6px',

  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#1D3557',
    borderRadius: '25px',
  },
});

export const InputWrapper = styled('div')({
  width: '100%',
  height: '8%',
  // primary.main
  backgroundColor: '#1D3557',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledForm = styled('form')({
  width: '90%',
  height: '60%',
  display: 'flex',
});

export const StyledInput = styled(Input)({
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '10px',
  outline: 'none',
  padding: '16px',
});

export const SendBtn = styled(Button)({
  backgroundColor: '#26446d',
  marginLeft: '8px',
});
