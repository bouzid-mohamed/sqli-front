import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import LoginArea from '../../../ui-component/Login'
import Footer from '../../../ui-component/Common/Footer'
const Login = () => {
    return (
        <>
            <Header />
            <Banner title="Login" />
            <LoginArea />
            <Footer />
        </>
    )
}

export default Login