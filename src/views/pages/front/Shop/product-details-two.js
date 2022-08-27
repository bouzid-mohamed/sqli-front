import React from 'react'
import Header from '../../../../ui-component/Common/Header'
import Banner from '../../../../ui-component/Common/Banner'
import ProductDetailsTwos from '../../../../ui-component/Common/ProductDetails/ProductDetailsTwo'
import Loading from '../../../../ui-component/Common/loader';
import Footer from '../../../../ui-component/Common/Footer'
import { useSelector } from 'react-redux'
import Error404 from 'views/pages/error/error404'


const ProductDetailsTwo = () => {
    let error404 = useSelector((state) => state.products.errorPage)
    let load = useSelector((state) => state.products.loading)

    return (
        <>
            <Header />
            {load ? (<Loading />) : (
                <>{error404 === 0 ? (
                    <><Banner title="Détails du produit" />
                        <ProductDetailsTwos />
                        <Footer />
                    </>) :
                    (<Error404></Error404>)}</>)}
        </>
    )
}

export default ProductDetailsTwo