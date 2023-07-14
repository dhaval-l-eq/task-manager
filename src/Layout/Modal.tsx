import { EventHandler, PropsWithChildren, SyntheticEvent } from 'react';
import cls from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Fade } from '@mui/material';

interface ModalProp {
   onHide: EventHandler<SyntheticEvent>;
   isVisible: boolean;
}

function Modal(props: PropsWithChildren<ModalProp>) {

   return (
      <>
         {createPortal(
            <>
               <div onClick={props.onHide} className={cls.overlay}></div>
               <Fade easing='ease-in' timeout={300} in={props.isVisible}>
                  <div className={cls.modal}>
                     {props.children}
                  </div>
               </Fade>
            </>,
            document.body
         )}
      </>
   );
}
export default Modal;
