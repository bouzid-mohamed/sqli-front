import Banner from '../../../../ui-component/Common/Banner'
import ProductDetailsTwos from '../../../../ui-component/Common/ProductDetails/ProductDetailsTwo'
import { useSelector } from 'react-redux'
import Error404 from 'views/pages/error/error404'


const ProductDetailsTwo = () => {
    let error404 = useSelector((state) => state.products.errorPage)

    return (
        <>


            {error404 === 0 ? (
                <><Banner title="Détails du produit" />
                    <ProductDetailsTwos />
                </>) :
                (<Error404></Error404>)}
        </>
    )
}

export default ProductDetailsTwo