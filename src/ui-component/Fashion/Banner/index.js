import React from 'react'
import BanImg from '../../../assets/img/common/man.png'
import { Link } from 'react-router-dom'

const Banner = (props) => {
    return (
        <>
            <section id="banner_one">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="banner_text_one">
                                <h1 className="wow flipInX" data-wow-duration="3.0s" data-wow-delay=".3s">{props.medias.titre}</h1>
                                <h3>{props.medias.description}</h3>
                                <a href={props.medias.url} className="theme-btn-one bg-black btn_md" target="_blank">découvrir</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero_img" >
                                <img src={"http://localhost:8000/uploads/" + props.medias.image} alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Banner
