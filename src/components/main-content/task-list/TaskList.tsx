import { useState } from 'react';
import Card from '../../../Layout/Card';
import { RootState } from '../../../store';
import Task from '../task-item/Task';
import cls from './TaskList.module.css';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import AddTaskForm from '../../task-actions/AddTaskForm';

function TaskList() {
   const taskList = useSelector((state: RootState) => state.tasks.taskList);

   const [addTaskVisible, setAddTaskVisible] = useState(false);

   const showAddTask = () => setAddTaskVisible(true);
   const hideAddTask = () => setAddTaskVisible(false);

   return (
      <>
         <div className={cls.wrapper}>
            {taskList.length === 0 && <h2 className={cls.fallback}>No Task to show! Please add some task...</h2>}
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
                  <Card button>
                     <div onClick={showAddTask} className={cls.addTask}>
                        <h2>Add Task</h2>
                     </div>
                  </Card>
               </Grid>
            </Grid>
         </div>
         <AddTaskForm isVisible={addTaskVisible} onHide={hideAddTask} />
      </>
   );
}
export default TaskList;
