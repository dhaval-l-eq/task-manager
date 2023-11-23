import cls from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import buttonStyles from '../../mui-customization/buttonStyles';
import AuthForm from '../auth/AuthForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { authActions } from '../../store/auth';
import { AuthMode } from '../../api/auth';
import { taskActions } from '../../store/tasks';

function Navbar() {
   const [authFormVisible, setAuthFormVisible] = useState(false);
   const [authMode, setAuthMode] = useState<AuthMode>('signup');

   const showSignupForm = () => {
      setAuthMode('signup');
      setAuthFormVisible(true)
   };

   const showLoginForm = () => {
      setAuthMode('signin');
      setAuthFormVisible(true)
   };

   const hideAuthForm = () => setAuthFormVisible(false);

   const dispatch = useDispatch();

   const userName = useSelector((state: RootState) => state.auth.userName);
   const isAuth: boolean = useSelector((state: RootState) => !!state.auth.token);

   function logoutUser() {
      dispatch(authActions.logoutUser());
      dispatch(taskActions.clearTaskList());
   }

   return (
      <>
         <AuthForm mode={authMode} isVisible={authFormVisible} onHide={hideAuthForm} />
         <div className={cls.navbarWrapper}>
            <nav className={cls.navbar}>
               <div className={cls.logo}>
                  <div className={cls.logoWrapper}>
                     <img src={logo} alt="logo" />
                  </div>
                  <p>TASK MANAGER</p>
               </div>
               <ul className={cls.menu}>
                  <li className={cls.user}>
                     <PersonIcon sx={{ fontSize: 30 }} color="info" />
                  </li>
                  <li>
                     <h2 className={cls.userName}>Hi, {userName.length > 0 ? userName : 'Guest'}!</h2>
                  </li>
                  {!isAuth ? (
                     <>
                        <li>
                           <Button onClick={showSignupForm} sx={buttonStyles} variant="contained">
                              Signup
                           </Button>
                        </li>
                        <li>
                           <Button onClick={showLoginForm} sx={buttonStyles} variant="outlined">
                              Login
                           </Button>
                        </li>
                     </>
                  ) : (
                     <Button onClick={logoutUser} sx={buttonStyles} variant="outlined">
                        Logout
                     </Button>
                  )}
               </ul>
            </nav>
         </div>
      </>
   );
}

export default Navbar;
