import Banner from '../../../ui-component/Common/Banner'
import ForgotPassword from '../../../ui-component/Login/Forgot-password-form'
import { useSelector } from 'react-redux'
import Error404 from 'views/pages/error/error404'
const Login = () => {
    let error404 = useSelector((state) => state.products.errorPage)
    return (
        <>
            {error404 === 0 ? (
                <>
                    <Banner title="Login" />
                    <ForgotPassword />
                </>) : (<Error404></Error404>)}
        </>
    )
}

export default Login