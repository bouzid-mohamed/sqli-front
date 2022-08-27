import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import Checkout from '../../../ui-component/Checkout'
import Footer from '../../../ui-component/Common/Footer'
import { createBrowserHistory } from 'history'
import AuthService from 'services/auth-services/AuthService'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import Loading from '../../../ui-component/Common/loader';
import Error404 from 'views/pages/error/error404'
const CheckoutOne = () => {
    const history = createBrowserHistory()
    const params = useParams()
    let error404 = useSelector((state) => state.products.errorPage)
    let load = useSelector((state) => state.products.loading)
    if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {

        return (
            <>
                <Header />
                {load ? (<Loading />) : (<>{error404 === 0 ? (
                    <>
                        <Banner title="Vérifier" />
                        <Checkout />
                        <Footer />
                    </>) : (<Error404></Error404>)}</>)}


            </>
        )
    } else {
        history.push("/login/" + params.idE);
        window.location.reload();
    }

}

export default CheckoutOne