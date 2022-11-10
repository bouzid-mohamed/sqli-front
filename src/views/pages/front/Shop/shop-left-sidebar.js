import LeftSideBar from '../../../../ui-component/Shop/LeftSideBar'
import Banner from '../../../../ui-component/Common/Banner'
import { useSelector } from 'react-redux'
import Error404 from 'views/pages/error/error404'

const ShopLeftSideBar = () => {
    let error404 = useSelector((state) => state.products.errorPage)

    return (
        <>
            {error404 === 0 ? (
                <>
                    <Banner title="Produits" />
                    <LeftSideBar />
                </>) : (<Error404></Error404>)}


        </>
    )
}

export default ShopLeftSideBar