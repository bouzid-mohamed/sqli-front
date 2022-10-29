import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { createBrowserHistory } from 'history';
import AuthService from 'services/auth-services/AuthService';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Google from 'assets/images/icons/social-google.svg';
import Facebook from 'assets/images/icons/Facebook_F_icon.svg.png';

import { useMediaQuery, Button } from '@mui/material';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const params = useParams()
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false)

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = () => {
        setSubmitting(true)

        AuthService.forgotPasswordFront(email, params.idE).then(
            () => {
                Swal.fire({
                    title: 'Succès!',
                    text: 'Un émail sera envoyer pour récupérer votre mot de passe',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 5000
                }).then(() => {
                    const history = createBrowserHistory();
                    history.push("/login/" + params.idE);
                    window.location.reload();
                    setSubmitting(false);

                })

            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
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
                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit" disabled={submitting}>{submitting ? 'Loading...' : 'réinitialiser le mot de passe'}</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default ForgotPassword
