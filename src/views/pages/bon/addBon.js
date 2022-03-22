import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';

// material-ui
import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
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
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';


// assets
import MainCard from 'ui-component/cards/MainCard';

export default function AddBon({ ...others }) {
    const history = createBrowserHistory();
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [strength] = useState(0);
    const [level] = useState();
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
        setLoading(true);
    }
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)
        return (<MainCard >

            <Formik
                initialValues={{
                    nom: '',
                    description: '',
                    prix: '',
                    promotion: '',
                    categorie: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    code: Yup.string().max(255, 'Doit être un code valide').min(2, 'Doit être un code valide').required('Code est requis'),
                    reduction: Yup.number().min(0, 'la réduction doit etre supérieur à 0 ').required('Réduction est requis'),

                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                        </Grid>
                        <FormControl fullWidth error={Boolean(touched.nom && errors.nom)} sx={{ ...theme.typography.customInput }}>
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
                            <Grid item xs={12} sm={2} >
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        color="secondary"
                                        onClick={handleClick}
                                        loading={loading}
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
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        color="primary"
                                        onClick={handleClick}
                                        loading={loading}
                                        variant="contained"
                                    >
                                        Ajouter
                                    </LoadingButton>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>






        </MainCard >);
    else {
        history.push('/login');
        window.location.reload();
    }




};

//export default listViewProducts;