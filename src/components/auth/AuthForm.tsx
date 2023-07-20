import Modal from '../../Layout/Modal';
import cls from '../form-css/Form.module.css';
import Box from '../../Layout/Box';
import { PropsWithChildren, useState, FormEvent, FocusEvent } from 'react';
import { ModalProps } from '../../interfaces/props';
import { Button } from '@mui/material';
import buttonStyles from '../../mui-customization/buttonStyles';
import { AuthMode, authenticateUser, fetchUserData, sendUserData } from '../../api/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { UserAuthData, authActions } from '../../store/auth';

interface AuthProps extends ModalProps {
   mode: AuthMode;
}

function AuthForm(props: PropsWithChildren<AuthProps>) {
   interface UserCred {
      value: string;
      isValid: boolean;
      isTouched: boolean;
   }

   const dispatch = useDispatch();

   const [userName, setUserName] = useState<UserCred>({ value: '', isValid: true, isTouched: false });
   const [email, setEmail] = useState<UserCred>({ value: '', isValid: true, isTouched: false });
   const [password, setPassword] = useState<UserCred>({ value: '', isValid: true, isTouched: false });
   const [cnfPassword, setCnfPassword] = useState<UserCred>({ value: '', isValid: true, isTouched: false });

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   function checkValidity(elementId: string, value: string) {
      switch (elementId) {
         case 'name':
            return value.length > 0;
         case 'email':
            return value.length > 0 && value.includes('@') && value.includes('.');
         case 'password':
            return value.length >= 6;
         case 'cnf-password':
            return value.length >= 6 && value === password.value;
         default:
            return false;
      }
   }

   function inputChangeHandler(this: React.Dispatch<React.SetStateAction<UserCred>>, e: FormEvent) {
      setError(null);
      const enteredValue = (e.target! as HTMLInputElement).value;
      this({ isValid: true, value: enteredValue, isTouched: true });
   }

   function checkInputValidity(this: React.Dispatch<React.SetStateAction<UserCred>>, e: FocusEvent<HTMLInputElement>) {
      const inputEl = e.target! as HTMLInputElement;
      const enteredValue = inputEl.value;
      const id = inputEl.getAttribute('id')!;
      this({ value: enteredValue, isValid: checkValidity(id, enteredValue), isTouched: true });
   }

   async function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      let formIsValid =
         userName.isValid &&
         email.isValid &&
         password.isValid &&
         cnfPassword.isValid &&
         userName.isTouched &&
         email.isTouched &&
         password.isTouched &&
         cnfPassword.isTouched;

      if (props.mode === 'signin') {
         formIsValid = email.isValid && password.isValid && email.isTouched && password.isTouched;
      }

      if (!formIsValid) {
         return;
      }

      setLoading(true);

      // console.log(userName, password, email);
      const userData = {
         email: email.value,
         password: password.value,
         returnSecureToken: true,
      };

      try {
         const payload = await authenticateUser(userData, props.mode);
         console.log(payload);

         let authUserName;

         if (props.mode === 'signup') {
            await sendUserData(userName.value, payload.localId, payload.idToken);
            authUserName = userName.value;
         } else {
            const data = await fetchUserData(payload.localId, payload.idToken);
            authUserName = data.userName;
         }

         const authData: UserAuthData = {
            userId: payload.localId,
            token: payload.idToken,
            expiration: +payload.expiresIn,
            userName: authUserName,
         };

         dispatch(authActions.setUser(authData));
         setLoading(false);
         props.onHide();
      } catch (error: any) {
         setLoading(false);
         setError('Signup failed! ' + error.message);
         console.log(error);
      }
   }

   return (
      <Modal onHide={props.onHide} isVisible={props.isVisible}>
         <Box>
            <form onSubmit={formSubmitHandler} className={`${cls.form} ${cls.formSmall}`}>
               <div className={cls.heading}>
                  {props.mode === 'signup' && <h1>Create a new account</h1>}
                  {props.mode === 'signin' && <h1>Login to your account</h1>}
               </div>
               {props.mode === 'signup' && (
                  <div className={cls.formControl}>
                     <label htmlFor="name">Your Name</label>
                     <input
                        onBlur={checkInputValidity.bind(setUserName)}
                        onInput={inputChangeHandler.bind(setUserName)}
                        className={`${!userName.isValid && cls.error}`}
                        type="text"
                        name="name"
                        id="name"
                     />
                     {!userName.isValid && (
                        <div className={cls.errorInfo}>
                           <p>Name is required</p>
                        </div>
                     )}
                  </div>
               )}
               <div className={cls.formControl}>
                  <label htmlFor="email">Your Email</label>
                  <input
                     onBlur={checkInputValidity.bind(setEmail)}
                     onInput={inputChangeHandler.bind(setEmail)}
                     className={`${!email.isValid && cls.error}`}
                     type="text"
                     name="email"
                     id="email"
                  />
                  {!email.isValid && (
                     <div className={cls.errorInfo}>
                        <p>Email must contain '@' and '.'</p>
                     </div>
                  )}
               </div>
               <div className={cls.formControl}>
                  <label htmlFor="password">Password</label>
                  <input
                     onBlur={checkInputValidity.bind(setPassword)}
                     onInput={inputChangeHandler.bind(setPassword)}
                     className={`${!password.isValid && cls.error}`}
                     type="password"
                     name="password"
                     id="password"
                  />
                  {!password.isValid && (
                     <div className={cls.errorInfo}>
                        <p>Password must be atleast 6 characters long</p>
                     </div>
                  )}
               </div>
               {props.mode === 'signup' && (
                  <div className={cls.formControl}>
                     <label htmlFor="cnf-password">Confirm Password</label>
                     <input
                        onBlur={checkInputValidity.bind(setCnfPassword)}
                        onInput={inputChangeHandler.bind(setCnfPassword)}
                        className={`${!cnfPassword.isValid && cls.error}`}
                        type="password"
                        name="cnf-password"
                        id="cnf-password"
                     />
                     {!cnfPassword.isValid && (
                        <div className={cls.errorInfo}>
                           <p>Must be same as above!</p>
                        </div>
                     )}
                  </div>
               )}
               {error && (
                  <div className={cls.authError}>
                     <p>{error}</p>
                  </div>
               )}
               {loading && <div className={cls.spinner}><CircularProgress  /></div>}
               <div className={cls.actions}>
                  <Button disabled={loading} type="submit" variant="contained" sx={buttonStyles}>
                     SignUp
                  </Button>
                  <Button onClick={props.onHide} disabled={loading} variant="outlined" sx={buttonStyles}>
                     Cancel
                  </Button>
               </div>
            </form>
         </Box>
      </Modal>
   );
}
export default AuthForm;
