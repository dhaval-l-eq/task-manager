import AddTaskIcon from '@mui/icons-material/AddTask';
import { Button } from '@mui/material';
import buttonStyles from '../../../mui-customization/buttonStyles';
import cls from './AddTask.module.css';

function AddTask() {
   return (
      <div className={cls.inMenu}>
         <Button
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
   );
}
export default AddTask;
