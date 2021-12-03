import { Grid } from '@material-ui/core';
import RouteMap from '../components/RouteMap'
import TaskList from '../components/TaskList'

const RoutePage = () => {
    return(
        <Grid container>
            <Grid item xs={4}>
                <TaskList itemId={1}/>
            </Grid>
            <Grid item xs={8}>
                <div className={"bg-gray"}>
                    <div className={"task_window"}>
                        <RouteMap/>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
};

export default RoutePage