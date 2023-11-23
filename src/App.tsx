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
import { authActions } from './store/auth';
import Creator from './components/creator-info/Creator';

function App() {
   const dispatch = useDispatch();
   const authData = useSelector((state: RootState) => state.auth);

   useEffect(() => {
      if (authData.token) tryLogin();
   }, []);

   async function tryLogin() {
      if (authData.token) {
         try {
            const data = await fetchUserData(authData.userId, authData.token);
            dispatch(taskActions.setAuthUserTasks(data.tasks));
         } catch (error) {
            dispatch(authActions.logoutUser());
         }
      }
   }

   return (
      <ThemeProvider theme={theme}>
         <Navbar />
         <Menu />
         <MainContent />
         <Creator />
      </ThemeProvider>
   );
}

export default App;
