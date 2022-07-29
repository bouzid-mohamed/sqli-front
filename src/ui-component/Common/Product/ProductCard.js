import React, { useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineExpand } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import MyVerticallyCenteredModal from '../../Common/Modal';
import { height } from '@mui/system';

const ProductCard = (props) => {
    let dispatch = useDispatch();
    const params = useParams();

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
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div className="product_wrappers_one">
                <div className="thumb">
                    <Link to={`/product-details/${params.idE}/${props.data.id}`} className="image">
                        <img src={props.data.img} alt="Product" style={{ height: 360, width: 330 }} />

                        <img className="hover-image" src={props.data.hover_img}
                            style={{ height: 360, width: 330 }} alt="Product" />
                    </Link>
                    <span className="badges">
                        <span className={(['hot', 'new', 'sale'][Math.round(Math.random() * 2)])}>{props.data.labels}</span>
                    </span>
                    <div className="actions">
                        <a href="#!" className="action wishlist" title="Wishlist" onClick={() => addToFav(props.data.id)}><AiOutlineHeart /></a>
                        <a href="#!" className="action quickview" title="Quick view" onClick={() => setModalShow(true)}><AiOutlineExpand /></a>
                        <a href="#!" className="action compare" title="Compare" onClick={() => addToComp(props.data.id)}><FaExchangeAlt /></a>
                    </div>
                    <button type="button" className="add-to-cart offcanvas1-toggle" onClick={() => addToCart(props.data.id)}>Add to cart</button>
                </div>
                <div className="content">
                    <h5 className="title">
                        <Link to={`/product-details/${props.data.id}`}>{props.data.title}</Link>
                    </h5>
                    <span className="price">
                        <span className="new">Dt{' ' + props.data.price}.00</span>
                    </span>
                </div>
            </div>

            <MyVerticallyCenteredModal data={props.data} show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

export default ProductCard