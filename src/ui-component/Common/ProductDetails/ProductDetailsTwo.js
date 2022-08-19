import ProductInfo from './ProductInfo'
import RelatedProduct from './RelatedProduct'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Loading from '../../Common/loader'
import img404 from '../../../assets/img/Na_Nov_26.jpg'
import ProductServices from 'services/productServices/ProductServices';
import { IconFrame } from '@tabler/icons';
import Swal from 'sweetalert2';

const ProductDetailsTwo = () => {
    const [errorProduct, setErrorProduct] = useState(0)
    let dispatch = useDispatch();
    const params = useParams()
    const [product, setProduct] = useState(null)
    let load = useSelector((state) => state.products.loading)
    const [taille, setTaille] = useState([])
    const [couleur, setCouleur] = useState([])
    const [stockChoisit, setStockChoisit] = useState(null)
    const [pchecked, setPchecked] = useState(0)

    let loadSingle = useSelector((state) => state.products.loadingSingle)
    useEffect(() => {
        ProductServices.showProductFront(params.idE, params.id).then((res) => {
            let tstoks = []
            res.data[0].stoks.filter((s) => {
                if (!tstoks.includes(s.taille) && s.quantite > 0)
                    tstoks.push(s.taille)
            })
            setTaille(tstoks)

            let hov = ''
            let price = 0
            let label = ''
            let im = []

            if (res.data[0].images.length > 1)
                hov = res.data[0].images[1].nom
            else hov = res.data[0].images[0].nom
            if (res.data[0].promotion) {
                price = Math.trunc(res.data[0].prix - (res.data[0].prix * res.data[0].promotion.pourcentage / 100))
                label = 'promo' + ' ' + res.data[0].promotion.pourcentage + '%'
            }
            else price = res.data[0].prix
            res.data[0].images.map((i) => {
                im.push({
                    color: 'red', img: "http://localhost:8000/uploads/" + i.nom, quantity: 1,
                })
            })
            let p = res.data[0]

            setProduct({
                id: p.id, labels: label, category: "fashion", img: "http://localhost:8000/uploads/" + p.images[0].nom, hover_img: "http://localhost:8000/uploads/" + hov,
                title: p.nom,
                price: price,
                description: p.description,
                rating: {
                    rate: 3.9,
                    count: 30
                },
                promotion: p.promotion,
                categorie: p.categorie,
                stoks: p.stoks,
                entreprise: p.Entreprise,
                color: im

            })


            dispatch({ type: "products/getSingleProduct", payload: { product } });



        }).catch(err => setErrorProduct(1))
    }, [])
    // Add to cart
    const addToCart = async (id) => {
        if (stockChoisit === null) {
            Swal.fire({
                title: 'Echec!',
                text: 'Il faut choisir la taille et le couleur',
                imageUrl: product.img,
                imageWidth: 200,
                imageAlt: product.title,
                showConfirmButton: false,
                timer: 5000
            })

        } else {
            dispatch({ type: "products/addToCart", payload: [id, stockChoisit, count] })
        }
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
        setPchecked(i.id);
        setStockChoisit(i);
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
    const handleChange = (e) => {
        let col = []
        product.stoks.map((s) => {
            if (s.taille === e.target.value) {
                col.push(s)
            }
            setCouleur(col)
        })
    }
    const InStock = (d) => {
        let sum = 0;
        if (d.stoks.length > 0) {
            d.stoks.map((s) => {
                sum = sum + s.quantite
            })
        }
        if (sum > 0) return true
        else return false
    }

    return (
        <>
            {errorProduct === 0 ? (<>
                {load || loadSingle ? (<Loading></Loading>) : (<>  <section id="product_single_two" className="ptb-100">
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
                                        {product.promotion ? (<h4>Dt{' ' + product.price}.00 <del>Dt{' ' + Math.trunc((product.price * 100 / product.promotion.pourcentage))}.00</del> </h4>
                                        ) : (<h4>Dt{' ' + product.price}.00  </h4>)}
                                        <p>{product.description}</p>
                                        {InStock(product) ? (
                                            <>
                                                <div className="customs_selects">
                                                    <select name="product" className="customs_sel_box" onChange={handleChange} onBlur={handleChange}  >
                                                        <option value="" >Taille</option>

                                                        {taille.map((stok) => (
                                                            <option key={stok} value={stok} >
                                                                {stok}
                                                            </option >
                                                        ))}

                                                    </select>
                                                </div>
                                                <div className="variable-single-item">
                                                    {couleur.length > 0 ? (<span>Couleur</span>) : (<span>Choisir la taille pour savoir les couleurs disponible</span>)}
                                                    <div className="product-variable-color">

                                                        {couleur?.map((stok) => (

                                                            <label key={stok.id} htmlFor={stok.id}>
                                                                <input name="modal-product-color" id={stok.id}
                                                                    className="color-select" type="radio" onChange={() => { colorSwatch(stok) }} checked={pchecked === stok.id ? true : false} />
                                                                <span className="product-color-red" style={{ background: stok.couleur }}></span>
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
                                                            <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(product)}><i
                                                                className="fa fa-heart"></i>Ajouter à la liste de souhaits</a>
                                                        </li>
                                                        <li>
                                                            <a href="#!" className="action compare" title="Compare" onClick={() => addToComp(product)}><i
                                                                className="fa fa-exchange"></i>Ajouter pour comparer</a>
                                                        </li>
                                                    </ul>
                                                    <a href="#!" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(product)} disabled={product.stoks?.length > 0 ? true : false}>Ajouter au panier</a>
                                                </div>
                                            </>) : (<><h4 style={{ color: 'red' }}>N'est pas disponible dans le stock</h4> <div className="links_Product_areas">
                                                <ul>
                                                    <li>
                                                        <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(product)}><i
                                                            className="fa fa-heart"></i>Ajouter à la liste de souhaits</a>
                                                    </li>
                                                    <li>
                                                        <a href="#!" className="action compare" title="Compare" onClick={() => addToComp(product)}><i
                                                            className="fa fa-exchange"></i>Ajouter pour comparer</a>
                                                    </li>
                                                </ul>
                                            </div></>)}





                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProductInfo product={product} />
                    </div>
                </section>
                    <RelatedProduct />

                </>)}

            </>) : (<> <>
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

            </></>)}
        </>
    )
}

export default ProductDetailsTwo