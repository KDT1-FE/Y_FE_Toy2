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

export default theme;
