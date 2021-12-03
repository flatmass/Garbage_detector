import { Player } from 'video-react';
import { useState , useEffect } from 'react'
import vector from "../media/img/Vector.svg"
import trash from "../media/img/trash.png"
import { host } from '../utils/rawApi'
import dice from '../media/img/dice.svg'

const Task = ({ itemId, idItem }) => {

    const [task, setTask] = useState(null);

    useEffect(() => {
            fetch(itemId !== 0 ? `${host}/incidents/${ itemId}` : `${host}/incidents/${idItem}`)
                .then(response => {
                    if (response.status > 400) {
                        return []
                    }
                    return response.json();
                })
                .then(json => {
                    setTask(json);
                });
    }, [itemId]);

    let date = task ? new Date(task.time_open) : null;
    let time = task ? `${date.getHours()}:${date.getSeconds()}` : null;
    let data = task ? `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}` : null;

    return (
        <div className={"bg-gray"}>
            { itemId !== 0 && task ?
                <div className={"task_window"}>
                    <div className={"task_header_info"}>
                        <div className={"task_header_info_left"}>
                            <p className={"task_address"}>{ task.camera ? task.camera.name : <></> }</p>
                            <img className="taskitem_img" src={vector} alt=""/>
                            <span className={"task_camera_nbr"}><span className={"spacer"}>Камера:</span> <span className={"task_text_bold"}>{ task.camera_id }</span></span>
                        </div>
                        <div className={"task_header_info_right"}>
                            <span className={"task_number"}><span className={"spacer"}>Инцидент №:</span> <span className={"task_text_number_bold"}>{ task.id }</span></span>
                            <div className="tasklist_item_right">
                        <span className={
                            task.status === 2 || task.status === 1 ? "listitem_status moderation"
                                : task.status === 3 ? "listitem_status prepare_to_work"
                                : task.status === 4 ? "listitem_status in_work"
                                    : task.status === 5 ? "listitem_status closed"
                                        : "listitem_statu"
                        }>{
                            task.status === 2 || task.status === 1 ? "Модерация"
                                : task.status === 3 ? "Передан"
                                : task.status === 4 ? "В работе"
                                    : task.status === 5 ? "Завершен"
                                        : "Отклонен"
                        }</span>
                            </div>
                        </div>

                    </div>
                    {/*<h1>Задача {itemId}</h1>*/}
                    <div className={"task_main"}>
                        <div className={"player_block"}>
                            <Player>
                                <source src="https://youtu.be/MCtYohN6KfA" />
                            </Player>
                        </div>
                        <div className={"photo_block"}>
                            <img className="trash_img" src={trash} alt=""/>
                        </div>
                    </div>
                    <div className="task_info">
                        <div className="task_info_left">
                            <h2>{task.label}</h2>
                            <div className="task_date_clock">
                                <span className="task_date">{time}<span className="spacer_left">{data}</span></span>
                                <img className="dice_img" src={dice} alt=""/>
                                <span className="task_info_prob"><span className="spacer">Вероятность:</span> <span className="task_info_number_bold">{ task.accuracy }%</span></span>
                            </div>
                            {/*<p className="task_info_text">Исполнители:</p>*/}
                            <p className="task_info_bold_text">{task.executor}</p>
                        </div>
                        <div className="task_info_right">
                            <div className="accept" id="btn_accept">
                                Подтвердить и передать
                            </div>
                            <div className="reject" id="btn_reject">
                                Отклонить
                            </div>
                        </div>
                    </div>
                    {/*<div className="action_feed">
                        <h3>Лента действий инцидента</h3>
                        <div className="action_feed_table">
                            <div className="table_gray_row">
                                <p className="table_time">09:08:32, 04.12.21</p>
                                <p>Желтый мусорный контейнер заполнен</p>
                            </div>
                            <div className="table_white_row">
                                <p className="table_time">09:08:54, 04.12.21</p>
                                <p>cam_gaf47_090854.jpg</p>
                            </div>
                            <div className="table_gray_row">
                                <p className="table_time">09:11:12, 04.12.21</p>
                                <p>Умеркин Руслан Наильевич подтвердил инцидент и передал в ООО УК ПЖКХ</p>
                            </div>
                        </div>
                    </div>*/}
                </div>
                : <></>  }
        </div>
    )
};
export default Task;