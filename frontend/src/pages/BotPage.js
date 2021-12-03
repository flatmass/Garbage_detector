import "../media/bot.scss"
import tatar from "../media/img/tatar.svg"
import flag from "../media/img/flagrf.svg";
import pic1 from "../media/img/bot_pic1.png";
import pic2 from "../media/img/bot_pic2.png";
import pic3 from "../media/img/bot_pic3.png";
import pic4 from "../media/img/bot_pic4.png";
import watcher from "../media/img/watcher.svg";
import heart from "../media/img/heart.svg";
import { useState } from "react";
import logotip from "../media/img/logo.svg";


const BotPage = () => {
    const [Level, setLevel] = useState(1);
    const [task_nbr, setTask] = useState(1);

    const gameData = [
        {
            level: 1,
            img: [
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: true,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                }
            ],

        },
        {
            level: 1,
            img: [
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: true,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                }
            ],

        },
        {
            level: 1,
            img: [
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: true,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                }
            ],

        },
        {
            level: 1,
            img: [
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: true,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                }
            ],

        },
        {
            level: 1,
            img: [
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                },
                {
                    is_valid: true,
                    url: ''
                },
                {
                    is_valid: false,
                    url: ''
                }
            ],

        },
    ];

    return(
        <div className="bot_watcher">
            <div className="bot_header">
                <a className="bot_back_btn" href="javascript:history.back();">‹ Назад</a>
                <p className="bot_tittle">Помоги <span className="bot_tittle_green">Наблюдайкину</span> найти заполненные мусорные баки</p>
                <div className={"bot_tatar_btn"}>
                    <img className="tatar_img" src={tatar} alt=""/>
                    <p className={"language_tatar"}>ТАТАР</p>
                </div>
            </div>

            <div className="bot_game_block">
                <div className="game_info">
                    <p className="lvl_number">Уровень { Level }</p>
                    <div className="heart_line">
                        <svg width="33" height="32" viewBox="0 0 33 32" className="heart" fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                            <use href={`${heart}#item`}/>
                        </svg>
                        <svg width="33" height="32" viewBox="0 0 33 32"  className="heart"fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                            <use href={`${heart}#item`}/>
                        </svg>
                        <svg width="33" height="32" viewBox="0 0 33 32" className="heart" fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                            <use href={`${heart}#item`}/>
                        </svg>
                        <svg width="33" height="32" viewBox="0 0 33 32" className="heart" fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                            <use href={`${heart}#item`}/>
                        </svg>
                        <svg width="33" height="32" viewBox="0 0 33 32" className="lose_heart" fill="#FF2D54" stroke="white" xmlns="http://www.w3.org/2000/svg">
                            <use href={`${heart}#item`}/>
                        </svg>
                    </div>
                </div>
                <div className="game_body">
                    <div className="task_info">
                        <p className="game_task">Выбери одну из четырех фотографий</p>
                        <p className="game_task">Заданние { task_nbr } из 10</p>
                    </div>
                    <div className="play_field">
                        <img className="bot_pic" src={pic1} alt=""/>
                        <img className="bot_pic" src={pic2} alt=""/>
                        <img className="bot_pic" src={pic3} alt=""/>
                        <img className="bot_pic" src={pic4} alt=""/>
                    </div>
                    <img className="watcher_img" src={watcher} alt=""/>
                </div>

                <div className="game_info">
                    <div>
                        <p className="bot_footer_text">Экологическая игра для самых маленьких</p>
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
export default BotPage