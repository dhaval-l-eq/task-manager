export interface TaskProp {
   n2?: Boolean;
   n3?: Boolean;
}

export interface Task {
    id: String;
    title: String;
    description?: String;
    imp: Boolean;
    complete: Boolean;
    dateCreated: Date;
}
