import { useEffect, useState } from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import CartArea from '../../../ui-component/Cart'
import Footer from '../../../ui-component/Common/Footer'
import { useSelector } from 'react-redux'
import Loading from '../../../ui-component/Common/loader';
import Error404 from '../error/error404'
import { useSearchParams } from 'react-router-dom';
import AuthService from '../../../services/auth-services/AuthService'
const Cart = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let error404 = useSelector((state) => state.products.errorPage)
    let load = useSelector((state) => state.products.loading)
    const [l, setL] = useState(true);
    useEffect(async () => {
        const param = searchParams.get('t');

        if (param) {
            await localStorage.setItem('token', param)
            AuthService.show().then((res) => {
                localStorage.setItem('user', JSON.stringify({ nom: res.data.nom, prenom: res.data.prenom, photo: res.data.photo, email: res.data.email, numTel: res.data.numTel }))
                setL(false)
            })
            searchParams.delete('t');
            setSearchParams(searchParams);
        } else {
            setL(false)
        }
    }, [])
    return (
        l ? (<Loading />) : (<>
            <Header />
            {load ? (<Loading />) : (<>{error404 === 0 ? (
                <>
                    <Banner title="Cart" />
                    <CartArea />
                    <Footer />
                </>) : (<Error404></Error404>)}</>)}


        </>)

    )
}

export default Cart