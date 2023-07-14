import Button from '@mui/material/Button';
import Box from '../../Layout/Box';
import Modal from '../../Layout/Modal';
import cls from './DeleteConfirm.module.css';
import buttonStyles from '../../mui-customization/buttonStyles';
import { EventHandler, PropsWithChildren, SyntheticEvent } from 'react';

interface DelConfProp {
   onHide: EventHandler<SyntheticEvent>;
   onConfirm: EventHandler<SyntheticEvent>;
   isVisible: boolean;
}

function DeleteConfirm(props: PropsWithChildren<DelConfProp>) {
   return (
      <Modal isVisible={props.isVisible} onHide={props.onHide}>
         <Box>
            <h2 className={cls.title}>
               Are you sure, you want to <span className={cls.redText}>DELETE</span> this task?
            </h2>
            <div className={cls.actions}>
               <Button onClick={props.onConfirm} color="secondary" variant="contained" sx={buttonStyles}>
                  Yes
               </Button>
               <Button onClick={props.onHide} color="success" variant="contained" sx={buttonStyles}>
                  No
               </Button>
            </div>
         </Box>
      </Modal>
   );
}
export default DeleteConfirm;
