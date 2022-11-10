import Banner from '../../../ui-component/Common/Banner'
import Layout from '../../../ui-component/MyAccountDashboard/Layout'
import Order from '../../../ui-component/MyAccountDashboard/Order'
import { Navigate, useParams } from 'react-router'
import AuthService from 'services/auth-services/AuthService'
import Error404 from 'views/pages/error/error404'
import { useSelector } from 'react-redux'
const CustomerOrder = () => {
    const params = useParams()
    let error404 = useSelector((state) => state.products.errorPage)
    if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {
        return (
            <>
                {error404 === 0 ? (
                    <>
                        <Banner title="Détails des commandes" />
                        <Layout>
                            <Order />
                        </Layout>
                    </>) : (<Error404></Error404>)}


            </>
        )
    } else {
        return (<Navigate to={'/' + params.idE + ' /login'} />)
    }
}

export default CustomerOrder
