import { styled } from '@mui/material';

const CropperContainer = styled('div')(({ theme }) => ({
  marginTop: '50px',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  '.add-icon': {
    width: '40px',
    height: '40px',
    marginRight: '4px',
  },
  input: {
    display: 'none',
  },
  '.img-container': {
    width: '200px',
    height: '200px',
    margin: 'auto',
    borderRadius: '50%',
    border: '3px solid black',
    img: {
      display: 'block',
      borderRadius: '50%',
    },
  },
  '.fake-upload-btn': {
    display: 'flex',
    alignItems: 'center',
    width: '120px',
    padding: '1rem 0.8rem',
    margin: '0 auto 1rem',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '10px',
    transition: 'background-color 0.3s',
    '&:hover, &:active, &:focus': {
      backgroundColor: '#f5f5f5',
    },
  },
}));

export default CropperContainer;
