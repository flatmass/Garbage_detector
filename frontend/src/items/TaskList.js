import * as React from "react";
import { List, Datagrid, TextField, ReferenceField  } from 'react-admin';
import TaskStatusField from '../fields/TaskStatusField'


export const TaskList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TaskStatusField source="completed" />
        </Datagrid>
    </List>
);

export default TaskList;