import React from 'react'
import Header from '../../../../ui-component/Common/Header'
import Banner from '../../../../ui-component/Common/Banner'
import ProductDetailsTwos from '../../../../ui-component/Common/ProductDetails/ProductDetailsTwo'

import Footer from '../../../../ui-component/Common/Footer'

const ProductDetailsTwo = () => {
    return (
        <>
            <Header />
            <Banner title="Détails du produit " />
            <ProductDetailsTwos />
            <Footer />
        </>
    )
}

export default ProductDetailsTwo