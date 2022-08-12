import React from 'react'
import LeftSideBar from '../../../../ui-component/Shop/LeftSideBar'
import Header from '../../../../ui-component/Common/Header'
import Banner from '../../../../ui-component/Common/Banner'
import Footer from '../../../../ui-component/Common/Footer'

const ShopLeftSideBar = () => {
    return (
        <>
            <Header />
            <Banner title="Shop" />
            <LeftSideBar />
            <Footer />

        </>
    )
}

export default ShopLeftSideBar