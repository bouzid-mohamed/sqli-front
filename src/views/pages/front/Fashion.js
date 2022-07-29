import React from 'react'
import Banner from '../../../ui-component/Fashion/Banner'
import BannerBottom from '../../../ui-component/Fashion/BannerBottom'
import HotProduct from '../../../ui-component/Fashion/HotProduct'
import Trending from '../../../ui-component/Fashion/Trending'
import TodayDeal from '../../../ui-component/Fashion/TodayDeal'
import OfferTime from '../../../ui-component/Fashion/OfferTime'
import Blog from '../../../ui-component/Fashion/Blog'
import Footer from '../../../ui-component/Common/Footer'
import Header from '../../../ui-component/Common/Header'


const Fashion = () => {
    return (
        <>
            <Header />
            <Banner />
            <BannerBottom />
            <HotProduct />
            <OfferTime />
            <TodayDeal />
            <Trending />
            <Blog />
            <Footer />
        </>
    )
}

export default Fashion