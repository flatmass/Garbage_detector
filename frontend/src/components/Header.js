import logotip from "../media/img/logo.svg"
import flag from "../media/img/flagrf.svg"
import { Link } from "react-router-dom"

const Header = ({ params }) => {
    let location = document.location;
    return (
        <div className="header_wrap">
            <div className="logo_wrap">
                <Link to="/" className="header_flex_class">
                    <img className="header_logo_img" src={logotip} alt=""/>
                    <p className="header_text">Инцидент-платформа анализа данных с камер уличного наблюдения РТ</p>
                </Link>
                <div className="header_flex_class">
                    <p className="language">РУС</p>
                    <img className="flag_img" src={flag} alt=""/>
                </div>
            </div>
            <div className="nav_wrap">
                <nav>
                    <Link to="/tasks" className={ String(location.pathname) === '/tasks' ? "nav__item active" : "nav__item" }>Инциденты</Link>
                    <Link to="/routes" className={ String(location.pathname) === '/routes' ? "nav__item active" : "nav__item" }>Маршруты</Link>
                    <Link to="/stats" className={ String(location.pathname) === '/stats' ? "nav__item active" : "nav__item" }>Отчеты</Link>
                    <Link to="/forecast" className={ String(location.pathname) === '/forecast' ? "nav__item active" : "nav__item" }>Прогноз</Link>
                    { params.is_superuser ?<Link to="/dashboard" className={ String(location.pathname) === '/dashboard' ? "nav__item active" : "nav__item" }>Карта камер</Link> : <></> }

                </nav>
            </div>
        </div>
    )
};
export default Header;