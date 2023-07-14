import Card from '../../../Layout/Card';
import { RootState } from '../../../store';
import Task from '../task-item/Task';
import cls from './TaskList.module.css';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

function TaskList() {
   const taskList = useSelector((state: RootState) => state.tasks.taskList);

   return (
      <div className={cls.wrapper}>
         <Grid container spacing={2}>
            {taskList.map(task => (
               <Grid key={task.id} item xl={3} lg={4} md={6}>
                  <Task
                     id={task.id}
                     title={task.title}
                     description={task.description}
                     dateCreated={task.dateCreated}
                     imp={task.imp}
                     complete={task.complete}
                     color={task.color}
                  />
               </Grid>
            ))}
            <Grid item xl={3} lg={4} md={6}>
               <Card>
                  <div className={cls.addTask}>
                     <h2>Add Task</h2>
                  </div>
               </Card>
            </Grid>
         </Grid>
         {taskList.length === 0 && <h2 className={cls.fallback}>No Task to show! Please add some task...</h2>}
      </div>
   );
}
export default TaskList;
