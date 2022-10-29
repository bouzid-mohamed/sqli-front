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

const LoginArea = () => {
    const [email, setEmail] = useState('')
    const params = useParams()
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false)
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

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


    const googleHandler = async (e) => {
        e.preventDefault();
        window.location.href = 'http://localhost:8000/connect/google?idE=' + params.idE;
    };
    const facebookHandler = async (e) => {
        e.preventDefault();
        window.location.href = 'http://localhost:8000/connect/facebook?idE=' + params.idE;
    };
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

                                        <Link to={'/forgot/' + params.idE} className="form-check-label" htmlFor="materialUnchecked" >Mot de passe oublié?</Link>

                                    </div>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            onClick={googleHandler}
                                            size="large"
                                            variant="outlined"
                                            sx={{
                                                color: 'grey.700',
                                                backgroundColor: theme.palette.grey[50],
                                                borderColor: theme.palette.grey[100]
                                            }}
                                        >
                                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                                            </Box>
                                            Connectez-vous avec Google
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            onClick={facebookHandler}
                                            size="large"
                                            variant="outlined"
                                            sx={{
                                                color: 'grey.700',
                                                backgroundColor: theme.palette.grey[50],
                                                borderColor: theme.palette.grey[100]
                                            }}
                                        >
                                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                                <img src={Facebook} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                                            </Box>
                                            Connectez-vous avec Facebook
                                        </Button>
                                    </AnimateButton>

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
