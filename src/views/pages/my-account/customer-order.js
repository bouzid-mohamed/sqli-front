import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import Layout from '../../../ui-component/MyAccountDashboard/Layout'
import Order from '../../../ui-component/MyAccountDashboard/Order'
import Footer from '../../../ui-component/Common/Footer'
import { createBrowserHistory } from 'history'
import { useParams } from 'react-router'
import AuthService from 'services/auth-services/AuthService'
const CustomerOrder = () => {
    const history = createBrowserHistory()
    const params = useParams()

    if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {
        return (
            <>
                <Header />
                <Banner title="Détails des commandes" />
                <Layout>
                    <Order />
                </Layout>
                <Footer />
            </>
        )
    } else {
        history.push("/login/" + params.idE);
        window.location.reload();
    }
}

export default CustomerOrder
