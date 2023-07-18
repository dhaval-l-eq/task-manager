import { PropsWithChildren, Key } from 'react';
import cls from './Card.module.css';
import { AnimatePresence, motion } from 'framer-motion';

interface CardProps {
   button?: boolean;
   isVisible: boolean;
   cardId: Key;
}

const transitionState = {
   initial: { opacity: 0, y: 20 },
   open: { opacity: 1, y: 0, x: 0 },
   closed: { opacity: 0, x: -50, rotate: 20 },
};

function Card(props: PropsWithChildren<CardProps>) {
   return (
      <AnimatePresence>
         {props.isVisible && (
            <motion.div
               key={props.cardId}
               initial={transitionState.initial}
               animate={transitionState.open}
               exit={transitionState.closed}
               transition={{ duration: 0.2 }}
               className={`${cls.card} ${props.button && cls.btn}`}
            >
               {props.children}
            </motion.div>
         )}
      </AnimatePresence>
   );
}
export default Card;
