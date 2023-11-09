import { styled } from '@mui/material';

export const Wrapper = styled('div')({
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledMessages = styled('ul')({
  width: '100%',
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
