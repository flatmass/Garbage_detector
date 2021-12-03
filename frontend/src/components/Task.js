import { Player } from 'video-react';
import vector from "../media/img/Vector.svg"
import trash from "../media/img/trash.png"
import dice from "../media/img/dice.svg"


const Task = ({ itemId }) => {
    const item={
        "camera_id": 0,
        "time_open": "2021-12-03T06:13:10.551Z",
        "time_close": "2021-12-03T06:13:10.551Z",
        "label": "1234",
        "status": 1,
        "file_id": 0,
        "polygons": [],
        "executor":"ООО УК ПЖКХ, городской округ Казань",
        "id": 0,
        "procent":"72%",
        "camera": {
            "name": "string",
            "url": "string",
            "coord": {
                "x": 0,
                "y": 0
            },
            "pool_id": 0,
            "id": 0,
            "areas": []
        },
        "file": {
            "id": 0,
            "url": "string"
        }
    };


    let date = new Date(item.time_open);
    let time = `${date.getHours()}:${date.getSeconds()}`;
    let data = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

    return (
        <>
            <div className={"bg-gray"}>
                <div className={"task_window"}>
                    <div className={"task_header_info"}>
                        <div className={"task_header_info_left"}>
                            <p className={"task_address"}>ул. Профсоюзная, 17в</p>
                            <img className="taskitem_img" src={vector} alt=""/>
                            <span className={"task_camera_nbr"}><span className={"spacer"}>Камера:</span> <span className={"task_text_bold"}>{ item.camera.id }</span></span>
                        </div>
                        <div className={"task_header_info_right"}>
                            <span className={"task_number"}><span className={"spacer"}>Инцидент №:</span> <span className={"task_text_number_bold"}>{ item.id }</span></span>
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
                            <h2>Заполненность мусорных контейнеров</h2>
                            <div className="task_date_clock">
                                <span className="task_date">{time}<span className="spacer_left">{data}</span></span>
                                <img className="dice_img" src={dice} alt=""/>
                                <span className="task_info_prob"><span className="spacer">Вероятность:</span> <span className="task_info_number_bold">{ item.procent }</span></span>
                            </div>
                            <p className="task_info_text">Исполнители:</p>
                            <p className="task_info_bold_text">{item.executor}</p>
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


                    <div className="action_feed">
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



                    </div>

                </div>
            </div>
        </>
    )
}
export default Task;