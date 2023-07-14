import { RootState } from '../../../store';
import Task from '../task-item/Task';
import cls from './TaskList.module.css';
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";

function TaskList() {

   const taskList = useSelector((state: RootState) => state.tasks.taskList);

   return (
      <div className={cls.wrapper}>
         <Grid container spacing={2}>
            <Grid item xl={3} lg={4} md={6}>
               <Task />
            </Grid>
            <Grid item xl={3} lg={4} md={6}>
               <Task n2 />
            </Grid>
            <Grid item xl={3} lg={4} md={6}>
               <Task n3 />
            </Grid>
            <Grid item xl={3} lg={4} md={6}>
               <Task />
            </Grid>
         </Grid>
      </div>
   );
}
export default TaskList;
