import { useState, useEffect } from 'react';
import Card from '../../../Layout/Card';
import { RootState } from '../../../store';
import Task from '../task-item/Task';
import cls from './TaskList.module.css';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import TaskForm from '../../task-actions/TaskForm';

function TaskList() {
   const allTaskList = useSelector((state: RootState) => state.tasks.taskList);
   const filterCriteria = useSelector((state: RootState) => state.tasks.filterCriteria);
   const sortCriteria = useSelector((state: RootState) => state.tasks.sortCriteria);

   const [tasksToShow, setTasksToShow] = useState(allTaskList);

   useEffect(() => {
      switch (filterCriteria) {
         case 'pending':
            setTasksToShow(allTaskList.filter(task => !task.complete));
            break;
         case 'all':
            setTasksToShow(allTaskList);
            break;
         case 'finished':
            setTasksToShow(allTaskList.filter(task => task.complete));
            break;
         case 'important':
            setTasksToShow(allTaskList.filter(task => task.imp));
            break;
      }
   },[filterCriteria, allTaskList])

   const [addTaskVisible, setAddTaskVisible] = useState(false);

   const showAddTask = () => setAddTaskVisible(true);
   const hideAddTask = () => setAddTaskVisible(false);

   function RenderTaskList() {
      return tasksToShow.map(task => (
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
               <RenderTaskList />
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
