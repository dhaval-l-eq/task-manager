import { Key } from 'react';

export enum Color {
   C1 = 'aqua',
   C2 = 'pink',
   C3 = 'purple'
}

export interface TaskProp {
   title: String;
   description?: String;
   imp: Boolean;
   complete: Boolean;
   dateCreated: string | number;
   id: Key;
   color?: Color;
}

export interface Task {
   id: Key;
   title: String;
   description?: String;
   imp: Boolean;
   complete: Boolean;
   dateCreated: string | number;
   color?: Color;
}
