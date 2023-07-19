import { useState } from 'react';
import Card from '../../../Layout/Card';
import { RootState } from '../../../store';
import Task from '../task-item/Task';
import cls from './TaskList.module.css';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import TaskForm from '../../task-actions/TaskForm';
import { Task as TaskInterface } from '../../../interfaces/task';
import { AnimatePresence, motion } from 'framer-motion';

function TaskList() {
   const allTaskList = useSelector((state: RootState) => state.tasks.taskList);
   const filteredTasks = useSelector((state: RootState) => state.tasks.filteredTask);

   const [addTaskVisible, setAddTaskVisible] = useState(false);

   const showAddTask = () => setAddTaskVisible(true);
   const hideAddTask = () => setAddTaskVisible(false);

   function RenderTaskList(taskList: TaskInterface[]) {
      return taskList.map(task => (
         <Grid className='w100' key={task.id} item xl={3} lg={4} md={6}>
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
      ))
   }

   return (
      <>
         <div className={cls.wrapper}>
            {allTaskList.length === 0 && <h2 className={cls.fallback}>No Task to show! Please add some task...</h2>}
            <Grid container spacing={2}>
               {filteredTasks ? RenderTaskList(filteredTasks) : RenderTaskList(allTaskList)}
               <Grid className='w100' item xl={3} lg={4} md={6}>
                  <Card cardId='add-task-btn' isVisible button>
                     <div onClick={showAddTask} className={cls.addTask}>
                        <h2>Add Task</h2>
                     </div>
                  </Card>
               </Grid>
            </Grid>
         </div>
         <TaskForm isVisible={addTaskVisible} onHide={hideAddTask} />
      </>
   );
}
export default TaskList;
