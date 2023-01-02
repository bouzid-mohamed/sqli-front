import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import Checkout from '../../../ui-component/Checkout'
import Footer from '../../../ui-component/Common/Footer'
import { createBrowserHistory } from 'history'
import AuthService from 'services/auth-services/AuthService'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import Error404 from 'views/pages/error/error404'
const CheckoutOne = () => {
    const history = createBrowserHistory()
    const params = useParams()
    let error404 = useSelector((state) => state.products.errorPage)
    if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {

        return (

            <>{error404 === 0 ? (
                <>
                    <Banner title="Vérifier" />
                    <Checkout />
                </>) : (<Error404></Error404>)}</>



        )
    } else {
        history.push('/' + params.idE + "/login/");
        window.location.reload();
    }

}

export default CheckoutOne