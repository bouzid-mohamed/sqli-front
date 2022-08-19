import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AuthService from 'services/auth-services/AuthService'
import BillingsInfo from './BillingsInfo'
import YourOrders from './YourOrders'
import Loading from '../Common/loader'

const Checkout = () => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    let load = useSelector((state) => state.products.loading)

    useEffect(() => {
        AuthService.show().then((res) => {
            setUser(res.data);
            setLoading(false);
        })
    }, [])


    return (
        <>
            {load || loading ? (<Loading />) : (<>
                <section id="checkout_one" className="ptb-100">
                    <div className="container">
                        <div className="row">
                            <BillingsInfo user={user} />
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <YourOrders />
                            </div>
                        </div>
                    </div>
                </section>
            </>)}
        </>
    )


}

export default Checkout