import { Link, Navigate, useParams } from 'react-router-dom'
import avater from '../../../assets/img/common/avater.png'
import { useSelector, useDispatch } from "react-redux";
import { createBrowserHistory } from 'history';
import Swal from 'sweetalert2';
import AuthService from 'services/auth-services/AuthService';
import { useState } from 'react';

const TopHeader = () => {
    const params = useParams();
    let status = useSelector((state) => state.user.status);
    let user = useSelector((state) => state.user.user);
    const [redirect, setRedirect] = useState(false)

    const logout = () => {
        AuthService.logout();
        setRedirect(true)
    }
    if (redirect)
        return (<Navigate push to={"/" + params.idE + "/login"} />)
    return (
        <>
            <section id="top_header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_left">
                                <p>Collection spéciale déjà disponible.<Link to={"/" + params.idE + "/shop"}>voir plus......</Link></p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="top_header_right">
                                {
                                    !status ?
                                        <ul className="right_list_fix">
                                            <li><Link to={'/' + params.idE + "/compare"}><i className="fa fa-refresh"></i> Comparer</Link></li>
                                            <li><Link to={"/" + params.idE + "/login"}><i className="fa fa-user"></i> Connexion</Link></li>
                                            <li><Link to={'/' + params.idE + "/register/client"}><i className="fa fa-lock"></i> S'inscrire</Link></li>
                                        </ul>
                                        :
                                        <ul className="right_list_fix">
                                            <li><Link to={"/" + params.idE + "/order-tracking/"}><i className="fa fa-truck"></i> Suivre votre commande</Link></li>
                                            <li className="after_login"><img src={user?.photo?.startsWith('https://') ? user?.photo : "http://localhost:8000/uploads/" + user?.photo} alt="avater" /> {user.name || ''} <i className="fa fa-angle-down"></i>
                                                <ul className="custom_dropdown">
                                                    <li><Link to={"/" + params.idE + "/my-account/customer-account-details"}><i className="fa fa-tachometer"></i> Compte</Link></li>
                                                    <li><Link to={"/" + params.idE + "/my-account/customer-order"}><i className="fa fa-cubes"></i>Mes commandes</Link></li>
                                                    <li><Link to="#!" onClick={() => { logout() }} ><i className="fa fa-sign-out"></i> Se déconnecter</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TopHeader