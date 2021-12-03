import Logo from '../media/img/logo.svg'

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
            </div>
        </div>
    )
};
export default IndexPage;