import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../interfaces/task";

const taskList: Task[] = [
    {
        id: 't1',
        title: 'Learn React',
        description: 'lorem isklj react is a popular front end lakds ksjdilfejfla laksdjflisaejfl  djsflkldf jklfjjkdjflaks djfjskdf',
        dateCreated: new Date(),
        imp: true,
        complete: false
    },
    {
        id: 't2',
        title: 'Learn Angular',
        description: 'lorem isklj react is a popular front end lakds ksjdilfejfla laksdjflisaejfl  djsflkldf jklfjjkdjflaks djfjskdf',
        dateCreated: new Date('23/4/2022'),
        imp: false,
        complete: false
    },
    {
        id: 't3',
        title: 'Learn Vue',
        description: 'lorem isklj react is a popular front end lakds ksjdilfejfla laksdjflisaejfl  djsflkldf jklfjjkdjflaks djfjskdf',
        dateCreated: new Date('23/5/2021'),
        imp: true,
        complete: false
    },
]

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskList
    },
    reducers: {

    }
})

export default taskSlice;
export const taskActions = taskSlice.actions;