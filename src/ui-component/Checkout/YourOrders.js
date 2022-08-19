import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const YourOrders = () => {
    let carts = useSelector((state) => state.products.carts);
    const params = useParams();
    const cartTotal = () => {
        return carts.reduce(function (total, item) {
            return total + ((item.quantity || 1) * item.price)
        }, 0)
    }
    const reduction = () => {
        if (localStorage.getItem('coupon' + params.idE)) {
            return parseInt(JSON.parse(localStorage.getItem('coupon' + params.idE)).reduction)
        } else return 0
    }

    return (
        <>
            <div className="order_review  box-shadow bg-white">
                <div className="check-heading">
                    <h3>Vos commandes</h3>
                </div>
                <div className="table-responsive order_table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map((data, index) => (
                                <tr key={index}>

                                    <td>{data.title}<span className="product-qty">x {data.quantity}</span>
                                    </td>
                                    <td>Dt{data.price * (data.quantity || 1)}.00 </td>
                                </tr>
                            ))}

                        </tbody>
                        <tfoot>
                            <tr>
                                <th>SubTotal</th>
                                <td className="product-subtotal">Dt {cartTotal()}.00 </td>
                            </tr>
                            <tr>
                                <th>Réduction</th>
                                <td>{reduction()}</td>

                            </tr>
                            <tr>
                                <th>Total</th>
                                <td className="product-subtotal">Dt {cartTotal() - reduction()}.00</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}

export default YourOrders