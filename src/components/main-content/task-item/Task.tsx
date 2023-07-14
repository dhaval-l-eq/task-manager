import { PropsWithChildren, useState } from 'react';
import Card from '../../../Layout/Card';
import cls from './Task.module.css';
import { TaskProp } from '../../../interfaces/task';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Task(props: PropsWithChildren<TaskProp>) {
   const taskClasses = `${cls.task} ${props.n2 && cls.n2} ${props.n3 && cls.n3}`;

   const [descVisible, setDescVisible] = useState(false);

   function toggleDesc() {
        setDescVisible(prev => !prev);
   }

   return (
      <Card>
         <div className={taskClasses}>
            <div className={cls.header}>
               <h3>This is title of task</h3>
               <IconButton onClick={toggleDesc} className={`${descVisible && cls.expandBtnRotate}`} title="Edit task" sx={{ padding: 0.6, transition: 'all 0.3s' }}>
                  <ExpandMoreIcon sx={{ fontSize: 25 }} />
               </IconButton>
            </div>
            <Collapse in={descVisible}>
            <p className={cls.desc}>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sed, sunt praesentium aperiam fuga vitae
               accusamus, necessitatibus quaerat quae dolores odio magnam dicta, quasi impedit repellat doloremque fugiat labore.
               Earum?
            </p>
            </Collapse>
            <div className={cls.info}>
               <p className={cls.date}>23/4/2023</p>
               <div className={cls.actionsWrapper}>
                  <Chip
                     size="small"
                     icon={<PendingActionsIcon />}
                     color="warning"
                     label="incomplete"
                     sx={{ fontSize: 12, fontFamily: 'inherit', fontWeight: 400, marginBottom: 0.6 }}
                  />
                  <div className={cls.actions}>
                     {/* <IconButton sx={{padding: 0.6}}>
                        <StarRateRoundedIcon color='secondary' sx={{fontSize: 25}} />
                    </IconButton> */}
                     <IconButton title="toggle favorite" sx={{ padding: 0.6 }}>
                        <StarBorderRoundedIcon sx={{ fontSize: 25 }} />
                     </IconButton>
                     <IconButton title="Delete task" sx={{ padding: 0.6 }}>
                        <DeleteIcon sx={{ fontSize: 25 }} />
                     </IconButton>
                     <IconButton title="Edit task" sx={{ padding: 0.6 }}>
                        <EditIcon sx={{ fontSize: 25 }} />
                     </IconButton>
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );
}

export default Task;
