import { Key } from 'react';

export enum Color {
   C1 = 'aqua',
   C2 = 'pink',
   C3 = 'purple'
}

export interface TaskProp {
   title: string;
   description?: string;
   imp: boolean;
   complete: boolean;
   dateCreated: string | number;
   id: Key;
   color?: Color;
}

export interface Task {
   id: Key;
   title: string;
   description?: string;
   imp: boolean;
   complete: boolean;
   dateCreated: string | number;
   color?: Color;
}
