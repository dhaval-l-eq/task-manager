import { PropsWithChildren, useState } from 'react';
import Card from '../../../Layout/Card';
import cls from './Task.module.css';
import { Color, TaskProp } from '../../../interfaces/task';
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
import { useDispatch } from 'react-redux';
import { taskActions } from '../../../store/tasks';

function Task(props: PropsWithChildren<TaskProp>) {
   const taskClasses = `${cls.task} ${props.color === Color.C2 && cls.c2} ${props.color === Color.C3 && cls.c3}`;

   const [descVisible, setDescVisible] = useState(false);

   const dispatch = useDispatch();

   function toggleDesc() {
      setDescVisible(prev => !prev);
   }

   function toggleTaskComplete() {
      dispatch(taskActions.toggleCompleteState(props.id));
   }

   function toggleTaskImp() {
      dispatch(taskActions.toggleImpState(props.id));
   }

   function deleteHandler() {
      dispatch(taskActions.deleteTask(props.id));
   }

   return (
      <Card>
         <div className={taskClasses}>
            <div className={cls.header}>
               <h3>{props.title}</h3>
               <IconButton
                  onClick={toggleDesc}
                  className={`${descVisible && cls.expandBtnRotate}`}
                  title="show/hide description"
                  sx={{ padding: 0.6, transition: 'all 0.3s' }}
               >
                  <ExpandMoreIcon sx={{ fontSize: 25 }} />
               </IconButton>
            </div>
            <Collapse in={descVisible}>{props.description && <p className={cls.desc}>{props.description}</p>}</Collapse>
            <div className={cls.info}>
               <p className={cls.date}>{new Date(props.dateCreated).toLocaleDateString()}</p>
               <div className={cls.actionsWrapper}>
                  <Chip
                     className={`${props.complete ? cls.badgeComplete : cls.badgePending}`}
                     onClick={toggleTaskComplete}
                     size="small"
                     icon={props.complete ? <CheckCircleIcon /> : <PendingActionsIcon />}
                     color={props.complete ? 'success' : 'warning'}
                     label={props.complete ? 'complete' : 'pending'}
                     sx={{ fontSize: 12, fontFamily: 'inherit', fontWeight: 400, marginBottom: 0.6 }}
                  />
                  <div className={cls.actions}>
                     <IconButton onClick={toggleTaskImp} title="toggle favorite" sx={{ padding: 0.6 }}>
                        {props.imp ? (
                           <StarRateRoundedIcon color="secondary" sx={{ fontSize: 25 }} />
                        ) : (
                           <StarBorderRoundedIcon sx={{ fontSize: 25 }} />
                        )}
                     </IconButton>

                     <IconButton onClick={deleteHandler} title="Delete task" sx={{ padding: 0.6 }}>
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
