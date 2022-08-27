import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import Layout from '../../../ui-component/MyAccountDashboard/Layout'
import AccountDetails from '../../../ui-component/MyAccountDashboard/AccountDetails'
import Footer from '../../../ui-component/Common/Footer'
import { createBrowserHistory } from 'history'
import { useParams } from 'react-router'
import AuthService from 'services/auth-services/AuthService'
import Loading from '../../../ui-component/Common/loader';
import Error404 from 'views/pages/error/error404'
import { useSelector } from 'react-redux'
const CustomerAccountDetails = () => {
    const history = createBrowserHistory()
    let error404 = useSelector((state) => state.products.errorPage)
    let load = useSelector((state) => state.products.loading)

    const params = useParams()
    if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {
        return (
            <>
                <Header />
                {load ? (<Loading />) : (<>{error404 === 0 ? (
                    <>
                        <Banner title="Mon compte" />
                        <Layout>
                            <AccountDetails />
                        </Layout>
                        <Footer />
                    </>) : (<Error404></Error404>)}</>)}


            </>
        )
    } else {
        history.push("/login/" + params.idE);
        window.location.reload();
    }
}

export default CustomerAccountDetails