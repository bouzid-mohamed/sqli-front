// import img
import Loading from '../Common/loader'

const AboutTop = (props) => {


    return (
        <>
            <section id="about-top" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="about_top_img">
                                <img src={props.img} alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="about_top_left_content">
                                <h2>À propos {props.user.nom}</h2>
                                <p>{props.user.textAbout} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default AboutTop
