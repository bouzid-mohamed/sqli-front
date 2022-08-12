import React from 'react'
import { Link } from 'react-router-dom'

const Trending = (props) => {
    const imageUrl = "http://localhost:8000/uploads/" + props.medias.image
    return (
        <>
            <section id="special_offer_one" style={{ backgroundImage: `url("${imageUrl}")` }} >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="offer_banner_one text-center">

                                <h2>{props.medias.titre}</h2>
                                <p>
                                    {props.medias.description}
                                </p>
                                <a href={props.medias.url} className="theme-btn-one bg-whites btn_md" target="_blank">découvrir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Trending
