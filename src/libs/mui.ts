import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      // 'Bungee',
      '"Noto Sans KR"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1D3557',
    },
    secondary: {
      main: '#A8DADC',
    },
  },
});

theme.typography.body1 = {
  fontSize: '14px',
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
  },
};
theme.typography.body2 = {
  fontSize: '13px',
  [theme.breakpoints.down('md')]: {
    fontSize: '11px',
  },
};

export default theme;
