import React from 'react'
import Header from '../../../../ui-component/Common/Header'
import Banner from '../../../../ui-component/Common/Banner'
import Wishlist from '../../../../ui-component/Common/WishList'
import Footer from '../../../../ui-component/Common/Footer'
import Loading from '../../../../ui-component/Common/loader';
import Error404 from 'views/pages/error/error404'
import { useSelector } from 'react-redux'
const WishLists = () => {
    let error404 = useSelector((state) => state.products.errorPage)
    let load = useSelector((state) => state.products.loading)
    return (
        <>
            <Header />
            {load ? (<Loading />) : (<>{error404 === 0 ? (
                <>
                    <Banner title="Favoris" />
                    <Wishlist />
                    <Footer />
                </>) : (<Error404></Error404>)}</>)}


        </>
    )
}

export default WishLists