import { createSlice } from '@reduxjs/toolkit';
import { Color, Task } from '../interfaces/task';

const dummyTaskList: Task[] = [
   {
      id: 't1',
      title: 'Learn React',
      description:
         'lorem isklj react is a popular front end lakds ksjdilfejfla laksdjflisaejfl  djsflkldf jklfjjkdjflaks djfjskdf',
      dateCreated: new Date().toISOString(),
      imp: true,
      complete: false,
      color: Color.C1,
   },
   {
      id: 't2',
      title: 'Learn Angular',
      description:
         'lorem isklj react is a popular front end lakds ksjdilfejfla laksdjflisaejfl  djsflkldf jklfjjkdjflaks djfjskdf',
      dateCreated: new Date(2022, 5, 25).toISOString(),
      imp: false,
      complete: false,
      color: Color.C2,
   },
   {
      id: 't3',
      title: 'Learn Vue',
      description:
         'lorem isklj react is a popular front end lakds ksjdilfejfla laksdjflisaejfl  djsflkldf jklfjjkdjflaks djfjskdf',
      dateCreated: new Date(2020, 2, 12).toISOString(),
      imp: true,
      complete: false,
      color: Color.C3,
   },
];

function findTask(taskList: Task[], id: any): Task {
   return taskList.find(task => task.id === id)!;
}

const taskSlice = createSlice({
   name: 'task',
   initialState: {
      taskList: [] as Task[],
      filteredTask: [] as Task[],
      stateChanged: false,
   },
   reducers: {
      toggleCompleteState(state, { payload: taskId }) {
         const taskToModify = findTask(state.taskList!, taskId);
         taskToModify.complete = !taskToModify.complete;
         state.stateChanged = true;
      },
      toggleImpState(state, { payload: taskId }) {
         const taskToModify = findTask(state.taskList!, taskId);
         taskToModify.imp = !taskToModify.imp;
         state.stateChanged = true;
      },
      deleteTask(state, { payload: taskId }) {
         const taskIdx = state.taskList!.findIndex(task => task.id === taskId);
         state.taskList!.splice(taskIdx, 1);
         state.stateChanged = true;
      },
      addTask(state, { payload }) {
         state.taskList!.push(payload);
         state.stateChanged = true;
      },
      editTask(state, { payload }) {
         const taskToModify = state.taskList!.find(task => task.id === payload.taskId)!;
         taskToModify.title = payload.title;
         taskToModify.description = payload.description;
         taskToModify.imp = payload.imp;
         taskToModify.color = payload.color;
         state.stateChanged = true;
      },
      filterTask(state, { payload }) {
         let taskListToShow: Task[] = [];

         if (payload.filter) {
            switch (payload.filter) {
               case 'pending':
                  taskListToShow = state.taskList?.filter(task => !task.complete);
                  break;
               case 'all':
                  taskListToShow = state.taskList;
                  break;
               case 'finished':
                  taskListToShow = state.taskList?.filter(task => task.complete);
                  break;
               case 'important':
                  taskListToShow = state.taskList?.filter(task => task.imp);
                  break;
            }
         }

         if (payload.sort !== null) {
            const taskListToSort = payload.filter ? taskListToShow : state.taskList;

            switch (payload.sort) {
               case 'imp':
                  taskListToShow = taskListToSort.slice().sort((a, b) => +b.imp - +a.imp);
                  break;
               case 'time-asc':
                  taskListToShow = taskListToSort.slice().sort((a, b) => +a.dateCreated - +b.dateCreated);
                  break;
               case 'time-dsc':
                  taskListToShow = taskListToSort.slice().sort((a, b) => +b.dateCreated - +a.dateCreated);
                  break;
               default:
                  taskListToShow = taskListToSort;
            }
         }

         state.filteredTask = taskListToShow;

      },
      setAuthUserTasks(state, { payload }) {
         if (!payload) return;

         const newTaskList: Task[] = [];

         Object.entries(payload).forEach(([key, value]: [string, any]) => {
            const task = {
               id: key,
               title: value.title,
               description: value.description,
               imp: value.imp,
               color: value.color,
               complete: value.complete,
               dateCreated: value.dateCreated,
            };
            newTaskList.push(task);
         });
         state.taskList = newTaskList;
         state.filteredTask = newTaskList;
         state.stateChanged = true;
      },
      resetStateChange(state) {
         state.stateChanged = false;
      },
      clearTaskList(state) {
         state.taskList = [];
         state.filteredTask = [];
      }
   },
});

export default taskSlice;
export const taskActions = taskSlice.actions;
