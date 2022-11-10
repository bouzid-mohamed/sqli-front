import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useState } from 'react';
const Sidebar = () => {
    const params = useParams()
    const location = useLocation()
    let dispatch = useDispatch();
    let status = useSelector((state) => state.user.status);
    const [redirect, setRedirect] = useState(false)

    const logout = () => {
        Swal.fire({
            icon: 'success',
            title: 'Déconnexion réussie',
            text: 'Merci'
        })
        dispatch({ type: "user/logout" })
        setRedirect(true)
    }
    if (redirect)
        return (<Navigate push to={'/' + params.idE + "/login"} />)
    return (
        <>
            <div className="col-sm-12 col-md-12 col-lg-3">
                <div className="dashboard_tab_button">
                    <ul role="tablist" className="nav flex-column dashboard-list">
                        <li> <Link to={'/' + params.idE + "/my-account/customer-order"} className={location.pathname === '/my-account/customer-order/' + params.idE ? 'active' : null}><i className="fa fa-cart-arrow-down"></i>Mes Commandes</Link></li>
                        <li><Link to={'/' + params.idE + "/my-account/customer-account-details"} className={location.pathname === '/my-account/customer-account-details/' + params.idE ? 'active' : null}><i className="fa fa-user"></i>Mon Compte</Link></li>
                        {
                            status ? <li><Link to="/#!" onClick={(e) => { e.preventDefault(); logout() }}><i className="fa fa-sign-out"></i>Se déconnecter</Link></li> : null
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
