import { Grid } from '@material-ui/core';
import RouteMap from '../components/RouteMap'
import TaskList from '../components/TaskList'
import {host} from "../utils/rawApi";
import { useState , useEffect } from 'react'

const RoutePage = () => {
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
    return(
        <Grid container>
            <Grid item xs={4}>
                <TaskList itemId={1} taskList={taskList}/>
            </Grid>
            <Grid item xs={8}>
                <div className="bg-gray">
                    <div className="task_window">
                        <RouteMap/>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
};

export default RoutePage