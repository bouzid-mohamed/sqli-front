import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import Checkout from '../../../ui-component/Checkout'
import Footer from '../../../ui-component/Common/Footer'
import { createBrowserHistory } from 'history'
import AuthService from 'services/auth-services/AuthService'
import { useParams } from 'react-router'
const CheckoutOne = () => {
    const history = createBrowserHistory()
    const params = useParams()
    if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {

        return (
            <>
                <Header />
                <Banner title="Vérifier" />
                <Checkout />
                <Footer />
            </>
        )
    } else {
        history.push("/login/" + params.idE);
        window.location.reload();
    }

}

export default CheckoutOne