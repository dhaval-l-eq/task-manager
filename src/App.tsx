import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/navbar/Navbar';
import theme from './mui-customization/theme';
import Menu from './components/menu/Menu';
import MainContent from './components/main-content/MainContent';

function App() {
   return (
      <ThemeProvider theme={theme}>
         <Navbar />
         <Menu />
         <MainContent />
      </ThemeProvider>
   );
}

export default App;
