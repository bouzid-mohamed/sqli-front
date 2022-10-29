import { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthService from "services/auth-services/AuthService";
import { createBrowserHistory } from 'history';
import { strengthColor, strengthIndicator } from 'utils/password-strength';



// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
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
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useParams } from 'react-router';

// ============================|| FIREBASE - LOGIN ||============================ //

const ChangePasswordForm = ({ ...others }) => {
    const theme = useTheme();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const params = useParams();

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };
    const changeNewPassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };
    const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        if (values.newPassword != values.confirmNewPassword) {
            setMessage('Confirmer votre nouveau mot de passe ')
            setSubmitting(false);

        } else {
            AuthService.changePassword(values.newPassword, params.token).then(
                () => {

                    Swal.fire({
                        title: 'Succès!',
                        text: 'Votre mot de passe a été modifié avec succès',
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
                    Swal.fire({
                        title: 'Erreur! Jeton expiré',
                        text: 'Renouvelez votre jeton',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 5000
                    }).then(() => {
                        const history = createBrowserHistory();
                        history.push("/forgot_password");
                        window.location.reload();
                        setSubmitting(false);

                    })

                }
            );
        }
    }



    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>



            </Grid>

            <Formik
                initialValues={{
                    newPassword: '',
                    confirmNewPassword: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    newPassword: Yup.string().max(255).min(5, 'Mot de passe doit contenir au moin 5 charachtère').required('Mot de passe  est requis'),
                    confirmNewPassword: Yup.string().max(255).min(5, 'Mot de passe doit contenir au moin 5 charachtère').required('Répetez votre mot de passe'),
                })}
                onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.newPassword && errors.newPassword)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="newPassword">Nouveau mot de passe</InputLabel>
                            <OutlinedInput
                                id="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                value={values.newPassword}
                                name="newPassword"
                                label="nouveau mot de passe "
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changeNewPassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowNewPassword}
                                            onMouseDown={handleMouseDownNewPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.newPassword && errors.newPassword && (
                                <FormHelperText error id="newPassword">
                                    {errors.newPassword}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}
                        <FormControl
                            fullWidth
                            error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="confirmNewPassword">Confirmer votre nouveau mot de passe</InputLabel>
                            <OutlinedInput
                                id="confirmNewPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={values.confirmNewPassword}
                                name="confirmNewPassword"
                                label="confirmNewPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}

                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.confirmNewPassword && errors.confirmNewPassword && (
                                <FormHelperText error id="password">
                                    {errors.confirmNewPassword}
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

export default ChangePasswordForm;
