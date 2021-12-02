import TaskListItem from './TaskListItem'

const TaskList = () => {
    return (
        <div className="task-list">
            <TaskListItem obj={{id: 1, address: 'ул. Профсоюзная, 17в', title: 'Уборка дорог', info: '09:02 Вероятность: 70% №:000192', camera_nbr: 'VP0032', time: '09:03', procent: '70%', number: '00A192'}}/>
            <TaskListItem obj={{id: 2, address: 'ул. Профсоюзная, 29', title: 'Починка дорог', info: '09:02 Вероятность: 70% №:000192',camera_nbr: 'VD0009', time: '09:14', procent: '32%', number: '00A193'}}/>
        </div>
    )
}
export default TaskList;