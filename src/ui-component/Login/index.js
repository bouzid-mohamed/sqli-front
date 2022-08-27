import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { createBrowserHistory } from 'history';
import AuthService from 'services/auth-services/AuthService';

const LoginArea = () => {
    const [email, setEmail] = useState('')
    const params = useParams()
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false)

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = () => {

        AuthService.login(email, password).then(
            () => {
                setSubmitting(true)
                const history = createBrowserHistory();
                if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1) {
                    history.push("/");
                    window.location.reload();
                } else if (AuthService.getCurrentUser().roles.indexOf("ROLE_POSTE") > -1) {
                    history.push("/post");
                    window.location.reload();
                } else if (AuthService.getCurrentUser().roles.indexOf("ROLE_CLIENT") > -1) {
                    AuthService.show().then((res) => {
                        localStorage.setItem('user', JSON.stringify({ nom: res.data.nom, prenom: res.data.prenom, photo: res.data.photo, email: res.data.email, numTel: res.data.numTel }))
                        history.push("/cart/" + params.idE);
                        window.location.reload();
                    })


                }

            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: resMessage
                })
                setSubmitting(false);

            }
        );

    }



    return (
        <>

            <section id="login_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="account_form">
                                <h3>Login</h3>
                                <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                                    <div className="default-form-box">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" value={email} onChange={handleChangeEmail} required />
                                    </div>
                                    <div className="default-form-box">
                                        <label>Mot de passe<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" value={password} onChange={handleChangePassword} required minLength="4" />
                                    </div>
                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit" disabled={submitting}>{submitting ? 'Loading...' : 'Connexion'}</button>
                                    </div>
                                    <div className="remember_area">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="materialUnchecked" />
                                            <label className="form-check-label" htmlFor="materialUnchecked">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to={'/' + params.idE + "/register/client"} className="active">Créez votre compte?</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default LoginArea
