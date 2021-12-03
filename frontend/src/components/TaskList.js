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
            {id: 1, address: 'ул. Профсоюзная, 17в', lable: 'Уборка дорог', status: 1, info: '09:02 Вероятность: 70% №:000192', camera: { name: "VP0033"}, time_open: '2021-12-03T06:49:57.191Z', "time_close": "2021-12-03T06:49:57.191Z", procent: '70%'},
            {id: 2, address: 'ул. Профсоюзная, 17в', lable: 'Уборка дорог', status: 2, info: '09:02 Вероятность: 70% №:000192', camera: { name: "VP0032"}, time_open: '2021-12-03T06:49:57.191Z', "time_close": "2021-12-03T06:49:57.191Z", procent: '73%'},
            {id: 3, address: 'ул. Профсоюзная, 29', lable: 'Починка дорог', status: 3, info: '09:02 Вероятность: 70% №:000192', camera: { name: "VD0009"}, time_open: '2021-12-03T06:49:57.191Z', "time_close": "2021-12-03T06:49:57.191Z", procent: '81%'}
        ])
    }, []);

    return (
        <div className="task-list">
            { taskList.map(item => <TaskListItem key={item.id} itemId={itemId} item={item}/>) }
        </div>
    )
};
export default TaskList;