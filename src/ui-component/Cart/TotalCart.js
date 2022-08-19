import { Link, useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';

const TotalCart = (props) => {
    const history = createBrowserHistory();
    const params = useParams();
    let carts = useSelector((state) => state.products.carts);

    const cartTotal = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * item.price)
        }, 0)
    }
    const passerCommande = () => {
        if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {
            history.push("/checkout/" + params.idE);
            window.location.reload();
        }
    }
    return (
        <>
            {props.fullGrid ? (
                <div className="col-lg-12 col-md-12">
                    <div className="coupon_code right">
                        <h3>TOTAL PANIER</h3>
                        <div className="coupon_inner">
                            <div className="cart_subtotal">
                                <p>Total</p>
                                <p className="cart_amount">Dt{cartTotal()}.00</p>
                            </div>

                            <div className="cart_subtotal ">
                                <p>Réduction</p>
                                {props.coupon === null ? (<p className="cart_amount"><span>Coupon:</span> Dt00</p>) : (<p className="cart_amount"><span>Coupon:</span> {props.coupon.reduction}</p>)}

                            </div>
                            <a href="#!">Total avec réduction</a>
                            <div className="cart_subtotal">
                                <p>Total</p>
                                {props.coupon != null ? (<p className="cart_amount">Dt {cartTotal() - props.coupon.reduction}.00 </p>) : (<p className="cart_amount">${cartTotal()}.00 </p>)}
                            </div>
                            <div className="checkout_btn">

                                <Link to="/checkout" className="theme-btn-one btn-black-overlay btn_sm">
                                    Passer la commande
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-lg-6 col-md-6">
                    <div className="coupon_code right">
                        <h3>Cart Total</h3>
                        <div className="coupon_inner">
                            <div className="cart_subtotal">
                                <p>Subtotal</p>
                                <p className="cart_amount">Dt{cartTotal()}.00</p>
                            </div>
                            <div className="cart_subtotal ">
                                <p>Réduction</p>
                                {props.coupon === null ? (<p className="cart_amount"><span>Coupon:</span> Dt 00</p>) : (<p className="cart_amount"><span>Coupon:</span> {props.coupon.reduction}</p>)}                            </div>
                            <a href="#!">Total avec réduction</a>


                            <div className="cart_subtotal">
                                <p>Total</p>
                                {props.coupon != null ? (<p className="cart_amount">Dt {cartTotal() - props.coupon.reduction}.00 </p>) : (<p className="cart_amount">${cartTotal()}.00 </p>)}

                            </div>
                            <div className="checkout_btn">

                                <button className="theme-btn-one btn-black-overlay btn_sm" onClick={passerCommande}>
                                    Passer la commande
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TotalCart
