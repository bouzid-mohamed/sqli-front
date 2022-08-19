import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2';
import { createBrowserHistory } from 'history';

const Sidebar = () => {
    const params = useParams()
    const location = useLocation()
    let dispatch = useDispatch();
    const history = createBrowserHistory();
    let status = useSelector((state) => state.user.status);
    const logout = () => {
        Swal.fire({
            icon: 'success',
            title: 'Logout Sucessfull',
            text: 'Thank You'
        })
        dispatch({ type: "user/logout" })
        history.push("/login");
    }
    return (
        <>
            <div className="col-sm-12 col-md-12 col-lg-3">
                <div className="dashboard_tab_button">
                    <ul role="tablist" className="nav flex-column dashboard-list">
                        <li> <Link to={"/my-account/customer-order/" + params.idE} className={location.pathname === '/my-account/customer-order/' + params.idE ? 'active' : null}><i className="fa fa-cart-arrow-down"></i>Mes Commandes</Link></li>
                        <li><Link to={"/my-account/customer-account-details/" + params.idE} className={location.pathname === '/my-account/customer-account-details/' + params.idE ? 'active' : null}><i className="fa fa-user"></i>Mon Compte</Link></li>
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
