import { styled } from '@mui/material';

export const MessageContainer = styled('li')({
  display: 'flex',
  padding: '0 5%',
  marginTop: '3px',
});

export const MessageBox = styled('div')({
  borderRadius: '20px',
  padding: '5px 20px',
  color: 'white',
  display: 'inline-block',
  maxWidth: '80%',
});

export const SentUser = styled('p')({
  display: 'flex',
  alignItems: 'end',
  color: '#828282',
  letterSpacing: '0.3px',
  margin: '0 0 4px',
});

export const MessageText = styled('p')({
  width: '100%',
  letterSpacing: '0',
  float: 'left',
  fontSize: ' 1.1em',
  wordWrap: 'break-word',
});
