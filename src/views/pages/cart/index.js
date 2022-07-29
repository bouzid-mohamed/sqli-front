import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import CartArea from '../../../ui-component/Cart'
import Footer from '../../../ui-component/Common/Footer'

const Cart = () => {
    return (
        <>
            <Header />
            <Banner title="Cart" />
            <CartArea />
            <Footer />

        </>
    )
}

export default Cart