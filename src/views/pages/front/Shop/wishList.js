import Banner from '../../../../ui-component/Common/Banner'
import Wishlist from '../../../../ui-component/Common/WishList'
import Error404 from 'views/pages/error/error404'
import { useSelector } from 'react-redux'
const WishLists = () => {
    let error404 = useSelector((state) => state.products.errorPage)
    return (

        <>{error404 === 0 ? (
            <>
                <Banner title="Favoris" />
                <Wishlist />
            </>) : (<Error404></Error404>)}</>
    )
}

export default WishLists