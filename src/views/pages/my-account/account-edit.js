import React from 'react'
import Header from '../../../ui-component/Common/Header'
import Banner from '../../../ui-component/Common/Banner'
import AccountDetailsEdit from '../../../ui-component/MyAccountDashboard/AccountDetailsEdit'
import Footer from '../../../ui-component/Common/Footer'
import AuthService from 'services/auth-services/AuthService'
import { createBrowserHistory } from 'history'
import { useParams } from 'react-router'
const AccountEdit = () => {
  const history = createBrowserHistory()
  const params = useParams()
  if (AuthService.getCurrentClient(params.idE).roles.indexOf("ROLE_CLIENT") > -1) {
    return (
      <>
        <Header />
        <Banner title="Modifier mon compte" />
        <AccountDetailsEdit />
        <Footer />
      </>
    )
  } else {
    history.push("/login/" + params.idE);
    window.location.reload();
  }
}

export default AccountEdit