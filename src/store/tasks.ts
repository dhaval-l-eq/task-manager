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
      taskList: dummyTaskList,
      taskDelConfirmVisible: false,
   },
   reducers: {
      toggleCompleteState(state, { payload: taskId }) {
         const taskToModify = findTask(state.taskList, taskId);
         taskToModify.complete = !taskToModify.complete;
      },
      toggleImpState(state, { payload: taskId }) {
         const taskToModify = findTask(state.taskList, taskId);
         taskToModify.imp = !taskToModify.imp;
      },
      deleteTask(state, { payload: taskId }) {
         const taskIdx = state.taskList.findIndex(task => task.id === taskId);
         state.taskList.splice(taskIdx, 1);
      },
      showTaskDelConfirm(state) {
         state.taskDelConfirmVisible = true;
      },
      hideTaskDelConfirm(state) {
         state.taskDelConfirmVisible = false;
      },
   },
});

export default taskSlice;
export const taskActions = taskSlice.actions;
