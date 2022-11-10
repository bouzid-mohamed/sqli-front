import Coupon from './Coupon'
import TotalCart from './TotalCart'
import { Link, useParams } from 'react-router-dom'
import img from '../../assets/img/common/empty-cart.png'
import { useDispatch, useSelector } from "react-redux";
import Loading from '../Common/loader'
import { useState } from 'react';

const CartArea = () => {
    const [coupon, setCoupon] = useState(null)
    let load = useSelector((state) => state.products.loading)
    const params = useParams();
    let dispatch = useDispatch();
    let carts = useSelector((state) => state.products.carts);
    // Remove from Cart
    const rmProduct = (id) => {
        dispatch({ type: "products/removeCart", payload: { id } });
    }
    // Clear
    const clearCarts = () => {
        dispatch({ type: "products/clearCart" });
    }
    // Value Update
    const cartValUpdate = (val, id) => {
        dispatch({ type: "products/updateCart", payload: { val, id } });
    }

    const handleCoupon = (c) => {
        setCoupon(c)
    }
    return (
        <>

            {carts.length
                ?
                <section id="cart_area_one" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="table_desc">
                                    <div className="table_page table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="product_remove">Retirer</th>
                                                    <th className="product_thumb">Image</th>
                                                    <th className="product_name">Produit</th>
                                                    <th className="product-price">Prix</th>
                                                    <th className="product_quantity">Quantité</th>
                                                    <th className="product_total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carts.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="product_remove">
                                                            <i role="button" tabIndex={0}
                                                                className="fa fa-trash text-danger" onClick={() => rmProduct(data)} style={{ 'cursor': 'pointer' }} onKeyPress={() => rmProduct(data)}   ></i>
                                                        </td>
                                                        <td className="product_thumb">
                                                            <Link to={'/' + params.idE + '/product-details/' + data.id}>
                                                                <img src={data.img} alt="img" />
                                                            </Link>
                                                        </td>
                                                        <td className="product_name">
                                                            <Link to={'/' + params.idE + '/product-details/' + data.id}>
                                                                {data.title}
                                                            </Link>
                                                        </td>
                                                        <td className="product-price">${data.price}.00</td>
                                                        <td className="product_quantity">
                                                            <input min="1" max="100" type="number" onChange={e => cartValUpdate(e.currentTarget.value, data.id)} defaultValue={data.quantity || 1} />
                                                        </td>
                                                        <td className="product_total">Dt{data.price * (data.quantity || 1)}.00</td>
                                                    </tr>
                                                ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cart_submit">
                                        {carts.length
                                            ? <button className="theme-btn-one btn-black-overlay btn_sm" type="button" onClick={() => clearCarts()}>Vider le panier</button>
                                            : null
                                        }

                                    </div>
                                </div>
                            </div>
                            <Coupon handleCoupon={handleCoupon} />
                            <TotalCart coupon={coupon} />
                        </div>
                    </div>
                </section>
                : <section id="empty_cart_area" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                <div className="empaty_cart_area">
                                    <img src={img} alt="img" />
                                    <h2>VOTRE PANIER EST VIDE</h2>
                                    <h3>Désolé ... Aucun article trouvé dans votre panier !</h3>
                                    <Link to={'/' + params.idE + "/shop/"} className="btn btn-black-overlay btn_sm">Continuer vos achats</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

        </>

    )
}

export default CartArea