import { createTheme, Theme as MuiTheme } from '@mui/material/styles';
import '@emotion/react';

declare module '@emotion/react' {
  /**
   * Use MaterialUI Theme as the default emotion theme
   */
  export interface Theme extends MuiTheme {}
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
