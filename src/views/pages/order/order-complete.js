import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import OrderCompleted from '../../../ui-component/OrderCompleted'
import Footer from '../../../ui-component/Common/Footer'
import { createBrowserHistory } from 'history'
import { Navigate, useParams } from 'react-router'
import AuthService from 'services/auth-services/AuthService'
import { useSelector } from 'react-redux'
import Loading from '../../../ui-component/Common/loader';
import Error404 from 'views/pages/error/error404'
const OrderComplete = () => {
    const params = useParams()
    let error404 = useSelector((state) => state.products.errorPage)
    let load = useSelector((state) => state.products.loading)
    if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {
        return (
            <>{error404 === 0 ? (
                <>
                    <Banner title="Suivi de commande" />
                    <OrderCompleted />
                </>) : (<Error404></Error404>)}</>)

    } else {
        return (<Navigate to={'/' + params.idE + ' /login'} />)
    }
}


export default OrderComplete