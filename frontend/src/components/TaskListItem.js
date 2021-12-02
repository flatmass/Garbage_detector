import { Link } from "react-router-dom";
import vector from "../media/img/Vector.svg"

const TaskListItem = ({ obj }) => {

    return (
        <Link to={`/task/${obj.id}`} className="tasklist_item">
                <div className="tasklist_item_left">
                    <div className="tasklist_first_line">
                        <span className="listitem_adress">{ obj.address }</span>
                        <img className="listitem_img" src={vector} alt=""/>
                        <span className={"listitem_camera_nbr"}><span className={"spacer"}>Камера: </span> { obj.camera_nbr }</span>
                    </div>
                    <div className="listitem_camera_title">Уборка дорог</div>
                    <div className="tasklist_first_line">
                        <span className="listitem_camera_nbr">{ obj.time }</span>
                        <span className="listitem_camera_nbr"><span className="spacer">Вероятность: </span > <span className="text_bold">{ obj.procent }</span> </span>
                        <span className="listitem_camera_nbr"><span className="spacer"> №: </span > <span className="text_bold">{ obj.number }</span> </span>
                    </div>
                </div>
                <div></div>
        </Link>
    )
};
export default TaskListItem;