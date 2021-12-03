import { useState , useEffect } from 'react'
import TaskListItem from './TaskListItem'
import { host } from '../utils/rawApi'

const TaskList = ({ itemId, taskList }) => {
    return (
        <div className="task-list">
            { taskList.map(item => <TaskListItem key={item.id} itemId={itemId} item={item}/>) }
        </div>
    )
};
export default TaskList;