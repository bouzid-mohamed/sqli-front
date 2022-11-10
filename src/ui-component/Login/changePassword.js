import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { createBrowserHistory } from 'history';
import AuthService from 'services/auth-services/AuthService';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Google from 'assets/images/icons/social-google.svg';
import Facebook from 'assets/images/icons/Facebook_F_icon.svg.png';

import { useMediaQuery, Button, Alert } from '@mui/material';

const ChangePassword = () => {
    const [email, setEmail] = useState('')
    const params = useParams()
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleChangeConfirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value);

    }
    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value);

    }

    const handleSubmit = () => {
        setSubmitting(true)
        if (newPassword != confirmNewPassword) {
            setMessage('Confirmer votre nouveau mot de passe ')
            setSubmitting(false);

        } else {
            AuthService.changePassword(newPassword, params.token).then(
                () => {

                    Swal.fire({
                        title: 'Succès!',
                        text: 'Votre mot de passe a été modifié avec succès',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 5000
                    }).then(() => {
                        setSubmitting(false);
                        setRedirect(true)


                    })

                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    Swal.fire({
                        title: 'Erreur! Jeton expiré',
                        text: 'Renouvelez votre jeton',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 5000
                    }).then(() => {
                        const history = createBrowserHistory();
                        history.push("/forgot/" + params.idE);
                        window.location.reload();
                        setSubmitting(false);

                    })

                }
            );
        }
    }

    if (redirect)
        return (<Navigate push to={'/' + params.idE + '/login'} />)

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

                                        <label htmlFor="new_password">Nouveau mot de passe</label>
                                        <input type="password" className="form-control" id="new_password" value={newPassword} onChange={handleChangeNewPassword}
                                            placeholder="Nouveau mot de passe" required />
                                    </div>
                                    <div className="default-form-box">
                                        <label htmlFor="re_password">Confirmer votre nouveau mot de passe</label>
                                        <input type="password" className="form-control" id="re_password" value={confirmNewPassword} onChange={handleChangeConfirmNewPassword}
                                            placeholder="Re-tapez votre nouveau mot de passe" required />
                                    </div>
                                    {message && (
                                        <Alert severity="error"  >{message}</Alert>

                                    )}
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

export default ChangePassword
