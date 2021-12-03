import { useState , useEffect } from 'react'
import TaskListItem from './TaskListItem'
import { host } from '../utils/rawApi'

const TaskList = ({ itemId }) => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        /*fetch(`${host}/incidents?skip=0&limit=10`)
            .then(response => {
                if (response.status > 400) {
                    return []
                }
                return response.json();
            })
            .then(json => {
                setTaskList(json);
            });*/
        setTaskList([
            {id: 1, address: 'ул. Профсоюзная, 17в', title: 'Уборка дорог', status: 1, info: '09:02 Вероятность: 70% №:000192', camera_nbr: 'VP0032', time: '09:03', procent: '70%', number: '00A192'},
            {id: 2, address: 'ул. Профсоюзная, 17в', title: 'Уборка дорог', status: 2, info: '09:02 Вероятность: 70% №:000192', camera_nbr: 'VP0032', time: '09:03', procent: '70%', number: '00A192'},
            {id: 3, address: 'ул. Профсоюзная, 29', title: 'Починка дорог', status: 3, info: '09:02 Вероятность: 70% №:000192', camera_nbr: 'VD0009', time: '09:14', procent: '32%', number: '00A193'}
        ])
    }, []);

    return (
        <div className="task-list">
            { taskList.map(item => <TaskListItem key={item.id} itemId={itemId} item={item}/>) }
        </div>
    )
};
export default TaskList;