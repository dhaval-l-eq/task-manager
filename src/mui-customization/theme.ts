import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      secondary: {
        main: '#FF8474',
        dark: '#e26d5e',
      },
      primary: {
        main: '#2048a7',
      },
      info: {
        main: '#565656',
      },
      success: {
        main: '#7ab68e',
      },
      warning: {
        main: '#FFB085'
      }
    },
  });

  export default theme;