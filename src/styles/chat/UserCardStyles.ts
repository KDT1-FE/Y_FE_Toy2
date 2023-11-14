import { Box, styled } from '@mui/material';

interface IStyledWrapperProps {
  select: boolean;
}

export const Wrapper = styled('div')(({ select }: IStyledWrapperProps) => ({
  padding: '8px 16px',
  cursor: 'pointer',
  backgroundColor: `${select ? '#eeeeee' : ''}`,

  display: 'flex',
  alignItems: 'center',
  gap: '14px',

  '&:hover': {
    backgroundColor: '#eeeeee',
  },
}));

export const ImgWrapper = styled(Box)({});

export const UserImg = styled('img')({
  width: '44px',
  height: '44px',
  borderRadius: '50%',
});

export const UserName = styled('p')({});
