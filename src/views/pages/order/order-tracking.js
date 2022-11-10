import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import OrderTrackings from '../../../ui-component/OrderTrackng'
import Footer from '../../../ui-component/Common/Footer'
import AuthService from 'services/auth-services/AuthService'
import { createBrowserHistory } from 'history'
import { Navigate, useParams } from 'react-router'
import Loading from '../../../ui-component/Common/loader';
import Error404 from 'views/pages/error/error404'
import { useSelector } from 'react-redux'
const OrderTracking = () => {
    const history = createBrowserHistory()
    const params = useParams()
    let error404 = useSelector((state) => state.products.errorPage)

    if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {
        return (
            <>{error404 === 0 ? (
                <>
                    <Banner title="Suivi de commande" />
                    <OrderTrackings />
                </>) : (<Error404></Error404>)}</>
        )
    } else {
        return (<Navigate to={'/' + params.idE + ' /login'} />)
    }
}

export default OrderTracking