import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import CartArea from '../../../ui-component/Cart'
import Footer from '../../../ui-component/Common/Footer'
import { useSelector } from 'react-redux'
import Loading from '../../../ui-component/Common/loader';
import Error404 from '../error/error404'

const Cart = () => {
    let error404 = useSelector((state) => state.products.errorPage)
    let load = useSelector((state) => state.products.loading)

    return (
        <>
            <Header />
            {load ? (<Loading />) : (<>{error404 === 0 ? (
                <>
                    <Banner title="Cart" />
                    <CartArea />
                    <Footer />
                </>) : (<Error404></Error404>)}</>)}


        </>
    )
}

export default Cart