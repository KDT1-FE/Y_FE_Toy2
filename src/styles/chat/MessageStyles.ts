import { Box, Typography, styled } from '@mui/material';

export const MessageContainer = styled('li')({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 5%',
  marginTop: '3px',
  gap: '6px',
});

export const SenderWrapper = styled(Box)({
  display: 'flex',
});

export const ImageWrapper = styled(Box)({
  width: '30px',
  height: '30px',
});

export const SenderImage = styled('img')({
  width: '100%',
  height: '100%',
  borderRadius: ' 50%',
});

export const SenderName = styled('p')({
  display: 'flex',
  alignItems: 'end',
  color: '#828282',
  letterSpacing: '0.3px',
  margin: '0 0 4px 8px',
});

export const MessageWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
});

export const TextBox = styled(Box)({
  borderRadius: '20px',
  padding: '5px 20px',
  color: 'white',
  display: 'inline-block',
  maxWidth: '80%',
});

export const MessageText = styled('p')({
  width: '100%',
  fontSize: ' 1.1em',
});

export const Date = styled(Typography)({
  margin: '0 4px',
  color: '#828282',
});
