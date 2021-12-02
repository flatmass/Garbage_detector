import logotip from "../media/img/logo.svg"
import { Link } from "react-router-dom"
import { Grid } from '@material-ui/core';

const Header = () => {
    return (
        <div className="header_wrap">
            <div className="logo_wrap">
                <img className="header_logo_img" src={logotip} alt=""/>
                <p className="header_text">Инцидент-платформа анализа данных с камер уличного наблюдения РТ</p>
            </div>
            <div className="nav_wrap">
                <nav>
                    <Link to="/" className="nav__item">Инциденты</Link>
                    <Link to="/dashboard" className="nav__item">Маршруты</Link>
                    <Link to="/dashboard" className="nav__item">Отчеты</Link>
                    <Link to="/dashboard" className="nav__item">Прогноз</Link>
                    <Link to="/" className="nav__item">Регламент работы</Link>
                </nav>
            </div>
        </div>
    )
};
export default Header;