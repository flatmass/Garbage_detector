import Logo from '../media/img/logo.svg'
import Lang from '../media/img/index_lang.png'
import { Link } from 'react-router-dom'

const IndexPage = () => {
    return (
        <div className="index-page">
            <div className="index-page__header">
                <div className="index-page__logo-wrap">
                    <img src={Logo} className="index-page__logo" alt=""/>
                    <div>
                        <p className="index-page__logo-text">Республика</p>
                        <p className="index-page__logo-text">Татарстан</p>
                    </div>
                </div>
                <div className="index-page__lang-wrap">
                    <img src={Lang} alt=""/>
                </div>
            </div>
            <div className="index-page__body">
                <h1 className="index-page__title"><span>Уличное видеонаблюдение</span> <span>Республики Татарстан</span></h1>
                <p className="index-page__descr">Технологии Умного города на пользу каждого жителя</p>
                <div className="index-page__cards-wrap">
                    <Link to="/tasks" className="index-page__card">
                        <p className="card__title">
                            Инцидент-платформа анализа данных с камер уличного наблюдения РТ
                        </p>
                        <p className="card__descr">
                            Инструмент повседневной работы служб городского хозяйства
                        </p>
                    </Link>
                    <Link to="/bot" className="index-page__card">
                        <p className="card__title">
                            Игра «Найди друга»
                        </p>
                        <p className="card__descr">
                            Помогайте улучшать сервисы видеонаблюдения
                            в игре на внимательность и получайте призы
                        </p>
                    </Link>
                    <Link to="/tasks" className="index-page__card disable">
                        <p className="card__title">
                            Получить запись с камер видеонаблюдения
                        </p>
                        <p className="card__descr">
                            С каждым человеком случаются неприятные ситуации, которые легче разрешить, располагая дополнительной информацией, полученной из видеозаписи происшествия.
                        </p>
                    </Link>
                    <Link to="/tasks" className="index-page__card disable">
                        <p className="card__title">
                            Свободные парковочные места
                        </p>
                        <p className="card__descr">
                            Помощник водителя для поиска свободного места на парковке в  Telegram-боте
                        </p>
                    </Link>
                    <Link to="/tasks" className="index-page__card disable">
                        <p className="card__title">
                            Проверить законность размещения наружной рекламы
                        </p>
                        <p className="card__descr">
                            Бизнес-сервис, в котором вы можете узнать согласованность рекламы на фасаде
                        </p>
                    </Link>
                    <Link to="/tasks" className="index-page__card disable">
                        <p className="card__title">
                            Поиск друга
                        </p>
                        <p className="card__descr">
                            Найдите потерявшегося питомца с помощью базы бездомных животных нейросети
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
};
export default IndexPage;