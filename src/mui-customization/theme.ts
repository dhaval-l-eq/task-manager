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
         main: '#FFB085',
      },
   },
   breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1050,
        lg: 1250,
        xl: 1600,
      },
   },
});

export default theme;
