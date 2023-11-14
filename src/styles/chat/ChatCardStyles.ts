import { styled } from '@mui/material';

export const Wrapper = styled('div')({
  height: '72px',
  padding: '10px 24px',

  display: 'flex',
  alignItems: 'center',

  '&:hover': {
    backgroundColor: '#fafafa',
  },
});

export const ChatContainer = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
});

export const ImageWrapper = styled('div')({
  paddingRight: '12px',
});

export const PartnerImage = styled('img')({
  width: '56px',
  height: '56px',
  borderRadius: '50%',
});

export const ChatPreviewWrapper = styled('div')({
  height: '44px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const ChatName = styled('span')({ fontWeight: 700 });

export const LatestMessageWrapper = styled('div')({
  fontWeight: 400,
  fontSize: '0.75rem',

  display: 'flex',
  gap: '10px',
});

export const LatestMessage = styled('span')({});

export const LatestMessageTime = styled('span')({
  color: '#737373',
});
