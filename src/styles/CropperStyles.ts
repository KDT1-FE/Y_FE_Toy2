import { styled } from '@mui/material';

const CropperContainer = styled('div')({
  marginTop: '50px',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  '.add-icon': {
    width: '50px',
    height: '50px',
  },
  input: {
    display: 'none',
  },
  '.img-container': {
    marginTop: '30px',
    borderRadius: '50%',
    border: '3px solid black',
    img: {
      display: 'block',
      borderRadius: '50%',
    },
  },
});

export default CropperContainer;
