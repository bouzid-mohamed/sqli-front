import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { RatingStar } from "rating-star";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon, TelegramIcon, WhatsappIcon } from "react-share";
import Swal from 'sweetalert2';
import { useParams } from 'react-router';

const MyVerticallyCenteredModal = (props) => {
    const params = useParams()
    let dispatch = useDispatch();
    const [count, setCount] = useState(1)
    const [taille, setTaille] = useState([])
    const [couleur, setCouleur] = useState([])
    const [stockChoisit, setStockChoisit] = useState(null)
    const [pchecked, setPchecked] = useState(0)
    const handleChange = (e) => {
        setPchecked(0)
        setStockChoisit(null);

        let col = []
        props.data.stoks.map((s) => {
            if (s.taille === e.target.value) {
                col.push(s)
            }
            setCouleur(col)
        })
    }
    const colorSwatch = (i) => {
        setPchecked(i.id);
        setStockChoisit(i);
    }
    const incNum = () => {
        if (stockChoisit.quantite >= count + 1) {
            setCount(count + 1)
        } else {
            setCount(count)
            alert('quantité ' + (count + 1) + ' n est pas disponible dans le stock')
        }

    }
    const decNum = () => {
        console.log(2);
        if (count > 1) {
            setCount(count - 1)
        } else {
            alert("Sorry, Limit Reached")
            setCount(1)
        }
    }

    // Add to cart
    const addToCart = async (id) => {
        props.onHide()
        if (stockChoisit === null) {
            Swal.fire({
                title: 'Echec!',
                text: 'Il faut choisir la taille et le couleur',
                imageUrl: props.data.img,
                imageWidth: 200,
                imageAlt: props.data.title,
                showConfirmButton: false,
                timer: 5000
            })

        } else {
            dispatch({ type: "products/addToCart", payload: [id, stockChoisit, count] })
        }
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
    useEffect(() => {
        let tstoks = []

        props.data.stoks.filter((s) => {
            if (!tstoks.includes(s.taille) && s.quantite > 0)
                tstoks.push(s.taille)
        })
        setTaille(tstoks)
    }, [])

    return (
        <>
            <Modal {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body>
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="product_one_modal_top modal-content">
                            <button type="button" className="close close_modal_icon" onClick={props.onHide} >
                                <span aria-hidden="true"><i className="fa fa-times"></i></span>
                            </button>
                            <div id="product_slider_one">
                                <div className="row">
                                    <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                                        <div className="products_modal_sliders">
                                            <img src={props.data.img} alt="img" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                                        <div className="modal_product_content_one">
                                            <h3>{props.data.title}</h3>
                                            <div className="reviews_rating">
                                                <h5>{props.data.categorie.nom}</h5>
                                            </div>
                                            {props.data.promotion ? (<h4>Dt{' ' + props.data.price}.00 <del>Dt{' ' + Math.trunc((props.data.price * 100 / props.data.promotion.pourcentage))}.00</del> </h4>
                                            ) : (<h4>Dt{' ' + props.data.price}.00  </h4>)}
                                            <p>{props.data.description}</p>

                                            {InStock(props.data) ? (
                                                <>
                                                    <div className="customs_selects" style={{ marginTop: 15 }}>
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
                                                        <div className="product_count_one" style={{ display: stockChoisit != null ? '' : 'none' }}>
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

                                                    <div className="links_Product_areas" style={{ marginTop: 20 }}>
                                                        <a href="#!" className="theme-btn-one btn-black-overlay btn_sm" onClick={() => addToCart(props.data)} disabled={props.data.stoks?.length > 0 ? true : false}>Ajouter au panier</a>
                                                    </div>

                                                </>) : (<><h4 style={{ color: 'red' }}>N'est pas disponible dans le stock</h4> <div className="links_Product_areas">

                                                </div></>)}
                                            <div className="modal_share_icons_one">
                                                <h4>PARTAGER CE PRODUIT</h4>
                                                <div className="posted_icons_one">
                                                    <FacebookShareButton url={"http://localhost:3000/" + params.idE + '/product-details/' + props.data.id} quote={"Best React.js ecommerce Templete"}>
                                                        <FacebookIcon size={32} round />
                                                    </FacebookShareButton>
                                                    <TwitterShareButton url={"http://localhost:3000/" + params.idE + '/product-details/' + props.data.id} title={"Best React.js ecommerce Templete"}>
                                                        <TwitterIcon size={32} round />
                                                    </TwitterShareButton>
                                                    <LinkedinShareButton url={"http://localhost:3000/" + params.idE + '/product-details/' + props.data.id} title={"Best React.js ecommerce Templete"}>
                                                        <LinkedinIcon size={32} round />
                                                    </LinkedinShareButton>
                                                    <TelegramShareButton url={"http://localhost:3000/" + params.idE + '/product-details/' + props.data.id} title={"Best React.js ecommerce Templete"}>
                                                        <TelegramIcon size={32} round />
                                                    </TelegramShareButton>
                                                    <WhatsappShareButton url={"http://localhost:3000/" + params.idE + '/product-details/' + props.data.id} title={"Best React.js ecommerce Templete"}>
                                                        <WhatsappIcon size={32} round />
                                                    </WhatsappShareButton>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MyVerticallyCenteredModal