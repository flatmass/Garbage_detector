import logotip from "../media/img/logo.svg"
import { Link } from "react-router-dom"
import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const Header = () => {
    let location = document.location;
    console.log(location.pathname);
    return (
        <div className="header_wrap">
            <div className="logo_wrap">
                <img className="header_logo_img" src={logotip} alt=""/>
                <p className="header_text">Инцидент-платформа анализа данных с камер уличного наблюдения РТ</p>
            </div>
            <div className="nav_wrap">
                <nav>
                    <Link to="/" className={ String(location.pathname) === '/' ? "nav__item active" : "nav__item" }>Инциденты</Link>
                    <Link to="/dashboard" className={ String(location.pathname) === '/dashboard' ? "nav__item active" : "nav__item" }>Маршруты</Link>
                    <Link to="/stats" className={ String(location.pathname) === '/stats' ? "nav__item active" : "nav__item" }>Отчеты</Link>
                    <Link to="/forecast" className={ String(location.pathname) === '/forecast' ? "nav__item active" : "nav__item" }>Прогноз</Link>
                    <Link to="/reglament" className={ String(location.pathname) === '/reglament' ? "nav__item active" : "nav__item" }>Регламент работы</Link>
                </nav>
            </div>
        </div>
    )
};
export default Header;