import TaskList from "../components/TaskList";
import Task from "../components/Task";
import { Grid } from '@material-ui/core';
import {host} from "../utils/rawApi";
import { useState , useEffect } from 'react'

const TaskPage = ({itemId}) => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        fetch(`${host}/incidents?skip=0&limit=10`)
            .then(response => {
                if (response.status > 400) {
                    return []
                }
                return response.json();
            })
            .then(json => {
                setTaskList(json);
            });
    }, []);
    return (
        <Grid container>
            <Grid item xs={4}>
                <TaskList itemId={ itemId } taskList={taskList} />
            </Grid>
            <Grid item xs={8}>
                <Task itemId={ itemId }/>
            </Grid>
        </Grid>
    )
};
export default TaskPage;