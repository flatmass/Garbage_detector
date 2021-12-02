import { Player } from 'video-react';

const Task = ({ itemId }) => {
    return (
        <>
            <h1>Задача {itemId}</h1>
            <Player>
                <source src="https://youtu.be/MCtYohN6KfA" />
            </Player>
        </>
    )
}
export default Task;