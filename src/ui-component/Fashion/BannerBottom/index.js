import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../../../assets/img/offer/woman.png'
import img2 from '../../../assets/img/offer/woman1.png'
import img3 from '../../../assets/img/offer/bag.png'
import img4 from '../../../assets/img/offer/woman4.png'
import img5 from '../../../assets/img/offer/kids.png'

const BannerBottom = (props) => {
    return (
        <>
            <section id="product_variation_one" className="pt-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={"http://localhost:8000/uploads/" + props.promos[0].banniere} style={{ height: '400px' }} alt="img" />
                                <div className="product_var_one_text">
                                    <h2 className="color_one">{props.promos[0].pourcentage}% Offre</h2>
                                    <h4>{props.promos[0].nom}</h4>
                                    <Link to="/shop" className="theme-btn-one bg-black btn_sm">Découvrir</Link>
                                </div>
                            </div>
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={"http://localhost:8000/uploads/" + props.promos[1].banniere} style={{ height: '400px' }} alt="img" />
                                <div className="product_var_one_text">
                                    <h2 className="color_one">{props.promos[1].pourcentage}% Offre</h2>
                                    <h4>{props.promos[1].nom}</h4>
                                    <Link to="/shop" className="theme-btn-one bg-black btn_sm">Découvrir</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={"http://localhost:8000/uploads/" + props.promos[2].banniere} style={{ height: '830px' }} alt="img" />
                                <div className="product_var_one_text_center">
                                    <h2 className="color_one">{props.promos[2].pourcentage}% Offre</h2>
                                    <h4>{props.promos[2].nom}</h4>
                                    <Link to="/shop" className="theme-btn-one bg-black btn_sm">Découvrir</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={"http://localhost:8000/uploads/" + props.promos[3].banniere} style={{ height: '400px' }} alt="img" />
                                <div className="product_var_one_text">
                                    <h2 className="color_one">{props.promos[3].pourcentage}% Offre</h2>
                                    <h4>{props.promos[3].nom}</h4>
                                    <Link to="/shop" className="theme-btn-one bg-black btn_sm">Découvrir</Link>
                                </div>
                            </div>
                            <div className="product_variation_one_boxed img-zoom-hover">
                                <img src={"http://localhost:8000/uploads/" + props.promos[4].banniere} style={{ height: '400px' }} alt="img" />
                                <div className="product_var_one_text">
                                    <h2 className="color_one">{props.promos[4].pourcentage}% Offre</h2>
                                    <h4>{props.promos[4].nom}</h4>
                                    <Link to="/shop" className="theme-btn-one bg-black btn_sm">Découvrir</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BannerBottom;
