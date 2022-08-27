import React from 'react'
import LeftSideBar from '../../../../ui-component/Shop/LeftSideBar'
import Header from '../../../../ui-component/Common/Header'
import Banner from '../../../../ui-component/Common/Banner'
import Footer from '../../../../ui-component/Common/Footer'
import Loading from '../../../../ui-component/Common/loader';
import { useSelector } from 'react-redux'
import Error404 from 'views/pages/error/error404'

const ShopLeftSideBar = () => {
    let error404 = useSelector((state) => state.products.errorPage)
    let load = useSelector((state) => state.products.loading)

    return (
        <>
            <Header />
            {load ? (<Loading />) : (<>{error404 === 0 ? (
                <>
                    <Banner title="Produits" />
                    <LeftSideBar />
                    <Footer />
                </>) : (<Error404></Error404>)}</>)}


        </>
    )
}

export default ShopLeftSideBar