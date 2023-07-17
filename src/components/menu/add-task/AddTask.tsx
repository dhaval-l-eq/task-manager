import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button } from '@mui/material';
import buttonStyles from '../../../mui-customization/buttonStyles';
import cls from './AddTask.module.css';
import { useState } from 'react';
import AddTaskForm from '../../task-actions/AddTaskForm';

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
         <AddTaskForm isVisible={addTaskVisible} onHide={hideAddTask} />
      </>
   );
}
export default AddTask;
