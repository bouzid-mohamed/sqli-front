import ProductInfo from './ProductInfo'
import RelatedProduct from './RelatedProduct'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { RatingStar } from "rating-star";
import Loading from '../../Common/loader'
import img404 from '../../../assets/img/Na_Nov_26.jpg'

const ProductDetailsTwo = () => {

    let dispatch = useDispatch();
    let { id } = useParams();
    const params = useParams()
    dispatch({ type: "products/getProductById", payload: { id } });
    let product = useSelector((state) => state.products.single);
    let load = useSelector((state) => state.products.loading)
    let loadSingle = useSelector((state) => state.products.loadingSingle)

    // Add to cart
    const addToCart = async (id) => {
        dispatch({ type: "products/addToCart", payload: { id } })
    }

    // Add to Favorite
    const addToFav = async (id) => {
        dispatch({ type: "products/addToFav", payload: { id } })
    }

    // Add to Compare
    const addToComp = async (id) => {
        dispatch({ type: "products/addToComp", payload: { id } })
    }
    // Quenty Inc Dec
    const [count, setCount] = useState(1)
    const incNum = () => {
        setCount(count + 1)
    }
    const decNum = () => {
        if (count > 0) {
            setCount(count - 1)
        } else {
            alert("Sorry, Zero Limit Reached")
            setCount(0)
        }
    }
    const [img, setImg] = useState(product?.img)
    const colorSwatch = (i) => {
        let data = product.color.find(item => item.color === i)
        setImg(data.img)
    }

    let settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <>
            {load || loadSingle ? (<Loading></Loading>) : (product
                ?
                <>  <section id="product_single_two" className="ptb-100">
                    <div className="container">
                        <div className="row area_boxed">
                            <div className="col-lg-4">
                                <div className="product_single_two_img ">
                                    <Slider {...settings}>

                                        {
                                            product.color.map((item, index) => (
                                                <div className="product_img_two_slider" key={index}  >
                                                    <img src={item.img} alt="img" />
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>

                            </div>
                            <div className="col-lg-8">
                                <div className="product_details_right_one">
                                    <div className="modal_product_content_one">
                                        <h3>{product.title}</h3>
                                        <div className="reviews_rating">

                                            <h5>{product.categorie.nom}</h5>
                                        </div>
                                        {product.promotion ? (<h4>Dt{' ' + product.price}.00 <del>Dt{' ' + Math.trunc(product.price + (product.price * product.promotion.pourcentage / 100))}.00</del> </h4>
                                        ) : (<h4>Dt{' ' + product.price}.00  </h4>)}
                                        <p>{product.description}</p>
                                        {product.stoks?.length >= 1 ? (
                                            <div className="customs_selects">
                                                <select name="product" className="customs_sel_box">
                                                    <option value="">Taille</option>

                                                    {product.stoks.map((stok) => (
                                                        <option key={stok.id} value={stok.id} >
                                                            {stok.taille}
                                                        </option >
                                                    ))}

                                                </select>
                                            </div>) : (null)}

                                        <div className="variable-single-item">
                                            <span>Couleur</span>
                                            <div className="product-variable-color">

                                                {product.stoks.map((stok) => (


                                                    <label key={stok.id} htmlFor="modal-product-color-red1">
                                                        <input name="modal-product-color" id="modal-product-color-red1"
                                                            className="color-select" type="radio" onChange={() => { colorSwatch('red') }} defaultChecked />
                                                        <span className="product-color-red"></span>
                                                    </label>

                                                ))}






                                            </div>
                                        </div>
                                        <form id="product_count_form_two">
                                            <div className="product_count_one">
                                                <div className="plus-minus-input">
                                                    <div className="input-group-button">
                                                        <button type="button" className="button" onClick={decNum}>
                                                            <i className="fa fa-minus"></i>
                                                        </button>
                                                    </div>
                                                    <input className="form-control" type="number" value={count} readOnly />
                                                    <div className="input-group-button">
                                                        <button type="button" className="button" onClick={incNum}>
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="links_Product_areas">
                                            <ul>
                                                <li>
                                                    <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(product.id)}><i
                                                        className="fa fa-heart"></i>Ajouter à la liste de souhaits</a>
                                                </li>
                                                <li>
                                                    <a href="#!" className="action compare" title="Compare" onClick={() => addToComp(product.id)}><i
                                                        className="fa fa-exchange"></i>Ajouter pour comparer</a>
                                                </li>
                                            </ul>
                                            <a href="#!" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(product.id)}>Ajouter au panier</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProductInfo product={product} />
                    </div>
                </section>
                    <RelatedProduct />

                </>
                :
                <>
                    <div className="container ptb-100">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                <div className="empaty_cart_area">
                                    <img src={img404} alt="img" />
                                    <h2>PRODUIT NON TROUVÉ</h2>
                                    <h3>Désolé ... Aucun élément trouvé selon votre requête !</h3>
                                    <Link to={"/shop/" + params.idE} className="btn btn-black-overlay btn_sm">Continuer vos achats</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RelatedProduct />

                </>
            )}


        </>
    )
}

export default ProductDetailsTwo