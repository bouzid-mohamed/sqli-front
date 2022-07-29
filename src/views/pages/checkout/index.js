import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import Checkout from '../../../ui-component/Checkout'
import Footer from '../../../ui-component/Common/Footer'
const CheckoutOne = () => {
    return (
        <>
            <Header />
            <Banner title="Checkout" />
            <Checkout />
            <Footer />
        </>
    )
}

export default CheckoutOne