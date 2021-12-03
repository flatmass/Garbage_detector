import Logo from '../media/img/logo.svg'
import Lang from '../media/img/index_lang.png'

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

            </div>
        </div>
    )
};
export default IndexPage;