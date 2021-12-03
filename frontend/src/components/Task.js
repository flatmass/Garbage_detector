import { Player } from 'video-react';

const Task = ({ itemId }) => {
    const item={id: 1, address: 'ул. Профсоюзная, 17в', title: 'Уборка дорог', status: 1, info: '09:02 Вероятность: 70% №:000192', camera_nbr: 'VP0032', time: '09:03', procent: '70%', number: '00A192'};
    return (
        <>
            <div className={"bg-gray"}>
                <div className={"task_window"}>
                    <p className={"task_address"}>{item.address}</p>
                    <h1>Задача {itemId}</h1>




                    <div className={"task_main"}>
                        <div className={"player_block"}>
                            <Player>
                                <source src="https://youtu.be/MCtYohN6KfA" />
                            </Player>
                        </div>
                        <div className={"photo_block"}>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Task;