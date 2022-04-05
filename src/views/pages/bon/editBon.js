import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import { useParams } from 'react-router';


// material-ui
import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';


// assets
import MainCard from 'ui-component/cards/MainCard';
import BonServices from 'services/bons-services/BonServices';
import Swal from 'sweetalert2';

export default function AddBon({ ...others }) {
    const history = createBrowserHistory();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [strength] = useState(0);
    const [level] = useState();
    const [message, setMessage] = useState(null);
    const [setBon] = useState(null);
    const params = useParams();
    const [loadcirular, setLoadcirular] = useState(true);
    const formikRef = React.useRef();




    React.useEffect(
        () => {

            BonServices.show(params.id).then((res) => {
                setBon(res.data[0]);
                setLoadcirular(false);
                if (formikRef.current) {
                    formikRef.current.setFieldValue(
                        "code",
                        res.data[0].code
                    );
                    formikRef.current.setFieldValue(
                        "reduction",
                        res.data[0].reduction
                    );
                }
            })
        }, [],
    );


    const handleSubmit = (values, { setSubmitting }) => {

        BonServices.updateBon(values.code, values.reduction, params.id).then(
            () => {

                Swal.fire({
                    title: 'Bon travail!!',
                    text: "Votre bon a été modifié avec succès!",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {

                        const history = createBrowserHistory();
                        history.push("/girdView/bons?page=1");
                        window.location.reload();
                    }
                })
                setMessage('');

                setSubmitting(false);
            },
            error => {
                const resMessage = error.message
                setMessage(resMessage);
                setSubmitting(false);
            }
        );
    }
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)
        return (

            loadcirular === true ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '25%' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <MainCard >

                    <Formik
                        innerRef={formikRef}

                        initialValues={{
                            code: '',
                            reduction: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            code: Yup.string().max(255, 'Doit être un code valide').min(2, 'Doit être un code valide').required('Code est requis'),
                            reduction: Yup.number().min(0, 'la réduction doit etre supérieur à 0 ').required('Réduction est requis'),

                        })}
                        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => handleSubmit(values, { setErrors, setStatus, setSubmitting })}

                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} {...others}>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                </Grid>
                                <FormControl fullWidth error={Boolean(touched.code && errors.code)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="code">Code Bon</InputLabel>
                                    <OutlinedInput
                                        id="code"
                                        type="text"
                                        value={values.code}
                                        name="code"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.code && errors.code && (
                                        <FormHelperText error id="standard-weight-helper-text-code-register">
                                            {errors.code}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl fullWidth error={Boolean(touched.reduction && errors.reduction)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="nom">Reduction bon</InputLabel>
                                    <OutlinedInput
                                        id="reduction"
                                        type="number"
                                        value={values.reduction}
                                        name="reduction"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.reduction && errors.reduction && (
                                        <FormHelperText error id="standard-weight-helper-text-reduction-register">
                                            {errors.reduction}
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

                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Grid container spacing={matchDownSM ? (0) : 2} direction="row-reverse" style={{ "marginTop": 30 }}>

                                    <Grid item xs={12} sm={12} >


                                        <Box sx={{ mt: 2 }}>

                                            {message && (
                                                <Alert severity="error"  >{message}</Alert>

                                            )}
                                        </Box>

                                    </Grid>

                                    <Grid item xs={12} sm={2} >


                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"

                                                color="secondary"
                                                onClick={() => {
                                                    const history = createBrowserHistory();
                                                    history.push("/girdView/bons?page=1");
                                                    window.location.reload();
                                                }}
                                                variant="outlined"
                                            >
                                                Annuler
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={12} sm={2} >
                                        <AnimateButton>
                                            <LoadingButton
                                                disableElevation
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                color="primary"
                                                loading={isSubmitting}
                                                variant="contained"
                                            >
                                                Modifier
                                            </LoadingButton>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </MainCard >));
    else {
        history.push('/login');
        window.location.reload();
    }
};

//export default listViewProducts;