import { useState , useEffect } from 'react'
import TaskListItem from './TaskListItem'
import { host } from '../utils/rawApi'

const TaskList = ({ itemId }) => {
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
        <div className="task-list">
            { taskList.map(item => <TaskListItem key={item.id} itemId={itemId} item={item}/>) }
        </div>
    )
};
export default TaskList;