import Modal from '../../Layout/Modal';
import cls from '../form-css/Form.module.css';
import Box from '../../Layout/Box';
import { PropsWithChildren, useState, FormEvent, FocusEvent, useRef } from 'react';
import { ModalProps } from '../../interfaces/props';
import { Button } from '@mui/material';
import buttonStyles from '../../mui-customization/buttonStyles';
import { SIGNIN_URL, SIGNUP_URL } from '../../config/authURL';

function AuthForm(props: PropsWithChildren<ModalProps>) {
   interface UserCred {
      value: string;
      isValid: boolean;
      isTouched: boolean;
   }

   const [userName, setUserName] = useState<UserCred>({ value: '', isValid: true, isTouched: false });
   const [email, setEmail] = useState<UserCred>({ value: '', isValid: true, isTouched: false });
   const [password, setPassword] = useState<UserCred>({ value: '', isValid: true, isTouched: false });
   const [cnfPassword, setCnfPassword] = useState<UserCred>({ value: '', isValid: true, isTouched: false });

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
      const enteredValue = (e.target! as HTMLInputElement).value;
      this({ isValid: true, value: enteredValue, isTouched: true });
   }

   function checkInputValidity(this: React.Dispatch<React.SetStateAction<UserCred>>, e: FocusEvent<HTMLInputElement>) {
      const inputEl = e.target! as HTMLInputElement;
      const enteredValue = inputEl.value;
      const id = inputEl.getAttribute('id')!;
      this({ value: enteredValue, isValid: checkValidity(id, enteredValue), isTouched: true });
   }

   function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formIsValid =
         userName.isValid &&
         email.isValid &&
         password.isValid &&
         cnfPassword.isValid &&
         userName.isTouched &&
         email.isTouched &&
         password.isTouched &&
         cnfPassword.isTouched;

      if (!formIsValid) {
         return;
      }

      console.log(userName, password, email);

   }

   return (
      <Modal onHide={props.onHide} isVisible={props.isVisible}>
         <Box>
            <form onSubmit={formSubmitHandler} className={`${cls.form} ${cls.formSmall}`}>
               <div className={cls.heading}>
                  <h1>Create a new account</h1>
               </div>
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
                  {!userName.isValid && <div className={cls.errorInfo}><p>Name is required</p></div>}
               </div>
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
                  {!email.isValid && <div className={cls.errorInfo}><p>Email must contain '@' and '.'</p></div>}
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
                  {!password.isValid && <div className={cls.errorInfo}><p>Password must be atleast 6 characters long</p></div>}
               </div>
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
                  {!cnfPassword.isValid && <div className={cls.errorInfo}><p>Must be same as above!</p></div>}
               </div>
               <div className={cls.actions}>
                  <Button type="submit" variant="contained" sx={buttonStyles}>
                     SignUp
                  </Button>
                  <Button variant="outlined" sx={buttonStyles}>
                     Cancel
                  </Button>
               </div>
            </form>
         </Box>
      </Modal>
   );
}
export default AuthForm;
