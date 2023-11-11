import { styled } from '@mui/material';

export const Wrapper = styled('div')({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledMessages = styled('ul')({
  width: '100%',
  overflowY: 'scroll',
  padding: '16px 0',
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
