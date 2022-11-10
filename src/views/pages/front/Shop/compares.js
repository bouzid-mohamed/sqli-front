import Banner from '../../../../ui-component/Common/Banner'
import Compare from '../../../../ui-component/Compare'
import { useSelector } from 'react-redux'
import Error404 from 'views/pages/error/error404'

const Compares = () => {
    let error404 = useSelector((state) => state.products.errorPage)

    return (

        <>{error404 === 0 ? (
            <>
                <Banner title="Liste de comparaison" />
                <Compare />
            </>) : (<Error404></Error404>)}</>



    )
}

export default Compares