import { createBrowserHistory } from 'history';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Loading from '../Common/loader'

const OrderTracking = () => {
    const history = createBrowserHistory();
    const params = useParams()
    const [orderId, setOrderId] = useState('');
    let load = useSelector((state) => state.products.loading)

    const onChangeOrder = (e) => {
        setOrderId(e.target.value)
    }

    return (

        <>
            {load ? (<Loading />) : (<>
                <section id="order_tracking" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className="order_tracking_wrapper">
                                    <h4>Suivi de commande</h4>
                                    <p>Pour suivre votre commande, veuillez entrer votre ID de commande dans la case ci-dessous et appuyez sur le bouton "Suivre".</p>

                                    <form onSubmit={(e) => { e.preventDefault(); history.push('/order-complete/' + params.idE + '/' + orderId); window.location.reload(); }}>
                                        <div className="form-group">
                                            <label htmlFor="order_ID" >Commande ID</label>
                                            <input type="number" id="order_ID" className="form-control" value={orderId} onChange={onChangeOrder} placeholder="Trouvez votre commande" style={{ marginTop: '10px' }} min={1} required />
                                        </div>

                                        <div className="order_track_button" style={{ marginTop: '25px' }}>
                                            <button type="submit" className="theme-btn-one btn-black-overlay btn_md">Suivre</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>)}
        </>
    )
}
export default OrderTracking
