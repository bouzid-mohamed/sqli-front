import { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthService from "services/auth-services/AuthService";
import { createBrowserHistory } from 'history';



// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';

// assets


import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';

// ============================|| FIREBASE - LOGIN ||============================ //

const ForgotPasswordForm = ({ ...others }) => {
    const theme = useTheme();



    const [message, setMessage] = useState(null);




    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {

        AuthService.forgotPassword(values.email).then(
            () => {

                Swal.fire({
                    title: 'Succès!',
                    text: 'Un émail sera envoyer pour récupérer votre mot de passe',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 5000
                }).then(() => {
                    const history = createBrowserHistory();
                    history.push("/login");
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
            <Grid container direction="column" justifyContent="center" spacing={2}>



            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Doit être un email valide').max(255).required('Email est requis'),
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Adresse email </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Adresse email"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>

                            {message && (
                                <Alert severity="error"  >{message}</Alert>

                            )}
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <LoadingButton
                                disableElevation
                                loading={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >        réinitialiser le mot de passe                                   </LoadingButton>
                        </Box>






                    </form>
                )}
            </Formik>
        </>
    );
};

export default ForgotPasswordForm;
