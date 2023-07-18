import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button } from '@mui/material';
import buttonStyles from '../../../mui-customization/buttonStyles';
import cls from './AddTask.module.css';
import { useState } from 'react';
import TaskForm from '../../task-actions/TaskForm';

function AddTask() {
   const [addTaskVisible, setAddTaskVisible] = useState(false);

   const showAddTask = () => setAddTaskVisible(true);
   const hideAddTask = () => setAddTaskVisible(false);

   return (
      <>
         <div className={cls.inMenu}>
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
         </div>
         <TaskForm isVisible={addTaskVisible} onHide={hideAddTask} />
      </>
   );
}
export default AddTask;
