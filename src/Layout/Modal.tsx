import { EventHandler, SyntheticEvent } from 'react';
import cls from './Modal.module.css';
import { createPortal } from 'react-dom';
import { PropsWithChildrenReq } from '../interfaces/props';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProp {
   onHide: EventHandler<SyntheticEvent>;
   isVisible: boolean;
}

function Modal(props: PropsWithChildrenReq<ModalProp>) {
   const transitionState = {
      open: { opacity: 1, y: '-50%', x: '-50%' },
      closed: { opacity: 0, y: '0%', x: '-50%' }
   };

   return createPortal(
            <>
               {props.isVisible && <div onClick={props.onHide} className={cls.overlay}></div>}
               <AnimatePresence>
                  {props.isVisible && (
                     <motion.div
                        key="modal"
                        initial={transitionState.closed}
                        animate={transitionState.open}
                        exit={transitionState.closed}
                        transition={{ duration: 0.3 }}
                        className={cls.modal}
                     >
                        {props.children}
                     </motion.div>
                  )}
               </AnimatePresence>
            </>,
            document.body
         );
}
export default Modal;
