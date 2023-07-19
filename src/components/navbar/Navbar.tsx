import cls from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import buttonStyles from '../../mui-customization/buttonStyles';
import AuthForm from '../auth/AuthForm';

function Navbar() {
   return (
      <>
         <AuthForm isVisible onHide={() => {}} />
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
                     <h2>Hi, Guest!</h2>
                  </li>
                  <li>
                     <Button sx={buttonStyles} variant="contained">
                        Signup
                     </Button>
                  </li>
                  <li>
                     <Button sx={buttonStyles} variant="outlined">
                        Login
                     </Button>
                  </li>
               </ul>
            </nav>
         </div>
      </>
   );
}

export default Navbar;
