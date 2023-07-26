import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button, IconButton } from '@mui/material';
import buttonStyles from '../../../mui-customization/buttonStyles';
import cls from './AddTask.module.css';
import { useState, PropsWithChildren } from 'react';
import TaskForm from '../../task-actions/TaskForm';
import MobileButton from '../../../Layout/MobileButton';

interface AddTaskProps {
   mobile?: boolean;
}

function AddTask(props: PropsWithChildren<AddTaskProps>) {
   const [addTaskVisible, setAddTaskVisible] = useState(false);

   const showAddTask = () => setAddTaskVisible(true);
   const hideAddTask = () => setAddTaskVisible(false);

   return (
      <>
         <div className={cls.inMenu}>
            {!props.mobile ? (
               <Button
                  onClick={showAddTask}
                  startIcon={<AddTaskIcon />}
                  className={cls.addTaskBtn}
                  sx={{ ...buttonStyles, py: 2 }}
                  fullWidth
                  variant="contained"
                  color="secondary"
               >
                  Add Task
               </Button>
            ) : (
               <MobileButton onClick={showAddTask}>
                  <AddTaskIcon fontSize='large'/>
               </MobileButton>
            )}
         </div>
         <TaskForm isVisible={addTaskVisible} onHide={hideAddTask} />
      </>
   );
}
export default AddTask;
