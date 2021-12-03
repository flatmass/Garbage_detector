import "../media/bot.scss"
import tatar from "../media/img/tatar.svg"
import dog1 from "../media/img/bot/dogs/1.jpg";
import dog2 from "../media/img/bot/dogs/2.jpg";
import dog3 from "../media/img/bot/dogs/3.jpg";
import dog5 from "../media/img/bot/dogs/5.jpg";
import dog6 from "../media/img/bot/dogs/6.jpg";
import not_dog1 from "../media/img/bot/not_dogs/1.jpg";
import not_dog2 from "../media/img/bot/not_dogs/2.jpg";
import not_dog11 from "../media/img/bot/not_dogs/11.jpg";
import not_dog10 from "../media/img/bot/not_dogs/10.jpg";
import not_dog9 from "../media/img/bot/not_dogs/9.jpg";
import not_dog8 from "../media/img/bot/not_dogs/8.jpg";
import not_dog7 from "../media/img/bot/not_dogs/7.jpg";
import not_dog6 from "../media/img/bot/not_dogs/6.jpg";
import not_dog5 from "../media/img/bot/not_dogs/5.jpg";
import not_dog4 from "../media/img/bot/not_dogs/4.jpg";
import not_dog3 from "../media/img/bot/not_dogs/3.jpg";
import not_dog12 from "../media/img/bot/not_dogs/12.jpg";
import not_dog13 from "../media/img/bot/not_dogs/13.jpg";
import not_dog14 from "../media/img/bot/not_dogs/14.jpg";
import not_dog15 from "../media/img/bot/not_dogs/15.jpg";
import not_dog16 from "../media/img/bot/not_dogs/16.jpg";
import pic1 from "../media/img/bot_pic1.png";
import watcher from "../media/img/watcher.svg";
import heart from "../media/img/heart.svg";
import { useState, useEffect } from "react";
import logotip from "../media/img/logo.svg";


const BotPage = () => {
    const [task, setTask] = useState(1);
    const [life, setLife] = useState(5);
    const [gameOver, setGameOver] = useState(false);
    const [victory, setVictory] = useState(false);

    const gameData = [
        {
            level: 1,
            img: [
                {
                    is_valid: false,
                    url: not_dog9
                },
                {
                    is_valid: false,
                    url: not_dog8
                },
                {
                    is_valid: true,
                    url: dog1
                },
                {
                    is_valid: false,
                    url: not_dog7
                }
            ],

        },
        {
            level: 1,
            img: [
                {
                    is_valid: false,
                    url: not_dog6
                },
                {
                    is_valid: false,
                    url: not_dog5
                },
                {
                    is_valid: false,
                    url: not_dog4
                },
                {
                    is_valid: true,
                    url: dog2
                }
            ],

        },
        {
            level: 1,
            img: [
                {
                    is_valid: true,
                    url: dog3
                },
                {
                    is_valid: false,
                    url: not_dog3
                },
                {
                    is_valid: false,
                    url: not_dog2
                },
                {
                    is_valid: false,
                    url: not_dog10
                }
            ],

        },
        {
            level: 1,
            img: [
                {
                    is_valid: false,
                    url: not_dog1
                },
                {
                    is_valid: true,
                    url: dog6
                },
                {
                    is_valid: false,
                    url: not_dog12
                },
                {
                    is_valid: false,
                    url: not_dog11
                }
            ],

        },
        {
            level: 1,
            img: [
                {
                    is_valid: false,
                    url: not_dog13
                },
                {
                    is_valid: false,
                    url: not_dog14
                },
                {
                    is_valid: false,
                    url: not_dog15
                },
                {
                    is_valid: true,
                    url: dog5
                }
            ],

        }
    ];

    useEffect(() => {

        if (life === 0) {
            setGameOver(true)
        }
    }, [life]);
    useEffect(() => {
        console.log(task);
        console.log(gameData.length);
        if (life > 0 && task === gameData.length) {
            setVictory(true)
        }
    }, [task]);

    const checkPic = (e, status) => {
        e.preventDefault();
        if (status === true) {
            setTask(task + 1);
        } else {
            setLife(life - 1);
        }
    };

    const heartGenerate = () => {
        for(let i = 1; i <= 5; i++) {
            return (
                <svg width="33" height="32" viewBox="0 0 33 32" className={ i <= life? "heart" : "lose_heart"} fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                    <use href={`${heart}#item`}/>
                </svg>
            )

        }
    };

    return(
        <div className="bot_watcher">
            <div className="bot_header">
                <a className="bot_back_btn" href="javascript:history.back();">‹ Назад</a>
                <p className="bot_tittle">Помоги <span className="bot_tittle_green">Наблюдайкину</span> найти потерянного друга</p>
                <div className={"bot_tatar_btn"}>
                    <img className="tatar_img" src={tatar} alt=""/>
                    <p className={"language_tatar"}>ТАТАР</p>
                </div>
            </div>

            <div className="bot_game_block">
                <div className="game_info">
                    <span></span>
                    <div className="heart_line">
                        { gameOver === false && victory === false ?
                            <>
                                <svg width="33" height="32" viewBox="0 0 33 32" className={ life >= 1 ? "heart" : "lose_heart"} fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                                    <use href={`${heart}#item`}/>
                                </svg>
                                <svg width="33" height="32" viewBox="0 0 33 32" className={ life >= 2 ? "heart" : "lose_heart"} fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                                    <use href={`${heart}#item`}/>
                                </svg>
                                <svg width="33" height="32" viewBox="0 0 33 32" className={ life >= 3 ? "heart" : "lose_heart"} fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                                    <use href={`${heart}#item`}/>
                                </svg>
                                <svg width="33" height="32" viewBox="0 0 33 32" className={ life >= 4 ? "heart" : "lose_heart"} fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                                    <use href={`${heart}#item`}/>
                                </svg>
                                <svg width="33" height="32" viewBox="0 0 33 32" className={ life >= 5 ? "heart" : "lose_heart"} fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                                    <use href={`${heart}#item`}/>
                                </svg>
                            </>

                            : <></>}
                    </div>
                </div>
                <div className="game_body">
                    { victory
                        ? <span className="game-message">Спасибо за помошь Наблюдайкину, ты нашел всех собак!</span>
                        : gameOver ? <div className="game-message">Ох! Друг потерялся <a href="#" onClick={(e) => { e.preventDefault(); document.location.reload();}}>Попробуй еще раз</a></div>
                            :
                            <>
                                <div className="task_info">
                                    <p className="game_task">Выбери одну из четырех фотографий с собакой</p>
                                    <p className="game_task">Заданние { task } из {gameData.length}</p>
                                </div>
                                <div className="play_field">
                                    {task < gameData.length ? gameData[task].img.map((item, index) => {
                                        return (
                                            <label htmlFor={`radio${index}`} className="chose_pik__label" onClick={task < gameData.length ? (e) => checkPic(e, item.is_valid) : (e) => e.preventDefault()}>
                                                <input type="radio" name="chose_pik" className="chose_pik__input" id={`radio${index}`}/>
                                                <img className="bot_pic" src={item.url} alt=""/>
                                            </label>
                                        )
                                    }) :<></>}
                                </div>
                            </>
                    }
                    <img className="watcher_img" src={watcher} alt=""/>
                </div>

                <div className="game_info">
                    <div>
                        <p className="bot_footer_text">Игра «Найди друга»</p>
                        <div className={"header_flex_class"}>
                            <img className="header_logo_img" src={logotip} alt=""/>
                            <p className="header_text">Инцидент-платформа анализа данных с камер уличного наблюдения РТ</p>
                        </div>
                    </div>
                    <p className="bot_footer_text">Пользовательское соглашение</p>

                </div>
            </div>



        </div>
    )
};

const RadioImg = ({on}) => {
    return (
        <></>
    )
};

export default BotPage