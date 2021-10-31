import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
    //   light: '#2d2d2d',
      main: '#013631',
      dark: '#2d2d2d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fbbf54',
      main: '#C48F22',
      dark: '#8f6200',
      contrastText: '#000',
    },
    background:{
        paper: '#f2eeee',
        default: '#fbbf54'
     }
  },
});

