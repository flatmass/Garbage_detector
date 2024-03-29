import { Link } from "react-router-dom";
import vector from "../media/img/Vector.svg"

const TaskListItem = ({ itemId, item }) => {


    // Task sratus:
    // is_created = 1
    // is_moderate = 2
    // is_prepare_to_work = 3
    // is_work = 4
    // is_success = 5
    // is_reject = 6


    let date = new Date(item.time_open);
    let time = `${date.getHours()}:${date.getSeconds()}`;


    return (
        <Link to={`/tasks/${item.id}`} className={ Number(itemId) === Number(item.id) ? "tasklist_item active" : "tasklist_item" }>
            <div className="tasklist_item_left">
                <div className="tasklist_first_line">
                    <span className="listitem_adress">{ item.camera.name }</span>
                    <img className="listitem_img" src={vector} alt=""/>
                    <span className={"listitem_camera_nbr"}><span className={"spacer"}>Камера: </span> { item.camera_id }</span>
                </div>
                <div className="listitem_camera_title">{ item.label }</div>
                <div className="tasklist_first_line">
                    <span className="listitem_camera_nbr">{ time }</span>
                    <span className="listitem_camera_nbr"><span className="spacer">Вероятность: </span > <span className="text_bold">{ item.accuracy }%</span> </span>
                    <span className="listitem_camera_nbr"><span className="spacer"> №: </span > <span className="text_bold">{ item.id }</span> </span>
                </div>
            </div>
            <div className="tasklist_item_right">
                    <span className={
                        item.status === 2 || item.status === 1 ? "listitem_status moderation"
                            : item.status === 3 ? "listitem_status prepare_to_work"
                            : item.status === 4 ? "listitem_status in_work"
                            : item.status === 5 ? "listitem_status closed"
                                    : "listitem_statu"
                    }>{
                        item.status === 2 || item.status === 1 ? "Модерация"
                            : item.status === 3 ? "Передан"
                            : item.status === 4 ? "В работе"
                            : item.status === 5 ? "Завершен"
                                    : "Отклонен"
                    }</span>
            </div>
        </Link>
    )
};
export default TaskListItem;