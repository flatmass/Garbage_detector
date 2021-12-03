import TaskList from "../components/TaskList";
import Task from "../components/Task";
import { Grid } from '@material-ui/core';

const TaskPage = ({itemId}) => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <TaskList itemId={ itemId } />
            </Grid>
            <Grid item xs={8}>
                <Task itemId={ itemId }/>
            </Grid>
        </Grid>
    )
};
export default TaskPage;