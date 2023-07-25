import { createSlice } from '@reduxjs/toolkit';
import { Color, FilterText, SortText, Task } from '../interfaces/task';

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
      filterCriteria: 'all' as FilterText,
      sortCriteria: '' as SortText,
   },
   reducers: {
      toggleCompleteState(state, { payload: taskId }) {
         const taskToModify = findTask(state.taskList!, taskId);
         taskToModify.complete = !taskToModify.complete;
      },
      toggleImpState(state, { payload: taskId }) {
         const taskToModify = findTask(state.taskList!, taskId);
         taskToModify.imp = !taskToModify.imp;
      },
      deleteTask(state, { payload: taskId }) {
         const taskIdx = state.taskList!.findIndex(task => task.id === taskId);
         state.taskList!.splice(taskIdx, 1);
      },
      addTask(state, { payload }) {
         state.taskList!.push(payload);
      },
      editTask(state, { payload }) {
         const taskToModify = state.taskList!.find(task => task.id === payload.taskId)!;
         taskToModify.title = payload.title;
         taskToModify.description = payload.description;
         taskToModify.imp = payload.imp;
         taskToModify.color = payload.color;
      },
      filterTask(state, { payload }) {
         state.filterCriteria = payload;
      },
      sortTask(state, { payload }) {
         state.sortCriteria = payload;
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
      }
   },
});

export default taskSlice;
export const taskActions = taskSlice.actions;
