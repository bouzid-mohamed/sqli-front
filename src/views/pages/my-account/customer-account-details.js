import Banner from '../../../ui-component/Common/Banner'
import Layout from '../../../ui-component/MyAccountDashboard/Layout'
import AccountDetails from '../../../ui-component/MyAccountDashboard/AccountDetails'
import { Navigate, useParams } from 'react-router'
import AuthService from 'services/auth-services/AuthService'
import Error404 from 'views/pages/error/error404'
import { useSelector } from 'react-redux'
const CustomerAccountDetails = () => {
    let error404 = useSelector((state) => state.products.errorPage)
    const params = useParams()
    if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {
        return (
            <>
                {error404 === 0 ? (
                    <>
                        <Banner title="Mon compte" />
                        <Layout>
                            <AccountDetails />
                        </Layout>
                    </>) : (<Error404></Error404>)}
            </>
        )
    } else {
        <Navigate to={'/' + params.idE + ' /login'} />
    }
}

export default CustomerAccountDetails
