import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import theme from './mui-customization/theme';
import Menu from './components/menu/Menu';
import MainContent from './components/main-content/MainContent';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from './store/tasks';
import { fetchUserData } from './api/auth';
import { RootState } from './store';

function App() {
   const dispatch = useDispatch();
   const authData = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      if (authData.token) tryLogin();
   }, []);

   async function tryLogin() {
      if (authData.token) {
         const data = await fetchUserData(authData.userId, authData.token);
         dispatch(taskActions.setAuthUserTasks(data.tasks));
      }
   }

   return (
      <ThemeProvider theme={theme}>
         <Navbar />
         <Menu />
         <MainContent />
      </ThemeProvider>
   );
}

export default App;
